import { useState } from "react";
import { toast } from "react-toastify";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import { useAddTodoMutation } from "../features/api/apiSlice";

export default function Header() {
  const [addTodo, { data: todo, isLoading, isError }] = useAddTodoMutation();
  const [inputText, setInputText] = useState("");

  const functionThatReturnPromise = () =>
    new Promise((resolve) => setTimeout(resolve, 3000));

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      text: inputText,
      completed: false,
      color: "",
    });
    setInputText("");
    toast.promise(functionThatReturnPromise, {
      pending: "Promise is pending",
      success: "Promise resolved 👌",
      error: "Promise rejected 🤯",
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
      >
        <img src={noteImage} className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          value={inputText}
          placeholder="Type your todo"
          onChange={(e) => setInputText(e.target.value)}
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
        />
        <button
          type="submit"
          className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
        ></button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li className="flex space-x-1 cursor-pointer">
          <img className="w-4 h-4" src={tickImage} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>
        <li className="cursor-pointer">Clear completed</li>
      </ul>
    </div>
  );
}
