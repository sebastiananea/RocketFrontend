import React from "react";
import s from "./Message.module.css";

function Message({ name, img, txt }) {
  let own = false;

  return (
    <div className={own ? s.messageOwn : s.message}>
      <div className={s.messageTop}>
        
        <p className={s.messageText}>{txt}</p>

        <img className={s.messageImg} src={img} alt="user icon" />

      </div>
    </div>
  );
}
export default Message;
