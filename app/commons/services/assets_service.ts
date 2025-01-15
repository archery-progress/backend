import StringHelper from '@adonisjs/core/helpers/string'
import app from '@adonisjs/core/services/app'
import { join } from 'node:path'
import sharp, { Sharp } from 'sharp'
import { rm } from 'node:fs/promises'
import drive from '@adonisjs/drive/services/main'
import logger from '@adonisjs/core/services/logger'

type UploadProps = {
  location: string
  file: any
  transformer: (sharp: Sharp) => Sharp
}

export default class AssetsService {
  async upload(props: UploadProps): Promise<string> {
    const uid = StringHelper.generateRandom(10)
    const localKeyPath = join(props.location, `${uid}.${props.file.extname}`)
    const keyPath = join(props.location, `${uid}.webp`)

    try {
      await props.file.move(app.tmpPath(), { name: localKeyPath })

      const buffer = await props
        .transformer(sharp(app.tmpPath(localKeyPath)))
        .webp({ quality: 80 })
        .toBuffer()

      const disk = drive.use()
      await disk.put(keyPath, buffer)
    } catch (e) {
      logger.error(e)
    } finally {
      await rm(join(app.tmpPath(), props.location), { recursive: true })
    }

    return keyPath
  }
}
