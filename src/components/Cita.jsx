import React from 'react';
// Documentacion del componente
import PropTypes from 'prop-types';

const Cita = ({cita, eliminarCita}) => ( 
    <div className="cita">
        <p>Mascota: <span>{cita.mascota}</span> </p>
        <p>Dueño: <span>{cita.propietario}</span> </p>
        <p>Fecha: <span>{cita.fecha}</span> </p>
        <p>Hora: <span>{cita.hora}</span> </p>
        <p>Sintomas: <span>{cita.sintomas}</span> </p>
        {/* Boton para eliminar cita */}
        <button className="button eliminar u-full-width" onClick={ () => eliminarCita(cita.id) }>Eliminar &times;</button>
    </div>
);

// Definicion del componente "Cita", que props se le pasan
Cita.propTypes = {
    cita: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired
}
 
export default Cita;