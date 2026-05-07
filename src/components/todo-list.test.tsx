import TodoList from "@/components/todo-list";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("TodoList", () => {
  it("shows empty state when no todos", () => {
    render(<TodoList todos={[]} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText("No todos yet. Add your first task above.")).toBeVisible();
  });

  it("renders todo items", () => {
    render(
      <TodoList
        todos={[{ id: "1", text: "Task", completed: false, createdAt: 1 }]}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("Task")).toBeVisible();
  });
});
