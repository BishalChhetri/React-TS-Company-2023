require("dotenv").config();

const GetServer = require("./api/server");

const port = process.env.PORT || 3301;

process.on("uncaughtException", (err) => {
  console.error(`${new Date().toUTCString()} uncaughtException:`, err);
  process.exit(0);
});

process.on("unhandledRejection", (err) => {
  console.error(`${new Date().toUTCString()} unhandledRejection:`, err);
});

GetServer.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}/api`)
);
