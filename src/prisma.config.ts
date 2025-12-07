// prisma.config.ts
module.exports = {
  // other config options...
  datasources: {
    db: process.env.DATABASE_URL,
  },
};
