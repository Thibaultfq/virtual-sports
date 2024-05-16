const { glob } = require('glob')
const fs = require('fs')
const path = require('path')
const fsPromises = require('fs/promises')
const SVGSpriter = require('svg-sprite')
const Vinyl = require('vinyl')

let spriteCache = {}

class SVGSprite {
  constructor(paths, config) {
    this.paths = paths.map((p) => path.resolve(config.base + p))
    this.config = config
    //    this.cwd = path.resolve(config.path)
    if (config.outputFilepath) {
      this.outputFilepath = path.resolve(config.outputFilepath)
    }
    this.spriteConfig = config.spriteConfig
  }

  async compile() {
    //get all files in array of paths and flatten to single array
    const files = (await Promise.all(this.paths.map(async (p) => await glob(`**/*.svg`, { cwd: p, absolute: true }))))
      .map((globArray, index) => globArray.map((p) => ({ absolutePath: p, basePath: this.paths[index] })))
      .flat(1)
    //const files = await glob(`**/*.svg`, { cwd: this.cwd })
    const newCacheKey = files.map((file) => `${file.absolutePath}:${fs.statSync(file.absolutePath).mtimeMs}`).join('|')

    if (spriteCache.cacheKey === newCacheKey) {
      // if the cacheKey is the same, don't need to rebuild sprite
      return spriteCache.spriteContent
    } else {
      spriteCache.cacheKey = newCacheKey
    }

    // Make a new SVGSpriter instance w/ configuration
    const spriter = new SVGSpriter(this.spriteConfig)

    // Add them all to the spriter
    files.forEach((file) => {
      spriter.add(
        new Vinyl({
          path: file.absolutePath,
          base: file.basePath,
          contents: fs.readFileSync(file.absolutePath),
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

    // cache spriteContent into global spriteCache variable
    spriteCache.spriteContent = `<div style="width: 0; height: 0; position: absolute; overflow: hidden;">${sprite.contents.toString(
      'utf8'
    )}</div>`
  }

  getSvgSprite() {
    return spriteCache.spriteContent
  }
}

async function isExists(path) {
  try {
    await fsPromises.access(path)
    return true
  } catch {
    return false
  }
}

async function writeFile(filePath, data) {
  try {
    const dirname = path.dirname(filePath)
    const exist = await isExists(dirname)
    if (!exist) {
      await fsPromises.mkdir(dirname, { recursive: true })
    }

    await fsPromises.writeFile(filePath, data, 'utf8')
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = SVGSprite
