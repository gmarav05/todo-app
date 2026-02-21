import { createTodo } from "@/actions/todo-actions"
import { createTodoSchema } from "@/validations/todo"

export function UseTodos() {
    const setTodos = useTodoStore((state) => state.setTodo);
}