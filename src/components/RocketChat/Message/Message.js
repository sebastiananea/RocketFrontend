import React, { useState, useEffect } from "react";
import s from "./Message.module.css";
import firebase from "firebase/compat";
import { IoMdDownload } from "react-icons/io"

function  Message({ currentId, img, txt, hour, day, id, file, table }) {
  const [url, setUrl] = useState();

  const getUrl = async ()=>{
    const files = firebase.storage().ref(table).child(file.name);
    const archivoUrl = await files.getDownloadURL();
    setUrl(archivoUrl)
  }

  const handlerClick = ()=>{
    var w = window.open('about:blank', '_blank',);
    w.location.href = encodeURI(url);
  }

  useEffect(() => {
    if(file){
      getUrl()
    }
  }, [])

  if (id === currentId) {
    return (
      <div className={s.messageOwn}>
        <div className={s.messageTop}>
          <p className={s.messageText}>
            { file && file.type.split("/")[0] === "image"
              ? <div>
                <img onClick={handlerClick} className={s.fileImage} src={url} alt={file.name} />
                <p>{txt}</p>
              </div>
              : file? <button onClick={handlerClick}> {file.name} <IoMdDownload /> </button>
              :`${txt}`}
          </p>

          <img className={s.messageImg} src={img} alt="user icon" />
        </div>
        <p className={s.messageBottom}>{`${day}  ${hour}`}</p>
      </div>
    );
  } else {
    return (
      <div className={s.message}>
        <div className={s.messageTop}>

        <p className={s.messageText}>

            { file && file.type.split("/")[0] === "image"
              ? <div>
                <img onClick={handlerClick} className={s.fileImage} src={url} alt={file.name} />
                <p>{txt}</p>
              </div>
              : file? <button onClick={handlerClick}> {file.name} <IoMdDownload /> </button>
              :`${txt}`}
          </p>

          <img className={s.messageImg} src={img} alt="user icon" />
        </div>
        <p className={s.messageBottom}>{`${day}  ${hour}`}</p>
      </div>
    );
  }
}
export default Message;
