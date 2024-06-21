import { useState } from "react";
import "./App.css";
import TodoListContainer from "./components/TodoListContainer";
import TodoGenerator from "./components/TodoGenerator";
import Clock from "./components/Clock";
import MyWeather from "./components/MyWeather";

export type TodoType = {
  id: number;
  text: string;
  isChecked: boolean;
};

const initialTodos: TodoType[] = [
  {
    id: 1,
    text: "공부하기",
    isChecked: false,
  },
  {
    id: 2,
    text: "잠자기",
    isChecked: false,
  },
  {
    id: 3,
    text: "밥먹기",
    isChecked: false,
  },
];

function App() {
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);

  function checkHandler(todoId: number) {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === todoId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  }

  function addTodoItem(text: string) {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random(), text: text, isChecked: false },
    ]);
  }

  function removeTodoItem(todoId: number) {
    setTodos((prevTodos) => {
      const filteredTodos = prevTodos.filter((todo) => todo.id !== todoId);
      return [...filteredTodos];
    });
  }

  const title = "오늘 할 일";

  return (
    <>
      <div className="container">
        <h1>{title}</h1>
        <TodoGenerator addTodoHandler={addTodoItem} />
        <Clock />
        <TodoListContainer
          todos={todos}
          checkHandlerFunc={checkHandler}
          removeTodo={removeTodoItem}
        />
        <MyWeather weather="맑음">일기예보</MyWeather>
      </div>
    </>
  );
}

export default App;
