import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/token";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

abstract class UsersController {
    static async register(req: Request, res: Response) {
        const { username, password } = req.body;

        const hashed = bcrypt.hashSync(password, 10);

        const user = await prisma.user.create({
            data: { username, password: hashed },
        });

        res.json(user);
    }

    static async login(req: Request, res: Response) {
        const { username, password } = req.body;

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            // In a real-world application, use a secure way to compare hashed passwords
            res.status(401).json({ error: "Invalid username or password" });
            return;
        }

        const token = generateToken(user.id);

        res.json({ token });
    }
}

export default UsersController;
