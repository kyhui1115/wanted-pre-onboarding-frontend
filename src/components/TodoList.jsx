import axios from "axios";
import { useState } from "react";

function TodoList({ todo, id, isCompleted, setTodos }) {
  const [editMode, setEditMode] = useState(true);
  const [editText, setEditText] = useState(todo);
  const [completed, setCompleted] = useState(false);

  const editSubmit = async () => {
    await axios.put(
      `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      {
        todo: editText,
        isCompleted: completed,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    await axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setTodos(res.data);
      });
    setEditMode(true);
  };

  const deleteSubmit = async () => {
    await axios.delete(
      `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    await axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setTodos(res.data);
      });
  };

  return (
    <li className="flex mb-2">
      <label className="flex mr-2">
        <input
          type="checkbox"
          className="mr-1"
          defaultChecked={isCompleted}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        {editMode ? <span>{todo}</span> : null}
      </label>
      {editMode ? (
        <div>
          <button
            data-testid="modify-button"
            className="px-1 mr-1 border bg-slate-300 border-neutral-400"
            onClick={() => setEditMode(false)}
          >
            수정
          </button>
          <button
            data-testid="delete-button"
            className="px-1 border bg-slate-300 border-neutral-400"
            onClick={deleteSubmit}
          >
            삭제
          </button>
        </div>
      ) : (
        <div>
          <input
            data-testid="modify-input"
            className="mr-2 border border-neutral-400 w-44"
            defaultValue={todo}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button
            data-testid="submit-button"
            className="px-1 mr-1 border bg-slate-300 border-neutral-400"
            onClick={editSubmit}
          >
            제출
          </button>
          <button
            data-testid="cancel-button"
            className="px-1 border bg-slate-300 border-neutral-400"
            onClick={() => {
              setEditMode(true);
              setEditText(todo);
            }}
          >
            취소
          </button>
        </div>
      )}
    </li>
  );
}

export default TodoList;
