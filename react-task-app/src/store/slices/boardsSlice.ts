import { createSlice } from "@reduxjs/toolkit";
import { IBoardItem } from "../../types/index.ts";

type TBoardState = {
  modalActive: boolean;
  boardArray: IBoardItem[];
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
  ],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
});

export const boardReducer = boardSlice.reducer;
