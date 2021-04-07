import React, { Fragment, useRef } from 'react';
// Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  // State de referenccia para el Boton
  const inputFile = useRef(null);

  // Descarga del fichero
  //---------------------------------------------------------------
  const downloadData = () => {
    try {
      var downloadlink = document.getElementById("download");

      // Leemos el localstorage
      var datos = localStorage.getItem("citas");

      // Generamos el tipo de fichero (JSON)
      var file = new Blob([datos], { type: "application/json" });
      downloadlink.href = URL.createObjectURL(file);

      console.log("Descarga del fichero correcta.");
    } catch (error) {
      console.log("Error en la descarga del fichero");
      console.log(error);
    }
  };

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  // Descarga del fichero
  //---------------------------------------------------------------
  const onFileSelected = (file) => {
    var fileToUpload = file.target.files[0];

    // Validamos que sea un fichero valido
    if (typeof FileReader !== "undefined") {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        // Leeemos el contenido del fichero y lo extraemos
        let contenidoFichero = fileReader.result;

        // Guardamos en el localstorage los datos cargados del fichero
        localStorage.setItem("citas", contenidoFichero);
        window.location.reload();
      };
      fileReader.readAsText(fileToUpload);
    }
  };    
    return ( 
        <Fragment>
            <div className="header">
                <div className="header-left">
                    <img src="assets/img/logo.png" className="logo" alt="Logo" title="Logo" />
                    <h1>Gesti&oacute;n de Citas y Pacientes</h1>
                </div>
                <div className="header-right">
                    <a id="download" href="#!" onClick={() => downloadData()} download="citas.json" >
                    <FontAwesomeIcon icon="file-export" className="icono cursor" title="Exportar" />
                    </a>
                    <FontAwesomeIcon icon="file-upload" className="icono cursor" onClick={onButtonClick} title="Importar" />
                    <input hidden  onChange={onFileSelected} ref={inputFile} type="file" id="file" />  
                </div>
            </div>            
        </Fragment>
     );
}
 
export default Header;