import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

const port = process.env.PORT || 3322;

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
