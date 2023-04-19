import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TodoList from "../TodoList";

function TodoPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/signin");
    }
  }, []);

  const todoSubmit = async () => {
    await axios.post(
      "https://www.pre-onboarding-selection-task.shop/todos",
      { todo: text },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setTodos(res.data);
      });
  };

  useEffect(() => {
    axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setTodos(res.data);
      });
  }, []);

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="mb-2">
        <input
          data-testid="new-todo-input"
          className="w-56 mr-2 border border-neutral-400"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          data-testid="new-todo-add-button"
          className="px-2 border bg-slate-300 border-neutral-400"
          onClick={() => {
            todoSubmit();
            setText("");
          }}
        >
          추가
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoList
            key={todo.id}
            id={todo.id}
            todo={todo.todo}
            isCompleted={todo.isCompleted}
            setTodos={setTodos}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;
