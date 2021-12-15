// import "./RocketMessages.css"
import React, { useState, useEffect } from "react";
import { myDatabaseChat } from "../../../config/utilsChatDatabase.js";
import { ref, onValue, child } from "firebase/database";

import s from "./ChatContain.module.css";
import RocketChat from "../Input/RocketChat";
import Message from "../Message/Message.js";

function ChatContain({ params, table }) {
  const [messagesChat, setmessagesChat] = useState("");
  let chatRef = ref(myDatabaseChat);
  let mesaChat = table;
  chatRef = child(chatRef, mesaChat);
  const day = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"];

  useEffect(() => {
    onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        setmessagesChat(Object.values(snapshot.val()));
      } else console.log("no hay chat aun");
    });

    let c = new Date();
    console.log(`${c.getHours()}:${c.getMinutes()}`);
  }, []);

  let hora = "14:3"
  

  const formatoHora = hour => {

    hora = hour.toString().split("");

    let horaBien = [];

    if (hora.length === 4) horaBien = [hora[0],hora[1],hora[2],0,hora[3]]
    else horaBien = hora

    horaBien = horaBien.join("");
    return horaBien
  }

  return (
    <div className={s.chatBox}>
      <div className={s.chatBoxWrapper}>
        <div className={s.chatBoxTop}>
          {messagesChat.length
            ? messagesChat.map((m) => {
                return (
                  <Message
                    currentId={params._id}
                    table={table}
                    name={m.name}
                    img={m.img}
                    txt={m.txt} 
                    hour={formatoHora(m.hour)}
                    day={day[m.day]}
                    id={m.userId}
                    file={m?.file}
                  />
                );
              })
            : null}
        </div>

        <div className={s.bottom}>
          <RocketChat
            img={params.img}
            name={params.name}
            table={table}
            id={params._id}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatContain;
