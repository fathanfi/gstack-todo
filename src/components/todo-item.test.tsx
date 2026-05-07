import TodoItem from "@/components/todo-item";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("TodoItem", () => {
  it("calls toggle and delete handlers", () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(
      <TodoItem
        todo={{ id: "1", text: "Buy milk", completed: false, createdAt: 1 }}
        onToggle={onToggle}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByRole("checkbox", { name: "Toggle Buy milk" }));
    fireEvent.click(screen.getByRole("button", { name: "Delete Buy milk" }));

    expect(onToggle).toHaveBeenCalledWith("1");
    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
