import React from "react";
import s from "./Verify.module.css";
function Verify() {
  return (
    <div className={s.main_container}>
      <div className={s.card}>
        <div className={s.header}>
          <h2>Please verify your email</h2>
        </div>
        <div className={s.description}>
          <p>You are almost there! We sent an email to you</p>
        </div>
        <div className={s.description}>
          <p>Just click in the link in that email to complete your signup</p>
          <p>If you don´t see it, you may need to check in your spam folder</p>
        </div>
        <div className={s.loading__spinner}>
          <span className={s.loading__rocket} role="rocket" aria-label="rocket">
            <h4>🚀</h4>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Verify;
