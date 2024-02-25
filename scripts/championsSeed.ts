import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
    const data = fs.readFileSync(path.resolve(__dirname, "../data/champions.json"), "utf-8");
    const champions = JSON.parse(data);

    for (const champion of champions) {
        await prisma.champion.create({
            data: {
                name: champion.name,
                type: champion.type,
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
