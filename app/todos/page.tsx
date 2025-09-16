import prisma from "@/lib/prisma";

export default async function Todos() {
    const todos = await prisma.todo.findMany({
        include: {
            author: true
        }
    });
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
        <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
            Posts
            </h1>
            <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4 text-black">
                {todos.map((todo) => (
                    <li key={todo.id}>
                   <span className="font font-semibold">{todo.title}</span>
                        <span className="text-sm text-gray-600 ml-2">
                            by {todo.author.name}
                        </span>
                    </li>
                ))}
    </ul>
    </div>
);
}