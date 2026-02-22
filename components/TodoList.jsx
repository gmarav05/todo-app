"use client"
import React from 'react'
import { useTodos } from '@/hooks/UseCreateTodo';
import { useTodoStore } from '@/store/TodoStore';
import TodoItem from './TodoItem.jsx';

import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react'


const TodoList = () => {
    const {data:todos, isLoading, error} = useTodos();

    const filteredTodos = useTodoStore((state) => state.filteredTodos());

    if (isLoading) {
        return (
            <Card>
                <CardContent className="p-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading todos...</p>
                </CardContent>
            </Card>
        )
    }

    if (error) {
      return (
        <Card>
            <CardContent className="p-8 text-center">
            <p className="text-destructive">Error loading todos: {error.message}</p>
            </CardContent>
        </Card>
      )
  }

  if(filteredTodos.length === 0){
    return (
        <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">
            {data?.length === 0 ? "No todos yet. Create your first one!" : "No todos match the current filter."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='space-y-3'>
        {
            filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo}/>
            ))
        }
    </div>
  )
}

export default TodoList