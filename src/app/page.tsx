"use client";

import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import { loadTodos, saveTodos } from "@/lib/todo-storage";
import { Todo, TodoFilter } from "@/types/todo";
import { useEffect, useMemo, useState } from "react";

const FILTERS: TodoFilter[] = ["all", "active", "completed"];

function makeTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now(),
  };
}

export default function Home() {
  const [filter, setFilter] = useState<TodoFilter>(() => {
    if (typeof window === "undefined") {
      return "all";
    }
    const incoming = new URLSearchParams(window.location.search).get("filter");
    if (incoming && FILTERS.includes(incoming as TodoFilter)) {
      return incoming as TodoFilter;
    }
    return "all";
  });
  const [todos, setTodos] = useState<Todo[]>(() =>
    typeof window === "undefined" ? [] : loadTodos(),
  );

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const visibleTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [filter, todos]);

  const setFilterAndUrl = (next: TodoFilter) => {
    setFilter(next);
    const params = new URLSearchParams(window.location.search);
    if (next === "all") {
      params.delete("filter");
    } else {
      params.set("filter", next);
    }
    const query = params.toString();
    const path = query ? `/?${query}` : "/";
    window.history.replaceState({}, "", path);
  };

  const handleAdd = (text: string) => {
    setTodos((current) => [makeTodo(text), ...current]);
  };

  const handleToggle = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="mx-auto w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Todo List</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Keep it simple. Add, complete, and clear your tasks.
          </p>
        </div>

        <div className="mb-4">
          <TodoForm onAdd={handleAdd} />
        </div>

        <div className="mb-4 flex gap-2">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilterAndUrl(option)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                option === filter
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <TodoList
          todos={visibleTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}
