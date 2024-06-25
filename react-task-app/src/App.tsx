import { useState } from "react";
import { appContainer, board, buttons } from "./App.css.ts";
import BoardList from "./components/BoardList/BoardList.tsx";
import ListsContainer from "./components/ListsContainer/ListsContainer.tsx";
import { useTypedSelector } from "./hooks/redux.ts";

function App() {
  const [activeBoardId, setActiveBoardId] = useState<string>("board-0");
  const boards = useTypedSelector((state) => state.boards.boardArray);

  const activeBoard = boards.filter(
    (board) => board.boardId === activeBoardId
  )[0];

  const activeLists = activeBoard.lists;

  return (
    <div className={appContainer}>
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <ListsContainer
          activeLists={activeLists}
          boardId={activeBoard.boardId}
        />
      </div>

      <div className={buttons}>
        <button>이 게시판 삭제하기</button>
        <button></button>
      </div>
    </div>
  );
}

export default App;
