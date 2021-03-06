import React, { Fragment, useState } from 'react';
// Libreria - Generar Id unico
import uuid from 'uuid/v4';
// Documentacion de componentes
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    // Crear State de mensajes de error
    const [ error, actualizarError ] = useState(false)

    // Función que se ejecuta cada que el usuario escribe en un input
    //---------------------------------------------------------------
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value 
        })
    }

    // Extraer los valores del formulario
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // Cuando se envia el formulario
    //---------------------------------------------------------------
    const submitCita = e => {
        e.preventDefault();

        // Validar el formulario
        if(mascota.trim() === '' || propietario.trim() === ''  || fecha.trim() === ''  || hora.trim() === ''  || sintomas.trim() === '' ){
            actualizarError(true);
            return;
        }
        // Eliminar el mensaje previo 
        actualizarError(false);

        // Asignar un ID
        cita.id = uuid();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h3>Crear Cita</h3>
            {/* Mensaje de error de validacion del formulario */}
            { error 
                ? <p className="alerta-error">Todos los campos son obligatorios.</p>
                : null 
            }
            {/* Formulario */}
            <form onSubmit={submitCita} className="cita">
                {/* Nombre - Mascota */}
                <label htmlFor="mascota">Nombre Mascota</label>
                <input id="mascota" type="text" name="mascota" className="u-full-width" placeholder="Nombre Mascota" onChange={actualizarState} value={mascota}/>
                {/* Nombre - Dueño */}
                <label htmlFor="dueno">Nombre Due&ntilde;o</label>
                <input  id="dueno" type="text" name="propietario" className="u-full-width" placeholder="Nombre  Dueño de la mascota" onChange={actualizarState} value={propietario}/>
                {/* Fecha */}
                <label htmlFor="fecha">Fecha</label>
                <input  id="fecha" type="date" name="fecha" className="u-full-width" onChange={actualizarState} value={fecha} />
                {/* Hora */}
                <label htmlFor="hora">Hora</label>
                <input  id="hora" type="time" name="hora" className="u-full-width" onChange={actualizarState} value={hora} />
                {/* Sintomas/Descripcion */}
                <label htmlFor="sintomas">Síntomas</label>
                <textarea  id="sintomas" className="u-full-width" name="sintomas" onChange={actualizarState} value={sintomas} ></textarea>
                {/* Agregar cita */}
                <button type="submit" className="btn agregar mt-2 btn-block" >Agregar Cita</button>
            </form>
        </Fragment>
    );
}

// Definicion del componente "Formulario", que props se le pasan
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;