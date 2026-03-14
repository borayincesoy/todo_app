import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Todo } from '../interfaces/Todo';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

const Home: React.FC = () => {
  const addInputRef = useRef<HTMLInputElement | null>(null);
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = window.localStorage.getItem('todos');
    if (!stored) return [];
    try {
      return JSON.parse(stored) as Todo[];
    } catch {
      return [];
    }
  });
  const [activeTab, setActiveTab] = useState<'today' | 'pending' | 'overdue'>('today');

  const addTodo = (text: string, dueDate?: string) => {
    const today = new Date().toISOString().split('T')[0];
    let category: 'today' | 'pending' | 'overdue' = 'pending';

    if (dueDate === today) {
      category = 'today';
    } else if (dueDate && dueDate < today) {
      category = 'overdue';
    }

    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      dueDate: dueDate || today,
      category,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(() => {
    const active = todos.filter(t => !t.completed);
    const completed = todos.filter(t => t.completed);

    const tabFiltered = active.filter(t => t.category === activeTab);

    return { active: tabFiltered, completed };
  }, [todos, activeTab]);

  const tabCounts = useMemo(() => {
    const active = todos.filter(t => !t.completed);
    return {
      today: active.filter(t => t.category === 'today').length,
      pending: active.filter(t => t.category === 'pending').length,
      overdue: active.filter(t => t.category === 'overdue').length,
    };
  }, [todos]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold">Yapılacaklar Uygulaması</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-6 py-2 font-medium transition ${
              activeTab === 'today'
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Bugün {tabCounts.today > 0 && `(${tabCounts.today})`}
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-2 font-medium transition ${
              activeTab === 'pending'
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Bekleyen {tabCounts.pending > 0 && `(${tabCounts.pending})`}
          </button>
          <button
            onClick={() => setActiveTab('overdue')}
            className={`px-6 py-2 font-medium transition ${
              activeTab === 'overdue'
                ? 'bg-green-700 text-white'
                : 'bg-red-200 text-red-700 hover:bg-red-300'
            }`}
          >
            Gecikmiş {tabCounts.overdue > 0 && `(${tabCounts.overdue})`}
          </button>
        </div>

        {/* Add Todo */}
        <div className="mb-8">
          <AddTodo onAdd={addTodo} inputRef={addInputRef} />
        </div>

        {/* Active Tasks */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Görevler</h2>
          </div>

          <TodoList
            todos={filteredTodos.active}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>

        {/* Completed Tasks */}
        {filteredTodos.completed.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tamamlanan ▲</h2>
            <TodoList
              todos={filteredTodos.completed}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;