import prisma from "@/lib/prisma";

export async function GET() {
    const todos = await prisma.todo.findMany({
        include: {
            author: true
        }
    })

    return Response.json(todos);
}

export async function POST(request: Request) {
    const data = await request.json();

    const todo = await prisma.todo.create({
        data: data
    })

    return Response.json(todo)
}