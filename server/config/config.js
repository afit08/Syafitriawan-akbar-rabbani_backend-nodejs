const config = {
    env: process.env.NODE_ENV || "development",
    port: 3001,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    db_name: process.env.DATABASE || "checklist",
    db_username: process.env.DATABASE_USER || "postgres",
    db_password: process.env.DATABASE_PASSWORD || "admin",
    URL_DOMAIN: "/checklist",
    URL_IMAGE: process.env.URL_IMAGE || "/checklist/images",
    URL_API: "/checklist/api",
    UPLOAD_DIR: "/storages",
  };
  
  export default config;