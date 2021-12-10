import React from "react";
import s from "./Message.module.css";

function Message({ currentId, img, txt, hour, day, id, file }) {

  if(id === currentId){
    return (
      <div className={ s.messageOwn }>
        <div className={ s.messageTop }>
  
          <p className={ s.messageText }>{
            file? 
            `${file.name}
            ${txt}`
            :txt
          }</p>
  
          <img className={ s.messageImg } src={img} alt="user icon" />

        </div>
          <p className={ s.messageBottom }>{`${day}  ${hour}`}</p>
      </div>
    );
  }else{
    return (
      <div className={ s.message }>
        <div className={ s.messageTop }>

        <img className={ s.messageImg } src={img} alt="user icon" />
  
        <p className={ s.messageText }>{txt}</p>
  
        </div>
          <p className={ s.messageBottom }>{`${day}  ${hour}`}</p>
      </div>
    );
  }

}
export default Message;
