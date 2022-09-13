import { useGetTodosQuery } from "../features/api/apiSlice";
import Loading from "./Loading";
import Todo from "./Todo";

export default function TodoList() {
  const { data: todos, isLoading, isError } = useGetTodosQuery();

  let content = null;
  if (isLoading) {
    content = <Loading />;
  }
  if (!isLoading && isError) {
    content = (
      <div>
        <h1>Something error.</h1>
      </div>
    );
  }
  if (!isLoading && !isError && todos.length === 0) {
    content = (
      <div>
        <h1>No todos found.</h1>
      </div>
    );
  }
  if (!isLoading && !isError && todos.length > 0) {
    content = todos.map((todo) => <Todo key={todo.id} />);
  }
  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {content}
    </div>
  );
}
