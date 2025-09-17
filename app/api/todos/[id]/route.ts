import prisma from "@/lib/prisma";

export async function GET(request: Request, context: RouteContext<'/api/todos/[id]'>) {
    const params = await context.params

    const todo = await prisma.todo.findUnique({
        where: {id: parseInt(params.id)},
    })

    return Response.json(todo)
}

export async function PUT(request: Request, context: RouteContext<'/api/todos/[id]'>) {
    const params = await context.params
    const data = await request.json();

    const updatedTodo = await prisma.todo.update({
        where: {id: parseInt(params.id)},
        data: data
    })

    return Response.json(updatedTodo)
}