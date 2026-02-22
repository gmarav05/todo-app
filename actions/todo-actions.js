"use server"

import { revalidatePath } from "next/cache"
import ConnectDB from "@/lib/db"
import Todo from "@/model/todo.js"
import { createTodoSchema } from "@/validations/todo"
import { connect } from "mongoose"
import { success } from "zod"

export async function createTodo(data) {
    try {
        const validatedData = createTodoSchema.parse(data);
        await ConnectDB();

        const todo = await Todo.create(validatedData)

        revalidatePath('/')

        return {
            success:true,
            data:JSON.parse(JSON.stringify(todo))
        }
    } catch (error) {
        console.error("Error creating todo:", error)
        return {
            success:false,
            error: error ? error.message : "Failed to create todo",
        }
    }
}

export async function getTodos() {
    try {
        await ConnectDB();
        const todos = await Todo.find({}).sort({createdAt:-1})
        return {
            success:true,
            data:JSON.parse(JSON.stringify(todos))
        }
    } catch (error) {

        return {
            success: false,
            error: "Failed to fetch todos",
        }
    }
}