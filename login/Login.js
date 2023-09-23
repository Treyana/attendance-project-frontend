import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getLoginStatus, getRoles, login } from "./authSlice";
import classes from "./Login.module.css";
import axios from "axios";

const Login = () => {
  const name = `text-center mt-4 ${classes.name}`;
  const formField = `${classes.formField} d-flex align-items-center`;
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginRequestStatus, setLoginRequestStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setMessage("");
  }, [username, password]);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const canLogin =
    [username, password].every(Boolean) && loginRequestStatus === "idle";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";
  const fromS = location.state?.from?.pathname || "/user/home";

  const loginStatus = useSelector(getLoginStatus);
  const roleType = useSelector(getRoles);
  console.log("RoleType:" + roleType);

  useEffect(() => {
    if (String(loginStatus) === "success") {
      if (roleType == "ROLE_ADMIN") {
        navigate(from, { replace: true });
      } else {
        navigate(fromS, { replace: true });
      }
    }
  }, [loginStatus, from, navigate]);

  useEffect(() => {
    if (String(loginStatus) === "failed") {
      setMessage(
        <div
          className="text-center text-danger"
          style={{ padding: "10px", background: "rgba(235, 64, 52, 0.1)" }}
        >
          {" "}
          <i class="mdi mdi-alert-octagon fs-5"></i>
          <span style={{ fontSize: "14px" }}>
            There was a problem logging in. Check your email or password!
          </span>
        </div>
      );
    }
  }, [loginStatus]);

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8585/api/user/login",
        {
          username,
          password,
        }
      );

      if (canLogin) {
        setLoginRequestStatus("pending");

        try {
          dispatch(
            login({
              username,
              password,
            })
          ).unwrap();
        } catch (error) {
          console.error(error);
        } finally {
          setLoginRequestStatus("idle");
        }
      }
    } catch (err) {
      setMessage(
        <div
          className="text-center text-danger"
          style={{ padding: "10px", background: "rgba(235, 64, 52, 0.1)" }}
        >
          {" "}
          <i class="mdi mdi-alert-octagon fs-5"></i>
          <span style={{ fontSize: "14px" }}>
            There was a problem logging in. Check your email or password!
          </span>
        </div>
      );
    }
  };

  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className={classes.wrapper} style={{ maxWidth: "350px" }}>
      <div className={name}>Sign in</div>
      <form className="p-3 mt-3">
        <div className={formField}>
          <span class="far fa-user"></span>
          <input
            type="text"
            name="userName"
            value={username}
            onChange={onEmailChange}
            id="Email"
            placeholder="Email"
          />
        </div>
        <div className={formField}>
          <span className="fas fa-key"></span>
          <input
            // type="password"
            type={passwordType}
            name="password"
            id="pwd"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
          />
          {/* // for hidden password */}
          <span onClick={togglePassword} style={{ marginRight: "10px" }}>
            {passwordType === "password" ? (
              <i className="mdi mdi-eye-off"></i>
            ) : (
              <i className="mdi mdi-eye"></i>
            )}
          </span>
        </div>
        <button
          className={classes.btn}
          onClick={onLogin}
          style={{ marginTop: "30px" }}
        >
          Login
        </button>
      </form>
      {message}
    </div>
  );
};

export default Login;
