import { Sequelize } from 'sequelize'
import models from '../models/index.js'
const sequelize = new Sequelize({
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres',
    logging: false

})

export default async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connected!');
    
        await models({ sequelize })

        await sequelize.sync({ alter: true })

        return sequelize
    } catch (error) {
        console.log('Database Error: ' + error.message);
    }
}
