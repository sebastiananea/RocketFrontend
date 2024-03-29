import React, {useState, useEffect} from 'react'
import NavbarNoLog from './navbar/NavbarNoLog';
import Tarjeta from "./Tarjeta/Tarjeta.jsx"
import s from "./LandingNoLog.module.css"
import fotoGuille from "./picsNuestras/guille.jfif"; import fotoSeba from "./picsNuestras/seba.jfif"
import fotoLiam from "./picsNuestras/liam.jfif"; import fotoFran from "./picsNuestras/franco.jfif"
import fotoNacho from "./picsNuestras/igna.jfif"; import fotoNiko from "./picsNuestras/niko.jfif"
import fotoMike from "./picsNuestras/micael.jfif"; import fotoLauta from "./picsNuestras/lauta.jfif"
import fotoSatelite from "./picsNuestras/satelite.png";

    let integrantes = [ 
        {name: "Sebastian Anea", img:fotoSeba, github: "https://github.com/sebastiananea", linkedin: "https://www.linkedin.com/in/sebastiananea/"},
        {name: "Ignacio Aranda", img:fotoNacho, github: "https://github.com/elnacho02", linkedin: "https://www.linkedin.com/in/ignacio-aranda-webdeveloper/"},
        {name: "Cristian Castagnetto", img:fotoNiko, github: "https://github.com/cNikoc", linkedin: "https://www.linkedin.com/in/cristian-nicolas-castagnetto-full-stack-dev/"},
        {name: "Liam Marega", img:fotoLiam, github: "https://github.com/LiamMarega", linkedin: "https://www.linkedin.com/in/liam-marega/"},
        {name: "Micael Gómez", img:fotoMike, github: "https://github.com/micaelgomez", linkedin: "https://www.linkedin.com/in/micael-alessandro-gomez-fullstack/"},
        {name: "Guillermo Martos", img:fotoGuille, github: "https://github.com/GuillermoMartos", linkedin: "https://www.linkedin.com/in/guillermo-luis-martos-7a01b6156/"},
        {name: "Franco Varone", img:fotoFran, github: "https://github.com/VaroneFranco", linkedin: "https://www.linkedin.com/in/franco-varone/"},
        {name: "Lautaro Zárate", img:fotoLauta, github: "https://github.com/LauzarateARG", linkedin: "https://www.linkedin.com/in/lautaro-ariel-zarate-castro-a87a98216/"}  
    ]; 

