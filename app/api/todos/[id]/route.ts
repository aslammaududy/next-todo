import prisma from "@/lib/prisma";

/**
 * @swagger
 * /api/todo/[id]:
 *   get:
 *     description: Returns the specified todo
 *     responses:
 *       200:
 *         description: Returns todo based on it's id
 */
export async function GET(request: Request, context: RouteContext<'/api/todos/[id]'>) {
    const params = await context.params

    const todo = await prisma.todo.findUnique({
        where: {id: parseInt(params.id)},
    })

    return Response.json(todo)
}

/**
 * @swagger
 * /api/todo/[id]:
 *   put:
 *     description: Update the specified todo
 *     responses:
 *       200:
 *         description: Returns updated todo based on it's id
 */
export async function PUT(request: Request, context: RouteContext<'/api/todos/[id]'>) {
    const params = await context.params
    const data = await request.json();

    const updatedTodo = await prisma.todo.update({
        where: {id: parseInt(params.id)},
        data: data
    })

    return Response.json(updatedTodo)
}