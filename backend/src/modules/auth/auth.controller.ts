import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {

	static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { email, password } = res.locals.authUser;
			if (!email || !password) {
				res.status(400).json({ message: "Email and Password are required" });
				return;
			}

			const user = await AuthService.validateCredentials(email, password);
			if (!user) {
				res.status(401).json({ message: "Non valid credentials 1" });
				return;
			}

			const token = await AuthService.generateToken(user.id);

			res.status(200).json({ message: "Auth OK", token, tokenType: "Bearer", expiresIn: 3600 });
		} catch (error) {
			res.status(500).json({
				message: error,
			});
		}
	}

	static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { email, password } = res.locals.authUser;
			const name = req.body.name;

			if (!name || !email || !password) {
				res.status(400).json({ message: "Name, Email and Password are required" });
				return;
			}
			console.log("Registering user 1:", { name, email, password });
			const user = await AuthService.register(name, email, password);
			console.log("Registering user 2:", { name, email, password });
			const token = await AuthService.generateToken(user.id);
			console.log("Registering user 3:", { name, email, password });
			res.status(200).json({ message: "Auth OK", token, tokenType: "Bearer", expiresIn: 3600 });
		} catch (error) {
			res.status(500).json({
				message: error,
			});
		}
	}

}