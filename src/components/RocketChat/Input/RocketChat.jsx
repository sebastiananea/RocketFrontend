import React, { useState, useEffect } from "react";
import { myDatabaseChat } from "../../../config/utilsChatDatabase.js";
import { ref, push, child, update } from "firebase/database";
import firebase from "firebase/compat";
import s from "./Input.module.css";
import Swal from "sweetalert2";

function RocketChat({ name, img, table, id }) {
  const [emoji, setemoji] = useState(false);
  const [messages, setmessages] = useState({ txt: "" });
  const [file, setFile] = useState();
  const d = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!file && messages.txt.trim()==="")return;
    
    if (file) {
      const files = firebase.storage().ref(table).child(file.name);
      await files.put(file);
    }


    try {
      var rand = function () {
        return Math.random().toString(36).substr(2);
      };

      var token = function () {
        return rand() + rand();
      };

      const new_msg = file
        ? {
            userId: id,
            name: name,
            txt: messages.txt.trim(),
            day: `${d.getDay()}`,
            file: {
              name: file.name,
              type: file.type,
            },
            hour: `${d.getHours()}:${d.getMinutes()}`,
            img: img,
            id: token(),
          }
        : {
            userId: id,
            name: name,
            txt: messages.txt.trim(),
            day: `${d.getDay()}`,
            hour: `${d.getHours()}:${d.getMinutes()}`,
            img: img,
            id: token(),
          };

      //esta variable solo hace el espacio nuevo en el chat para luego insertar
      const newPostKey = push(child(ref(myDatabaseChat), `${table}}`)).key;

      const updates = {};
      updates[`${table}/` + newPostKey] = new_msg;

      update(ref(myDatabaseChat), updates);
    } catch (e) {
      console.log(e);
      Swal.fire("Chat on on maintenance");
    }
    setmessages({ txt: "" });
    setFile("")
  };
 

  const handleChange = (e) => {
    setmessages({ txt: e.target.value });
  };
  

  const emojiWorld = (e) => {
    e.preventDefault();
    if (emoji) {
      setemoji(false);
    } else {
      setemoji(true);
    }
  }

    const insertEmoji = (e) => {
        e.preventDefault();
        let prev_txt = messages.txt
        setmessages({ ...messages, txt: prev_txt + e.target.name })
        setemoji(false)
    }

    const readFile = (e) =>{
        e.preventDefault();
        setFile(e.target.files[0])
    }
    

    return (
        <div className={s.inputchat_container}>
            <form onSubmit={e => handleSubmit(e)}>
                <button className={s.inputchat_btn} name="emoji" onClick={(e) => emojiWorld(e)}>😃</button>
                <textarea spellcheck="false" className={s.inputchat_input} type="text" value={messages.txt} name="input" onChange={(e) => handleChange(e)}></textarea>
                <button className={s.inputchat_btn2} type="submit" >🚀</button>
                {emoji ?
                    <div className={s.inputchat_emojiscontainer}>
                        <h6><span className={s.inputchat_palabraemojis}>Emojis</span></h6>
                        <button className={s.inputchat_btnemoji} name="😀" onClick={(e) => insertEmoji(e)}>😀</button>
                        <button className={s.inputchat_btnemoji} name="😅" onClick={(e) => insertEmoji(e)}>😅</button>
                        <button className={s.inputchat_btnemoji} name="🙃" onClick={(e) => insertEmoji(e)}>🙃</button>
                        <button className={s.inputchat_btnemoji} name="😍" onClick={(e) => insertEmoji(e)}>😍</button>
                        <button className={s.inputchat_btnemoji} name="🤪" onClick={(e) => insertEmoji(e)}>🤪</button>
                        <button className={s.inputchat_btnemoji} name="🤒" onClick={(e) => insertEmoji(e)}>🤒</button>
                        <button className={s.inputchat_btnemoji} name="🙄" onClick={(e) => insertEmoji(e)}>🙄</button>
                        <button className={s.inputchat_btnemoji} name="🥱" onClick={(e) => insertEmoji(e)}>🥱</button>
                        <button className={s.inputchat_btnemoji} name="💯" onClick={(e) => insertEmoji(e)}>💯</button>
                        <button className={s.inputchat_btnemoji} name="🚀" onClick={(e) => insertEmoji(e)}>🚀</button>
                    </div>
                    :
                    null}
                    <input type="file" onChange={readFile}></input>
            </form>
        </div>
    )
}

export default RocketChat;
