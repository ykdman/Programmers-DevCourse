import { Modal, Button } from "react-bootstrap";
import { TodoType } from "../App";

type TodoModalType = {
  show: boolean;
  text: string;
  handleClose: () => void;
};

function TodoModal({ show, text, handleClose }: TodoModalType): JSX.Element {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Todo 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleClose}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TodoModal;
