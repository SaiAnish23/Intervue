/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://anish231003:28ISlVWrqHdk@ep-muddy-tree-a1nd83vx.ap-southeast-1.aws.neon.tech/Intervue?sslmode=require',
    }
  };
  