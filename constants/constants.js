import env from 'dotenv';
env.config();

export const constantData = {
    mongoURl: process.env.MONGOURL,
    port: process.env.PORT,
    salt: process.env.SALT,
    secret: process.env.SECRET
}