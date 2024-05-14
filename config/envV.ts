import dotenv from "dotenv";
dotenv.config();

export const EnvironmentVariables = {
  DB_LIVEURI: process.env.DB_Connection_String,
  DB_LOCALURL: process.env.MongoDB_URL,
  PORT: process.env.PORT,
  AdminName: process.env.AdminName as string,
  AdminEmail: process.env.AdminEmail as string,
  AdminPassword: process.env.AdminPassword as string,
};
