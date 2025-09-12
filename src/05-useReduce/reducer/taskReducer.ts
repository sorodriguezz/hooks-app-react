import * as z from "zod";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const TaskStateSchema = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getTasksInitialState = (): TaskState => {
  const localStorageTasks = localStorage.getItem("tasks-state");

  if (localStorageTasks) {
    const result = TaskStateSchema.safeParse(JSON.parse(localStorageTasks));
    if (result.success) return result.data;
  }

  return {
    todos: [],
    length: 0,
    completed: 0,
    pending: 0,
  };
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.todos.length + 1,
        pending: state.pending + 1,
      };
    }
    case "TOGGLE_TODO": {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      const completedTodos = updatedTodos.filter((todo) => todo.completed);
      const pendingTodos = updatedTodos.filter((todo) => !todo.completed);

      return {
        ...state,
        todos: updatedTodos,
        length: state.todos.length,
        completed: completedTodos.length,
        pending: pendingTodos.length,
      };
    }
    case "DELETE_TODO": {
      const currentTodo = state.todos.filter(
        (todo) => todo.id !== action.payload
      );

      const completedTodos = state.todos.filter(
        (todo) => todo.id === action.payload && todo.completed
      );

      const pendingTodos = state.todos.filter(
        (todo) => todo.id === action.payload && !todo.completed
      );

      return {
        ...state,
        todos: currentTodo,
        length: state.todos.length,
        completed: completedTodos.length,
        pending: pendingTodos.length,
      };
    }
    default:
      return state;
  }
};
