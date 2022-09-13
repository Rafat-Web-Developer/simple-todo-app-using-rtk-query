import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEditTodoMutation } from "../features/api/apiSlice";
import { cancleModel } from "../features/modal/modalSlice";
import Loading from "./Loading";

const EditForm = ({ todo, handleCancleModal }) => {
  const [editTodo, { data: editedTodo, isLoading, isError, isSuccess }] =
    useEditTodoMutation();
  const [inputText, setInputText] = useState(todo?.text);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo({
      id: todo.id,
      data: {
        text: inputText,
        completed: false,
        color: "",
      },
    });
  };

  let content = (
    <form onSubmit={handleSubmit}>
      <label
        for="name"
        class="text-gray-800 text-sm font-bold leading-tight tracking-normal"
      >
        Todo Text
      </label>
      <input
        id="name"
        class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        placeholder="James"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div class="flex items-center justify-start w-full">
        <button
          type="submit"
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
        >
          Submit
        </button>
        <button
          class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
          onClick={handleCancleModal}
        >
          Cancel
        </button>
      </div>
    </form>
  );
  if (isLoading) {
    content = <Loading />;
  }
  if (!isLoading && isError) {
    content = (
      <div>
        <p>Something error</p>
      </div>
    );
  }

  if (!isLoading && !isError && isSuccess) {
    dispatch(cancleModel());
  }

  return content;
};

export default EditForm;
