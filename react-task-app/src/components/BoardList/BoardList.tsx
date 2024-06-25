import { FC, useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { FiPlusCircle } from "react-icons/fi";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./BoardList.css";
import clsx from "clsx";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>; // state setter 의 형식
};

const BoardList: FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleFormOpen = () => {
    setIsFormOpen((prevFormState) => !prevFormState);
  };
  const switchBoardHandler = (boardId: string) => {
    setActiveBoardId(boardId);
  };

  const clickAddButtonHandler = () => {
    setIsFormOpen(true);
    inputRef.current?.focus();
  };

  return (
    <div className={container}>
      <div className={title}>게시판:</div>
      {boardArray.map((board, idx) => (
        <div
          key={board.boardId}
          onClick={() => switchBoardHandler(board.boardId)}
          className={clsx(
            {
              [boardItemActive]:
                boardArray.findIndex(
                  (board) => board.boardId === activeBoardId
                ) === idx,
            },
            {
              [boardItem]:
                boardArray.findIndex(
                  (board) => board.boardId === activeBoardId
                ) !== idx,
            }
          )}
        >
          <div>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm toggleFormOpen={toggleFormOpen} inputRef={inputRef} />
        ) : (
          <FiPlusCircle className={addButton} onClick={clickAddButtonHandler} />
        )}
      </div>
    </div>
  );
};

export default BoardList;
