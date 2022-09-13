import { useDispatch, useSelector } from "react-redux";
import {
  removeColor,
  resetFilter,
  setColor,
  setStatus,
} from "../features/filter/filterSlice";

export default function Footer() {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.filter);
  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>2 tasks left</p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          className="cursor-pointer font-bold"
          onClick={() => dispatch(resetFilter())}
        >
          All
        </li>
        <li>|</li>
        <li
          className="cursor-pointer"
          onClick={() => dispatch(setStatus("incomplete"))}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          className="cursor-pointer"
          onClick={() => dispatch(setStatus("completed"))}
        >
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            colors.includes("green") ? "bg-green-500" : ""
          }`}
          onClick={() =>
            colors.includes("green")
              ? dispatch(removeColor("green"))
              : dispatch(setColor("green"))
          }
        ></li>
        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            colors.includes("red") ? "bg-red-500" : ""
          }`}
          onClick={() =>
            colors.includes("red")
              ? dispatch(removeColor("red"))
              : dispatch(setColor("red"))
          }
        ></li>
        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
            colors.includes("yellow") ? "bg-yellow-500" : ""
          }`}
          onClick={() =>
            colors.includes("yellow")
              ? dispatch(removeColor("yellow"))
              : dispatch(setColor("yellow"))
          }
        ></li>
      </ul>
    </div>
  );
}
