import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import s from './Tarjeta.module.css'

function Tarjeta({name, img, github, linkedin}) {
    return (
        <div className={s.tarjeta_container}>
            <h4 className={s.tarjeta_name}>{name}</h4>
            <img src={img ? img : "https://static.vecteezy.com/system/resources/thumbnails/003/759/905/small_2x/man-avatar-cartoon-character-portrait-free-vector.jpg"} className={s.tarjeta_img}/>
            <h5><a className={s.tarjeta_github} href={github} target="_blank"><BsGithub/> GitHub</a></h5>
            <h5><a className={s.tarjeta_linkedin} href={linkedin} target="_blank"><BsLinkedin/> LinkedIn</a></h5>
        </div>
    );
};

export default Tarjeta