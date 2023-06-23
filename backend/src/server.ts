import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createNewUser, signin } from "./handlers/auth";

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post('/auth/register', createNewUser)
server.post('/auth/login', signin)

server.get("/", (req, res) => {
  res.send({ message: "Hello world!" });
});

server.use((err, req, res, next) => {
  return res.status(err.statusCode).json({ message: "Error!", error: err });
})


export default server;
