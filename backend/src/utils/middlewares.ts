import prisma from "../db";
import jwt from "jsonwebtoken";

export const validateObjects = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);

    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const checkIfRegValueTaken = async (req, res, next) => {
  // Checks whether email/username already in use during registration
  const { email, username } = req.body;

  const responseHandler = (value) => {
    return res.status(400).json({ message: `${value} already in use` });
  };

  try {
    const usernameTaken = await prisma.user.findFirst({
      where: {
        username
      }
    })

    if (usernameTaken) {
      return responseHandler("Username");
    }

    const emailTaken = await prisma.user.findFirst({
      where: {
        email
      }
    })
    if (emailTaken) {
      return responseHandler("Email");
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const protectedRoute = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
    return;
  } catch (err) {
    next(err)
  }
};