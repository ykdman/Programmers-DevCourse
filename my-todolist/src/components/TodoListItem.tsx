import React from "react";
import { Button } from "react-bootstrap";

type TodoListItemType = {
  text: string;
  todoId: number;
  onChecked: (todoId: number) => void;
  isChecked: boolean;
  onRemove: (todoId: number) => void;
};

function TodoListItem({
  todoId,
  text,
  onChecked,
  isChecked,
  onRemove,
}: TodoListItemType) {
  return (
    <li className="todo-list-item">
      <input type="checkbox" className="" onChange={() => onChecked(todoId)} />
      {!isChecked && <span>{text}</span>}
      {isChecked && <del>{text}</del>}
      <Button variant="secondary" size="sm" onClick={() => onRemove(todoId)}>
        삭제
      </Button>
    </li>
  );
}

export default TodoListItem;
