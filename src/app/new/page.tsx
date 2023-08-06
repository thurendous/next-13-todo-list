import Link from 'next/link'
import { prisma } from '@/db'
import { redirect } from 'next/navigation'

async function createTodo(data: FormData) {
    'use server'
    const title = data.get('title')?.valueOf()
    if (typeof title !== 'string' || title.length === 0) {
        throw new Error('title is invalid')
    }

    await prisma.todo.create({ data: { title, complete: false } })

    console.log('hi')

    redirect('/')
}

export default function Page() {
    return (
        <div>
            <header className="flex justify-between">
                <h1 className="text-2xl">New</h1>
            </header>
            <form action={createTodo} className="flex gap-1.5 flex-col">
                <input
                    type="text"
                    name="title"
                    className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
                />
                <div className="gap-1 flex justify-end">
                    <Link
                        href=".."
                        className="border border-slate-300 text-slate-300 px-2 rounded py-1 hover:bg-slate-700  focus-within:bg-slate-700 outline-none"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="border border-slate-300 text-slate-300 px-2 rounded py-1 hover:bg-slate-700  focus-within:bg-slate-700 outline-none"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
