import { createTodo } from "@/actions/todo-actions"
import { useTodoStore } from "@/store/TodoStore";
import { mutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";

export const todoKeys = {
    all:["todos"],
    lists:()=>[...todoKeys.all , "list"]
}

export default function UseCreateTodo() {
    const queryClient = useQueryClient;
    const addTodo = useTodoStore((state) => state.setTodo);

    return useMutation({
        mutationFn:(data)=> createTodo(data),

        onSuccess:(result)=> {
            if(result.success) {
                // addTodo(result.data)
                console.log(result)

                queryClient.invalidateQueries({queryKey:todoKeys.list()})
            }
        }

    }) 
}