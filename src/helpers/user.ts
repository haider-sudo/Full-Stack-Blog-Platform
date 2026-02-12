import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { S3 } from "../aws";
import db from "../models";
import { SECRET_KEY, params } from "../constants";
import { ChangePassword, LoginUser, RegisterUser } from "../interfaces";

export const registerUser = async (
  _: undefined,
  { firstName, lastName, email, password, image }: RegisterUser
) => {
  if (!firstName || !lastName || !email || !password || !image) {
    console.error("Error: All fields must be filled");
    return;
  }

  const {
    file: { createReadStream, filename },
  } = await image[0];
  const stream = await createReadStream();
  const upload = await S3.upload({
    ...params,
    Body: stream,
    Key: `${Date.now()}-${filename}`,
  }).promise();

  const securedUrl = upload.Location;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    image: securedUrl,
  });
  return newUser;
};

export const loginUser = async (_: undefined, { email, password }: LoginUser) => {
  const existingUser = await db.User.findOne({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    throw new Error("Invalid Credentails!");
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    throw new Error("Invalid Credentails!");
  }

  const token = jwt.sign(
    { userId: existingUser.id, email: existingUser.email },
    SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );

  return {
    user: existingUser,
    token: token,
  };
};

export const changePassword = async (
  _: undefined,
  { userId, password, confirmPassword }: ChangePassword
) => {
  const user = await db.User.findByPk(userId);

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.User.update(
    { password: hashedPassword },
    {
      where: {
        id: userId,
      },
    }
  );

  return user;
};
