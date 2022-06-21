import fs from 'fs/promises'
import path from 'path'

export default async ({ sequelize }) => {
    const modelPath = path.join(process.cwd(),'src', 'models','user.js')
    const { default : Model } = await import('file://'+path.join(modelPath))
    await Model({ sequelize })
}