import Form from "next/form";
import prisma from "@/lib/prisma";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export default function NewTodo() {
    async function createTodo(formData: FormData) {
        "use server";

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        await prisma.todo.create({
            data: {
                title: title,
                description: description,
                authorId: 1,
                isCompleted: false
            },
        });

        revalidatePath("/todos");
        redirect("/todos");
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
            <Form action={createTodo} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-lg mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter your todo title"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-lg mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Write your post content here..."
                        rows={6}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                >
                    Create Todo
                </button>
            </Form>
        </div>
    );
}