import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../utils/auth";

export const createNewUser = async (req, res, next) => {
  try {
    await prisma.user.create({
      data: {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        accountType: req.body.accountType,
        password: await hashPassword(req.body.password),
        bio: req.body?.bio,
      }
    });

    res.status(200).json({ message: "Account created" });
  } catch (err) {
    next(err);
  }
}

export const signin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username
      }
    });

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const token = createJWT(user);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
}