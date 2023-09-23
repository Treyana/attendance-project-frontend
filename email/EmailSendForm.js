import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import classes from "./EmailSendForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../login/authSlice";
import { selectTeacherById } from "../teacher/teacherSlice";
import { sendEmail } from "./emailSlice";
// import { sendEmail } from "./emailSlice";
// import { getToken } from "../component/features/auth/authSlice";
// import { selectUserById } from "../component/features/user/userSlice";

const EmailSendForm = () => {
  const { userId } = useParams();
  console.log("UserId in email" + userId);
  const emailSentUser = useSelector((state) =>
    selectTeacherById(state, Number(userId))
  );
  console.log(emailSentUser);

  const [to, setTo] = useState(emailSentUser.username);
  const [subject, setSubject] = useState("To Change Password");
  const [text, setText] = useState(
    "Dear user, here is your username (" +
      emailSentUser.fullname +
      ") and your password (00000000) to enter our Attendance System Application."
  );
  const token = useSelector(getToken);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const navigate = useNavigate();

  const onToChange = (e) => setTo(e.target.value);
  const onSubjectChange = (e) => setSubject(e.target.value);
  const onTextChange = (e) => setText(e.target.value);

  const canSave =
    [to, subject, text].every(Boolean) && addRequestStatus === "idle";

  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault();

    console.log("Send Email" + sendEmail);

    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(
          sendEmail({
            email: {
              to,
              subject,
              text,
            },
            token,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setAddRequestStatus("idle");
      }

      setTo("");
      setSubject("");
      setText("");

      navigate("/admin");
    }
  };

  return (
    <div className={classes.all}>
      <div className={classes.wrapper}>
        <h2>Send Email Form</h2>
        <form onSubmit={onSubmit}>
          <div className={classes.row}>
            <div className={classes.col}>
              <div className={classes.col}>
                <div className={classes.inputGroup}>
                  <div className={classes.inputBox}>
                    <input
                      type="text"
                      required
                      className={classes.name}
                      placeholder="To"
                      value={to}
                      onChange={onToChange}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className={classes.col}>
                <div className={classes.inputGroup}>
                  <div className={classes.inputBox}>
                    <input
                      type="text"
                      required
                      className={classes.name}
                      placeholder="Subject"
                      value={subject}
                      onChange={onSubjectChange}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className={classes.col}>
                <div className={classes.inputGroup}>
                  <div className={classes.inputBox}>
                    <input
                      type="password"
                      required
                      className={classes.name}
                      placeholder="Text"
                      value={text}
                      onChange={onTextChange}
                      disabled
                    />
                    {/* <textarea
                      required
                      className={classes.name}
                      placeholder="Text"
                      value={text}
                      onChange={onTextChange}
                      style={{ paddingLeft: "10px" }}
                    ></textarea> */}
                  </div>
                </div>
              </div>

              <div className={classes.inputGroup}>
                <div className={classes.inputBox}>
                  <button
                    type="submit"
                    className={classes.btn}
                    style={{ margin: "15px" }}
                  >
                    Send
                  </button>

                  <Link to="/admin/teacher" style={{ textDecoration: "none" }}>
                    <button type="submit" className={classes.btn}>
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailSendForm;
