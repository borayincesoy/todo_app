import React from 'react';
import type { Todo } from '../interfaces/Todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <div className="w-full bg-white rounded shadow-md overflow-hidden border border-gray-200">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500 py-8">Henüz todo yok.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;