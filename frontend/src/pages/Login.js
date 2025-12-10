// Login.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Toast from "../components/Toast";
import "../styles/Auth.css";
import logo from "../logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('expired') === 'true') {
      setToastMessage("Please log in again.");
      setShowToast(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async function handleLogin() {
    if (!email || !password) {
      setToastMessage("Please fill in all fields.");
      setShowToast(true);
      return;
    }

    if (!validateEmail(email)) {
      setToastMessage("Please enter a valid email format.");
      setShowToast(true);
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_FASTAPI_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        let detail = null;
        try { detail = (await res.json())?.detail; } catch {}
        throw new Error(detail || "An unknown error occurred.");
      }
      window.location.reload();
    } catch (error) {
      setToastMessage(error.message || "An unknown error occurred.");
      setShowToast(true);
    }
  }

  return (
    <motion.div
      className="auth-container"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="auth-logo">
        <img src={logo} alt="DEVOCHAT" className="logo-image" />
      </div>
      <form className="auth-input-container" onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}>
        <input
          className="id field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[a-zA-Z0-9@._-]*$/.test(value)) {
              setEmail(value);
            }
          }}
          autoComplete="username"
        />
        <input
          className="password field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(value)) {
              setPassword(value);
            }
          }}
          autoComplete="current-password"
        />
        <button className="continue field" type="submit">
          Login
        </button>
      </form>
      <div className="footer">
        <p>Don't have an account?</p>
        <button className="route" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>

      <Toast
        type="error"
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </motion.div>
  );
}

export default Login;