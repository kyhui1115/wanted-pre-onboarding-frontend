import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("https://pre-onboarding-selection-task.shop/auth/signin", {
        email: loginInfo.email,
        password: loginInfo.password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          navigate("/todo");
        }
      });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="mb-4 text-2xl">로그인</h1>
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
          data-testid="signin-button"
          disabled={!(dis.email && dis.password)}
          type="submit"
          onClick={loginHandler}
          className="mt-4 bg-blue-500 w-36 disabled:bg-gray-400"
        >
          로그인
        </button>
        <Link
          to="/signup"
          type="button"
          className="mt-4 text-center bg-green-400 w-36"
        >
          회원가입하기
        </Link>
      </form>
    </div>
  );
}

export default SigninPage;
