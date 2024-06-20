import { useState, ChangeEvent } from "react";
import { Button } from "react-bootstrap";

type TodoGeneratorProps = {
  addTodoHandler: (text: string) => void;
};

function TodoGenerator({ addTodoHandler }: TodoGeneratorProps): JSX.Element {
  const [newTodo, setNewTodo] = useState<string>("");

  function changeTodoHandler(e: ChangeEvent<HTMLInputElement>) {
    setNewTodo(e.target.value);
  }

  return (
    <div className="todo-generator">
      <input type="text" onChange={(e) => changeTodoHandler(e)} />
      <Button
        as="button"
        variant="primary"
        onClick={() => addTodoHandler(newTodo)}
      >
        생성
      </Button>
    </div>
  );
}

export default TodoGenerator;
