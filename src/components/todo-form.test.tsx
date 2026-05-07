import TodoForm from "@/components/todo-form";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("TodoForm", () => {
  it("submits trimmed text", () => {
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);

    fireEvent.change(screen.getByLabelText("Todo input"), {
      target: { value: "  write tests  " },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Add" }));

    expect(onAdd).toHaveBeenCalledWith("write tests");
  });

  it("does not submit blank input", () => {
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);

    fireEvent.change(screen.getByLabelText("Todo input"), {
      target: { value: "   " },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Add" }));

    expect(onAdd).not.toHaveBeenCalled();
  });
});
