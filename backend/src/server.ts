import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createNewUser, signin } from "./handlers/auth";
import router from "./router";
import { signInSchema, registrationSchema } from "./utils/validators";
import { checkIfRegValueTaken, protectedRoute, validateObjects } from "./utils/middlewares";

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post(
  '/auth/register',
  [validateObjects(registrationSchema), checkIfRegValueTaken],
  createNewUser
);

server.post('/auth/login', validateObjects(signInSchema), signin)

server.use("/api/v1", protectedRoute, router)

server.get("/", (req, res) => {
  res.send({ message: "Hello world!" });
});

server.use((err, req, res, next) => {
  return res.status(500).json({ message: "Error!", error: err.message });
})


export default server;
