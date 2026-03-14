import React, { useState } from 'react';

interface AddTodoProps {
  onAdd: (text: string, dueDate?: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd, inputRef }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), dueDate);
      setText('');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md border border-gray-200">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Yeni todo ekleyin..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition font-medium"
        >
          Ekle
        </button>
      </div>
    </form>
  );
};

export default AddTodo;