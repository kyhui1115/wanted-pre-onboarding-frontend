import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SigninPage() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [dis, setDis] = useState({
    email: false,
    password: false,
  });

  const emailCheck = (e) => {
    if (e.target.value.match(/@/)) {
      setDis({ ...dis, email: true });
    } else {
      setDis({ ...dis, email: false });
    }
  };

  const passwordCheck = (e) => {
    if (e.target.value.length >= 8) {
      setDis({ ...dis, password: true });
    } else {
      setDis({ ...dis, password: false });
    }
  };

  const signinHandler = (e) => {
    e.preventDefault();
    axios
      .post("https://pre-onboarding-selection-task.shop/auth/signup", {
        email: loginInfo.email,
        password: loginInfo.password,
      })
      .then((res) => {
        if (res.status === 201) {
          navigate("/signin");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
    }
  }, []);

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="mb-4 text-2xl">회원가입</h1>
      <form className="flex flex-col items-center">
        <label>
          <span>이메일 : </span>
          <input
            value={loginInfo.email}
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, email: e.target.value });
              emailCheck(e);
            }}
            type="email"
            data-testid="email-input"
            className="w-40 mb-2 ml-3 border"
          />
        </label>
        <label>
          <span>비밀번호 : </span>
          <input
            value={loginInfo.password}
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, password: e.target.value });
              passwordCheck(e);
            }}
            data-testid="password-input"
            type="password"
            className="w-40 border"
          />
        </label>
        <button
          data-testid="signup-button"
          disabled={!(dis.email && dis.password)}
          type="submit"
          onClick={signinHandler}
          className="mt-4 bg-blue-500 w-36 disabled:bg-gray-400"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SigninPage;
