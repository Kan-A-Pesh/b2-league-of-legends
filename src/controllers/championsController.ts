import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

abstract class ChampionsController {
    static async create(req: Request, res: Response) {
        const { name, type } = req.body;

        const champion = await prisma.champion.create({
            data: {
                name,
                type,
            },
        });

        return res.status(201).json(champion);
    }

    static async getAll(req: Request, res: Response) {
        const champions = await prisma.champion.findMany();

        return res.json(champions);
    }

    static async getOne(req: Request, res: Response) {
        const { id } = req.params;

        const champion = await prisma.champion.findUnique({
            where: { id: Number(id) },
        });

        if (!champion) {
            return res.status(404).json({ error: "Champion not found" });
        }

        return res.json(champion);
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, type } = req.body;

        const champion = await prisma.champion.update({
            where: { id: Number(id) },
            data: {
                name,
                type,
            },
        });

        return res.json(champion);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;

        await prisma.champion.delete({
            where: { id: Number(id) },
        });

        return res.status(204).send();
    }
}

export default ChampionsController;
