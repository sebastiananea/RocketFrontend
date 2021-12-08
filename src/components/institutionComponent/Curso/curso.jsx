import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Curso() {
  var obj = {
    curso: "",
  };

  const institution = JSON.parse(localStorage.getItem("user")).name;
  const institutionReplace = institution.replace(/\s+/g, "%20");

  /* ///////////////ESTADOS/////////////// */

  const [curso, setCurso] = useState(obj);

  const [institucion, setIntitucion] = useState(institutionReplace);

  function handleChange(e) {
    const value = e.target.value;
    setCurso({
      curso: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const institucion = JSON.parse(localStorage.getItem("user")).name;
    console.log(
      `https://rocketprojectarg.netlify.app/signup/${institutionReplace}/${curso.curso}`
    );
  }

  /* ///////////////RENDER/////////////// */

  return (
    <div>
      <form>
        <h3>Crear curso</h3>

        <input
          type="text"
          placeholder="Nombre del curso"
          required
          name="curso"
          onChange={(e) => handleChange(e)}
        />
        <CopyToClipboard
          text={`https://rocketprojectarg.netlify.app/signup/${institutionReplace}/${curso.curso}`}
        >
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            {" "}
            Copiar{" "}
          </button>
        </CopyToClipboard>
      </form>
    </div>
  );
}

export default Curso;
