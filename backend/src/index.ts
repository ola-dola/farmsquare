import * as dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import server from "./server";

const port = process.env.PORT || 3322;

server.listen(port, () => {
  console.log(`server listening on ${port}`);
});
