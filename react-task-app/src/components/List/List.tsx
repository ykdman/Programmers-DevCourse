import { FC } from "react";
import { IList, ITask } from "../../types";
import { GrSubtract } from "react-icons/gr";
import Task from "../Task/Task";
import ActionButton from "../ActionButton/ActionButton";
import { useTypedDispatch } from "../../hooks/redux";
import { removeList, setModalActive } from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import { deleteButton, header, listWrapper, name } from "./List.css";

type TListProps = {
  list: IList;
  boardId: string;
};

const List: FC<TListProps> = ({ list, boardId }) => {
  const dispatch = useTypedDispatch();
  const listDeleteHandelr = (listId: string) => {
    dispatch(
      removeList({
        boardId,
        listId,
      })
    );

    dispatch(
      addLog({
        logAuthor: "kdman",
        logId: v4(),
        logMessage: `리스트 삭제하기 : ${list.listName}`,
        logTimestamp: String(Date.now()),
      })
    );
  };

  const handleTaskChange = (
    boardId: string,
    listId: string,
    taskId: string,
    task: ITask
  ) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  return (
    <div className={listWrapper}>
      <div className={header}>
        <div className={name}>{list.listName}</div>
        <GrSubtract
          className={deleteButton}
          onClick={() => listDeleteHandelr(list.listId)}
        />
      </div>
      {list.tasks.map((task, idx) => (
        <div
          key={task.taskId}
          onClick={() =>
            handleTaskChange(boardId, list.listId, task.taskId, task)
          }
        >
          <Task
            taskName={task.taskName}
            taskDescription={task.taskDescription}
            boardId={boardId}
            id={task.taskId}
            index={idx}
          />
        </div>
      ))}
      <ActionButton />
    </div>
  );
};

export default List;
