export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  category?: 'today' | 'pending' | 'overdue';
}