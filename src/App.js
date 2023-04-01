import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import SigninPage from "./components/pages/SigninPage";
import SignupPage from "./components/pages/SignupPage";
import TodoPage from "./components/pages/TodoPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
