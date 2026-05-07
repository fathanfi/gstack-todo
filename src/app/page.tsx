"use client";

import TodoApp from "@/components/todo-app";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export default function Home() {
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);
  if (!isClient) {
    return null;
  }
  return <TodoApp />;
}
