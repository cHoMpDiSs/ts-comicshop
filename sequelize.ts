import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';


dotenv.config(); 

const sequelize = new Sequelize({
    define: {
        timestamps: false,
      },
    dialect: 'postgres', 
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  
});


export default sequelize;