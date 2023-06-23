import prisma from "../db";

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