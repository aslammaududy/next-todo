import prisma from "@/lib/prisma";

/**
 * @swagger
 * /api/todos:
 *   get:
 *     description: Returns All tods
 *     responses:
 *       200:
 *         description: Hello Todo!
 */
export async function GET() {
    const todos = await prisma.todo.findMany({
        include: {
            author: true
        }
    })

    return Response.json(todos);
}

/**
 * @swagger
 * /api/todo:
 *   post:
 *     description: Create a todo
 *     responses:
 *       200:
 *         description: Create a todo and return the created todo
 */
export async function POST(request: Request) {
    const data = await request.json();

    const todo = await prisma.todo.create({
        data: data
    })

    return Response.json(todo)
}