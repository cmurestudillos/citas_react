import React from 'react';
// Documentacion del componente
import PropTypes from 'prop-types';
// Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cita = ({cita, eliminarCita, editarCita}) => {

    // Función que se ejecuta cuando presionamos el boton editar
    //---------------------------------------------------------------
    const btnEditar = id => {
        editarCita(id)
    }

  return ( 
    <div className="cita">
        <p>Mascota: <span>{cita.mascota}</span> </p>
        <p>Dueño: <span>{cita.propietario}</span> </p>
        <p>Fecha: <span>{cita.fecha}</span> </p>
        <p>Hora: <span>{cita.hora}</span> </p>
        <p>Sintomas: <span>{cita.sintomas}</span> </p>
        <div className="row mx-auto">
            <div className="col">
                {/* Boton para editar cita */}
                <button className="btn editar mt-1 btn-block" onClick={ () => btnEditar(cita.id) }>Editar <FontAwesomeIcon icon="edit" title="Editar" /></button>
            </div>
            <div className="col">
                {/* Boton para eliminar cita */}
                <button className="btn eliminar mt-1 btn-block" onClick={ () => eliminarCita(cita.id)}>Eliminar <FontAwesomeIcon icon="trash" title="Eliminar" /></button>
            </div>
        </div>
    </div>
    );
}

// Definicion del componente "Cita", que props se le pasan
Cita.propTypes = {
    cita: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired,
    editarCita: PropTypes.func.isRequired
}
 
export default Cita;