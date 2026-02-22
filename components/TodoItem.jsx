import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDeleteTodo, useToggleTodo } from "@/hooks/UseCreateTodo";
import { toast } from "sonner";

const TodoItem = ({ todo }) => {
 
  const toggleMutation = useToggleTodo();
  const deleteMutation = useDeleteTodo();

  const handleDelete = async ()=>{
    try {
      const result = await deleteMutation.mutateAsync(todo._id);
      if(result.success){
        toast.success("Todo Deleted successfully")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  const handleToggle = async ()=>{
    try {
      const result = await toggleMutation.mutateAsync(todo._id);
      if(!result.success){
        toast.error("Error" , result.error)
      }
    } catch (error) {
      toast.error("Failed to update")
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md mt-4 mb-4",
        todo.completed && "opacity-75"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggle}
            disabled={false}
            className="mt-2 mb-2"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 mt-1">
              <h3
                className={cn(
                  "font-medium text-base mt-1 mb-1",
                  todo.completed && "line-through text-muted-foreground"
                )}
              >
                {todo.title}
              </h3>
              <Badge
                variant="secondary"
                className={cn("text-xs mt-1 mb-1", getPriorityColor(todo.priority))}
              >
                {todo.priority}
              </Badge>
            </div>

            {todo.description && (
              <p
                className={cn(
                  "text-sm text-muted-foreground mb-3 mt-1",
                  todo.completed && "line-through"
                )}
              >
                {todo.description}
              </p>
            )}

            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2 mb-2">
              <Calendar className="w-3 h-3" />
              <span className="mt-1 mb-1">
                Created {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className={cn(
                "h-8 w-8 p-0 mt-1 mb-1",
                deleteMutation.isPending && "bg-destructive text-destructive-foreground"
              )}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
