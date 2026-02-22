"use client"
import React from 'react'
import { useTodos } from '@/hooks/UseCreateTodo';
import { useTodoStore } from '@/store/TodoStore';

import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react'


const TodoList = () => {
    const {data:todos, isLoading, error} = useTodos();

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

  return (
    <div>{JSON.stringify(todos)}</div>
  )
}

export default TodoList