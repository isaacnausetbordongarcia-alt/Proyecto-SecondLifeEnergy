import bcrypt from "bcryptjs";
import { User } from "./user.model.js";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { sequelize } from "../../config/database.js";
import { Role } from "../rcba/role.model.js";
import { UserRole } from "../rcba/userRole.model.js";

export class AuthService {

  static async validateCredentials(
    email: string,
    password: string
  ): Promise<User | null> {

    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return null;
    }

    const validPassword = await bcrypt.compare(
      password,
      String(user.passwordHash)
    );

    if (!validPassword) {
      return null;
    }

    return user;
  }

  static async register(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    return sequelize.transaction(async (transaction) => {
      const existingUser = await User.findOne({ where: { email }, transaction });

      if (existingUser) throw new Error("USERNAME_ALREADY_EXISTS");

      const passwordHash = await bcrypt.hash(password, 12);

      const studentRole = await Role.findOne({
        where: { name: "alumno" },
        transaction
      });

      if (!studentRole) throw new Error("alumno role not found");

      const user = await User.create({name: name, passwordHash, email: email}, { transaction });

      await UserRole.create({ userId: user.id, roleId: studentRole.id }, { transaction });

      return user;
    });
  }

  static async generateToken(userId: number): Promise<string | null> {
    const secret = env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not configured");

    const token = jwt.sign({}, secret, {
      algorithm: "HS256",
      subject: String(userId),
      expiresIn: "1h",
      issuer: "secondlifeenergy-api",
      audience: "secondlifeenergy-client"
    });

    return token;
  }
}
