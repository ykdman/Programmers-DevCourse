import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TodoModal from "./TodoModal";

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
  const [showModal, setShowModal] = useState(false);

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <li className="todo-list-item">
      <input type="checkbox" className="" onChange={() => onChecked(todoId)} />
      {!isChecked && <span>{text}</span>}
      {isChecked && <del>{text}</del>}
      <Button variant="secondary" size="sm" onClick={() => onRemove(todoId)}>
        삭제
      </Button>
      <Button variant="info" onClick={handleShowModal}>
        정보
      </Button>
      <TodoModal show={showModal} handleClose={handleCloseModal} text={text} />
    </li>
  );
}

export default TodoListItem;
