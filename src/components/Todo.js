import cancelImage from "../assets/images/cancel.png";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../features/api/apiSlice";
import noteImage from "../assets/images/notes.png";
import { useDispatch } from "react-redux";
import { showModel } from "../features/modal/modalSlice";
import Loading from "./Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Todo({ todo }) {
  const [
    editTodo,
    {
      data: editedTodo,
      isLoading: editIsLoading,
      isError: editIsError,
      isSuccess: editIsSuccess,
    },
  ] = useEditTodoMutation();
  const [deleteTodo, { isLoading, isError, isSuccess }] =
    useDeleteTodoMutation();
  const dispatch = useDispatch();
  const { id, text, completed, color } = todo;

  useEffect(() => {
    if (isError || editIsError) {
      toast.error("Something error", { autoClose: 2000 });
    } else if (!isError && isSuccess) {
      toast.success("Todo's deleted successfully Alhamdulillah", {
        autoClose: 2000,
      });
    } else if (!editIsError && editIsSuccess) {
      toast.success("Todo's edit successfully Alhamdulillah", {
        autoClose: 2000,
      });
    } else {
      console.log("good");
    }
  }, [isError, isSuccess]);

  const handleDelete = (todoID) => {
    deleteTodo(todoID);
  };

  const handleEditButton = (editTodoID) => {
    dispatch(showModel(editTodoID));
  };

  const handleCompleteTodo = (editTodoID) => {
    editTodo({
      id: editTodoID,
      data: {
        completed: true,
      },
    });
  };

  const handleInCompleteTodo = (editTodoID) => {
    editTodo({
      id: editTodoID,
      data: {
        completed: false,
      },
    });
  };

  const handleSelectGreenPriority = (editTodoID) => {
    editTodo({
      id: editTodoID,
      data: {
        color: "green",
      },
    });
  };
  const handleSelectYellowPriority = (editTodoID) => {
    editTodo({
      id: editTodoID,
      data: {
        color: "yellow",
      },
    });
  };
  const handleSelectRedPriority = (editTodoID) => {
    editTodo({
      id: editTodoID,
      data: {
        color: "red",
      },
    });
  };

  let content = (
    <>
      <div
        className={`rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed && "border-green-500 focus-within:border-green-500"
        }`}
      >
        <input
          type="checkbox"
          checked={completed}
          className="opacity-0 absolute rounded-full cursor-pointer"
          onClick={
            completed
              ? () => handleInCompleteTodo(id)
              : () => handleCompleteTodo(id)
          }
        />
        {completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      <div className={`select-none flex-1 ${completed ? "line-through" : ""}`}>
        {text}
      </div>

      <div>
        <img
          src={noteImage}
          className="w-4 h-4 cursor-pointer"
          alt="Edit todo"
          onClick={() => handleEditButton(id)}
        />
      </div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 hover:bg-green-500 ${
          color === "green" ? "bg-green-500" : ""
        }`}
        onClick={() => handleSelectGreenPriority(id)}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 hover:bg-yellow-500 ${
          color === "yellow" ? "bg-yellow-500" : ""
        }`}
        onClick={() => handleSelectYellowPriority(id)}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 hover:bg-red-500 ${
          color === "red" ? "bg-red-500" : ""
        }`}
        onClick={() => handleSelectRedPriority(id)}
      ></div>

      <img
        src={cancelImage}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
        onClick={() => handleDelete(id)}
      />
    </>
  );

  if (isLoading || editIsLoading) {
    content = <Loading />;
  }

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      {content}
    </div>
  );
}
