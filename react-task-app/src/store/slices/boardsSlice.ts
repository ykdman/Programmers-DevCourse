import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoardItem } from "../../types/index.ts";

type TBoardState = {
  modalActive: boolean;
  boardArray: IBoardItem[];
};

type TAddBoardAction = {
  board: IBoardItem;
};
type TRemoveListAction = {
  boardId: string;
  listId: string;
};

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: "board-0",
      boardName: "첫번째 게시물",
      lists: [
        {
          listId: "list-0",
          listName: "List 1",
          tasks: [
            {
              taskId: "task-0",
              taskName: "Task 1",
              taskDescription: "description",
              taskOwner: "duck",
            },
            {
              taskId: "task-1",
              taskName: "Task 2",
              taskDescription: "description",
              taskOwner: "duck",
            },
          ],
        },
        {
          listId: "list-1",
          listName: "List 2",
          tasks: [
            {
              taskId: "task-2",
              taskName: "Task 3",
              taskDescription: "description",
              taskOwner: "duck",
            },
            {
              taskId: "task-3",
              taskName: "Task 4",
              taskDescription: "description",
              taskOwner: "duck",
            },
          ],
        },
      ],
    },
    {
      boardId: "board-1",
      boardName: "두번째 게시물",
      lists: [
        {
          listId: "list-0",
          listName: "List 1",
          tasks: [
            {
              taskId: "task-0",
              taskName: "Task 1",
              taskDescription: "description",
              taskOwner: "duck",
            },
            {
              taskId: "task-1",
              taskName: "Task 2",
              taskDescription: "description",
              taskOwner: "duck",
            },
          ],
        },
        {
          listId: "list-1",
          listName: "List 2",
          tasks: [
            {
              taskId: "task-2",
              taskName: "Task 3",
              taskDescription: "description",
              taskOwner: "duck",
            },
            {
              taskId: "task-3",
              taskName: "Task 4",
              taskDescription: "description",
              taskOwner: "duck",
            },
          ],
        },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board);
    },
    removeList: (state, { payload }: PayloadAction<TRemoveListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter(
                (list) => list.listId !== payload.listId
              ),
            }
          : board
      );
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
  },
});

export const { addBoard, removeList, setModalActive } = boardSlice.actions;
export const boardReducer = boardSlice.reducer;
