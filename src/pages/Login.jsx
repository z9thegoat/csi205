import { useRef } from "react";
import Form from "react-bootstrap/Form";
import { verifyUser } from "../data/users";

function Login({ setToken, setRole }) {
  const userRef = useRef();
  const passRef = useRef();

  return (
     <div
  className="d-flex flex-column align-items-center justify-content-center vh-100 "
>
  <div
    className="border border-2 rounded-4 shadow-lg p-4 bg-white"
    style={{ width: "350px", borderColor: "#007bff" }}
  >
    <h3
      className="text-center fw-bold mb-4"
      style={{ color: "#6610f2" }}
    >
      Login
    </h3>

    <Form.Label htmlFor="username" className="fw-semibold" style={{ color: "#007bff" }}>
      Username
    </Form.Label>
    <Form.Control
      type="text"
      id="username"
      placeholder="Enter username"
      ref={userRef}
      className="mb-3"
      style={{ borderColor: "#007bff" }}
    />

    <Form.Label htmlFor="password" className="fw-semibold" style={{ color: "#6610f2" }}>
      Password
    </Form.Label>
    <Form.Control
      type="password"
      id="password"
      placeholder="Enter password"
      ref={passRef}
      style={{ borderColor: "#6610f2" }}
    />

    <button
      className="btn mt-4 w-100 fw-semibold shadow-sm text-white"
      style={{
        background: "linear-gradient(90deg, #007bff, #6610f2)",
        border: "none",
      }}
      onClick={() => {
        const user = userRef.current.value.trim();
        const pass = passRef.current.value.trim();
        userRef.current.value = "";
        passRef.current.value = "";

        const userInfo = verifyUser(user, pass);
        if (userInfo === null) {
          alert("❌ Wrong username or password");
          userRef.current.focus();
        } else {
          setToken(userInfo.token);
          setRole(userInfo.role);
        }
      }}
    >
      Login
    </button>
  </div>
</div>

  );
}

export default Login;
