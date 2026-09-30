import { glob, globSync } from 'glob'
import { statSync, readFileSync } from 'fs'
import { resolve as _resolve, dirname as _dirname, basename } from 'path'
import { access, mkdir, writeFile as _writeFile } from 'fs/promises'
import SVGSpriter from 'svg-sprite'
import Vinyl from 'vinyl'

export function extractViewBox(svgContent) {
  if (!svgContent) return null
  const svgTagMatch = svgContent.match(/<svg\b([^>]*)>/i)
  if (!svgTagMatch) return null
  const attrs = svgTagMatch[1]

  const viewBoxMatch = attrs.match(/\bviewBox=["']\s*([^"']+)\s*["']/i)
  if (viewBoxMatch) return viewBoxMatch[1].trim()

  const widthMatch = attrs.match(/\bwidth=["']\s*([0-9.]+)(?:px)?\s*["']/i)
  const heightMatch = attrs.match(/\bheight=["']\s*([0-9.]+)(?:px)?\s*["']/i)
  if (widthMatch && heightMatch) {
    return `0 0 ${widthMatch[1]} ${heightMatch[1]}`
  }
  return null
}

class SVGSprite {
  static viewBoxMap = new Map()

  static getViewBox(name, baseDir = './src/assets/svg') {
    const cleanName = basename(name, '.svg')
    if (SVGSprite.viewBoxMap.has(cleanName)) {
      return SVGSprite.viewBoxMap.get(cleanName)
    }

    try {
      const resolvedBase = _resolve(baseDir)
      const matches = globSync(`**/${cleanName}.svg`, { cwd: resolvedBase, absolute: true })
      if (matches.length > 0) {
        const content = readFileSync(matches[0], 'utf8')
        const vb = extractViewBox(content)
        if (vb) {
          SVGSprite.viewBoxMap.set(cleanName, vb)
          return vb
        }
      }
    } catch (e) {
      // ignore
    }

    return null
  }

  constructor(paths, config) {
    this.paths = paths.map((p) => {
      const cleanPath = p.replace(/^\/+/, '')
      return _resolve(config.base, cleanPath)
    })
    this.config = config
    //    this.cwd = path.resolve(config.path)
    if (config.outputFilepath) {
      this.outputFilepath = _resolve(config.outputFilepath)
    }
    this.spriteConfig = config.spriteConfig
    this.spriteContent = null
    this.cacheKey = null
  }

  async compile() {
    // get all files in array of paths (handles both directories and single svg files) and flatten to single array
    const fileLists = await Promise.all(
      this.paths.map(async (p) => {
        try {
          const stat = statSync(p)
          if (stat.isDirectory()) {
            const matches = await glob(`**/*.svg`, { cwd: p, absolute: true })
            return matches.map((filePath) => ({ absolutePath: filePath, basePath: p }))
          } else if (stat.isFile()) {
            return [{ absolutePath: p, basePath: _dirname(p) }]
          }
        } catch (e) {
          console.warn(`[svgsprite] Warning: Path not found or inaccessible: ${p}`)
          return []
        }
        return []
      })
    )
    const files = fileLists.flat(1)

    if (files.length === 0) {
      this.spriteContent = ''
      return this.spriteContent
    }

    const newCacheKey = files.map((file) => `${file.absolutePath}:${statSync(file.absolutePath).mtimeMs}`).join('|')

    if (this.cacheKey === newCacheKey && this.spriteContent) {
      // if the cacheKey is the same, don't need to rebuild sprite
      return this.spriteContent
    } else {
      this.cacheKey = newCacheKey
    }

    // Make a new SVGSpriter instance w/ configuration
    const spriter = new SVGSpriter(this.spriteConfig)

    // Add them all to the spriter and record their viewBoxes
    files.forEach((file) => {
      const content = readFileSync(file.absolutePath, 'utf8')
      const name = basename(file.absolutePath, '.svg')
      const vb = extractViewBox(content)
      if (vb) {
        SVGSprite.viewBoxMap.set(name, vb)
      }

      spriter.add(
        new Vinyl({
          path: file.absolutePath,
          base: file.basePath,
          contents: Buffer.from(content, 'utf8'),
        })
      )
    })

    // Wrap spriter compile function in a Promise
    const compileSprite = async (args) => {
      return new Promise((resolve, reject) => {
        spriter.compile(args, (error, result) => {
          if (error) {
            return reject(error)
          }
          resolve(result.symbol.sprite)
        })
      })
    }

    // Compile the sprite file and return it as a string
    const sprite = await compileSprite(this.spriteConfig.mode)

    if (this.outputFilepath) {
      console.info(`svg sprite writing ${this.config.outputFilepath} from ${this.config.path}`)
      await writeFile(this.outputFilepath, sprite.contents.toString('utf8'))
    }

    // cache spriteContent into instance variable
    this.spriteContent = `<div style="width: 0; height: 0; position: absolute; overflow: hidden;">${sprite.contents.toString(
      'utf8'
    )}</div>`
    return this.spriteContent
  }

  getSvgSprite() {
    return this.spriteContent
  }
}

async function isExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function writeFile(filePath, data) {
  try {
    const dirname = _dirname(filePath)
    const exist = await isExists(dirname)
    if (!exist) {
      await mkdir(dirname, { recursive: true })
    }

    await _writeFile(filePath, data, 'utf8')
  } catch (err) {
    throw new Error(err)
  }
}

export { SVGSprite }
