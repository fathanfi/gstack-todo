import { loadTodos, saveTodos } from "@/lib/todo-storage";
import { Todo } from "@/types/todo";
import { beforeEach, describe, expect, it, vi } from "vitest";

const key = "todo-gstack-items";

describe("todo storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns empty array when storage is empty", () => {
    expect(loadTodos()).toEqual([]);
  });

  it("loads stored todos", () => {
    const todos: Todo[] = [
      { id: "1", text: "Ship todo app", completed: false, createdAt: 1 },
    ];
    window.localStorage.setItem(key, JSON.stringify(todos));

    expect(loadTodos()).toEqual(todos);
  });

  it("filters invalid stored values safely", () => {
    window.localStorage.setItem(
      key,
      JSON.stringify([{ id: "1", text: "x", completed: "nope", createdAt: 1 }]),
    );

    expect(loadTodos()).toEqual([]);
  });

  it("swallows write errors", () => {
    const setItemSpy = vi
      .spyOn(window.localStorage.__proto__, "setItem")
      .mockImplementation(() => {
        throw new Error("quota");
      });

    expect(() =>
      saveTodos([{ id: "1", text: "x", completed: false, createdAt: 1 }]),
    ).not.toThrow();

    setItemSpy.mockRestore();
  });
});
