import { PrismaClient, Prisma } from "@/app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: "Yaumil",
        email: "yaumil@prisma.io",
        todos: {
            create: [
                {
                    title: "Join the Prisma Discord",
                    description: "https://pris.ly/discord",
                    isCompleted: true,
                },
                {
                    title: "Prisma on YouTube",
                    description: "https://pris.ly/youtube",
                    isCompleted: false
                },
            ],
        },
    },
    {
        name: "Aslam",
        email: "bob@prisma.io",
        todos: {
            create: [
                {
                    title: "Follow Prisma on Twitter",
                    description: "https://www.twitter.com/prisma",
                    isCompleted: true,
                },
            ],
        },
    },
];

export async function main() {
    for (const u of userData) {
        await prisma.user.create({ data: u });
    }
}

main();