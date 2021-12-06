import React from "react";
import s from "./Message.module.css";

function Message({ currentId, img, txt, id }) {

  if(id === currentId){
    return (
      <div className={ s.messageOwn }>
        <div className={ s.messageTop }>
  
          <p className={ s.messageText }>{txt}</p>
  
          <img className={ s.messageImg } src={img} alt="user icon" />
  
        </div>
      </div>
    );
  }else{
    return (
      <div className={ s.message }>
        <div className={ s.messageTop }>
  
          <p className={ s.messageText }>{txt}</p>
  
          <img className={ s.messageImg } src={img} alt="user icon" />
  
        </div>
      </div>
    );
  }

}
export default Message;
