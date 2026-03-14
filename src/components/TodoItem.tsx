import React from 'react';
import type { Todo } from '../interfaces/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const formatDate = (date?: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 hover:bg-gray-50 transition">
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mr-3 h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        ) : (
          <div className="flex-1">
            <p className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {todo.text}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-gray-500">
          {formatDate(todo.dueDate)}
        </span>
        
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="p-2 hover:bg-gray-200 rounded transition"
            title={isEditing ? 'Kaydet' : 'Düzenle'}
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 hover:bg-red-100 rounded transition"
            title="Sil"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;