import TodoListItem from "./TodoListItem";

type TodoType = {
  id: number;
  text: string;
  isChecked: boolean;
};

type TodoListContainerProps = {
  todos: TodoType[];
  checkHandlerFunc: (todoId: number) => void;
  removeTodo: (id: number) => void;
};

function TodoListContainer({
  todos,
  checkHandlerFunc,
  removeTodo,
}: TodoListContainerProps): JSX.Element {
  return (
    <div className="container">
      <div className="container">
        <div className="board">
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoListItem
                key={todo.id}
                onRemove={removeTodo}
                todoId={todo.id}
                text={todo.text}
                onChecked={checkHandlerFunc}
                isChecked={todo.isChecked}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoListContainer;
