import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (path === "/") {
      navigate("/signin");
    }
  }, []);

  return;
}

export default HomePage;