function LandingNoLog() {
    const [scrollHeight, setScrollHeight] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollHeight(position);
      }
      
      useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
      }, [scrollHeight])

      const handlerhenry = (e)=>{
        window.open('https://www.soyhenry.com/', '_blank',)
      }


    return (
      <div className={s.mainContainer}>
        <NavbarNoLog isScrolling={scrollHeight} />
        <div className={s.firstContainer} id="first">
          <div className={s.text}>
            <h2>Rocket</h2>
            <p>
              Las RocketMeet son herramientas que se pueden usar como
              conferencias, informes y más. Tienen varias finalidades que las
              convierten en herramientas poderosas para enseñar.
            </p>
          </div>
          <div className={s.img}>
            <img
              src={require("../../media/1.jpeg").default}
              alt=""
              width="450px"
            />
          </div>
        </div>

        <div className={s.secondContainer} id="second">
          <div className={s.img}>
            <img
              src={require("../../media/4.jpeg").default}
              alt=""
              width="400px"
            />
          </div>
          <div className={s.text}>
            <p>
              Nuestra experiencia en Henry nos ha dado a entender que el trabajo
              en equipo facilita el cumplimiento de objetivos, incrementa la
              motivación y la creatividad, y favorece las habilidades sociales
              de cada uno. El trabajo en equipo es una capacidad altamente
              valorada en el mercado laboral, y es una de las características
              más demandadas por las empresas.
              <br />
              Por eso, desarollamos{" "}
              <strong style={{ color: "#fff" }}>Rocket</strong>, con el valor de
              la cooperacion como eje. El trabajo en equipo responde a una
              manera organizada y coordinada de trabajar entre varias personas
              con la finalidad de alcanzar metas comunes.
              <br />
              Nosotros somos la plataforma que permite que esto suceda.
              <br />
              <br />
              "El talento gana partidos, pero el trabajo en equipo y la
              inteligencia ganan campeonatos”.
              <br />
              -Michael Jordan
            </p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#FFF"
              fill-opacity="1"
              d="M0,128L18.5,117.3C36.9,107,74,85,111,112C147.7,139,185,213,222,213.3C258.5,213,295,139,332,122.7C369.2,107,406,149,443,160C480,171,517,149,554,138.7C590.8,128,628,128,665,154.7C701.5,181,738,235,775,229.3C812.3,224,849,160,886,149.3C923.1,139,960,181,997,170.7C1033.8,160,1071,96,1108,101.3C1144.6,107,1182,181,1218,224C1255.4,267,1292,277,1329,256C1366.2,235,1403,181,1422,154.7L1440,128L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className={s.thirdContainer} id="third">
          <div className={s.funcionamiento}>
            <input type="checkbox" className={s.checkbox} id="verPrecios" />
            <div className={s.text}>
              <h3>¿Cómo Empezar?</h3>
              <p>
                Contáctanos para recibir mas información, y... ¿por qué no?
                registrar tu institucion y comenzar a conectar a tus alumnos a
                través de la mejor plataforma para ello de todo el universo!
                <br />
                <br />
                Arg: +54 3815 957789
                <br />
                Cog: +23 5825 687989
              </p>
              <button><a href="mailto:rocket.app.mailing@gmail.com" target="_blank" rel="noreferrer">Contactanos</a></button>
            </div>
            <div className={s.img}>
              <img
                src="https://mazyv.com/wp-content/uploads/2020/02/1-1.png"
                alt=""
                width="100%"
              />
              <label for="verPrecios" className={s.boton}>
                <h4>ver tarifas→</h4>
              </label>
            </div>

            <div className={s.preciosPanel}>
              <div className={s.text}>
                <h2>TARIFAS</h2>
                <label for="verPrecios" className={s.boton1}>
                  <h4>←volver</h4>
                </label>
                <img
                  src="https://balddesign.com.ar/wp-content/uploads/2020/11/paypal.png"
                  alt=""
                  width="32%"
                />
              </div>
              <div className={s.priceContainer}>
                <h4 className={s.title}>Plan Mensual</h4>
                <p className={s.descripcion}>
                  <br />
                  Meses: <strong>1</strong>
                  <br />
                  Estudiantes: <strong>unlimited</strong>
                  <br />
                  Soporte Técnico: <strong>24/7</strong>
                </p>
                <h5 className={s.precio}>$2000 ARS</h5>
              </div>
              <div className={s.priceContainer}>
                <h4 className={s.title}>Plan Trimestral</h4>
                <p className={s.descripcion}>
                  <br />
                  Meses: <strong>3</strong>
                  <br />
                  Estudiantes: <strong>unlimited</strong>
                  <br />
                  Soporte Técnico: <strong>24/7</strong>
                </p>
                <h5 className={s.precio}>$4500 ARS</h5>
              </div>
              <div className={s.priceContainer}>
                <h4 className={s.title}>Plan Anual</h4>
                <p className={s.descripcion}>
                  <br />
                  Meses: <strong>12</strong>
                  <br />
                  Estudiantes: <strong>unlimited</strong>
                  <br />
                  Soporte Técnico: <strong>24/7</strong>
                </p>
                <h5 className={s.precio}>$12500 ARS</h5>
              </div>
            </div>
          </div>

          <div className={s.precios}></div>
        </div>

        <div className={s.fourthContainer}>
          <div className={s.text}>
            <h4>CONECTAMOS PERSONAS JUNTO A</h4>
            <img
              src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png"
              alt=""
            />
            <button onClick={handlerhenry}>APLICA</button>
          </div>
          <div className={s.img}>
            <img
              src="https://i.ibb.co/D7Qt6XJ/Whats-App-Image-2021-12-08-at-00-15-08-1.jpg"
              alt=""
              width="50%"
            />
          </div>
        </div>

        <div className={s.fifthContainer} id="team">
          <h1>QUIENES SOMOS</h1>

          <div className={s.imgSatelite}>
              <img id={s.Satelite} src={fotoSatelite} alt="satelite" />
          </div>

          <div className={s.integrantes_container}>
            {integrantes &&
              integrantes.map((int) => (
                <Tarjeta
                  name={int.name}
                  img={int.img}
                  linkedin={int.linkedin}
                  github={int.github}
                />
              ))}
          </div>
        </div>
      </div>
    );
}

export default LandingNoLog
