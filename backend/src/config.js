import dotenv from "dotenv";

dotenv.config();
export const config = {
  db: {
    URI: process.env.DB_URI,
  },
  server: {
    PORT: process.env.PORT,
  },
  JWT:{
    secret: process.env.JWT_SECRET
  },
  email:{
    emailUser: process.env.USER_EMAIL,
    emailPass: process.env.USER_EMAIL_PASS
  }
};
