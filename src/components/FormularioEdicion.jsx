import React, { Fragment, useState } from 'react';
// Documentacion de componentes
import PropTypes from 'prop-types';

const FormularioEdicion = ({citaAEditar, actualizarCita, cancelarCita}) => {

    // Crear State de Citas
    const [citaId, actualizarCampos] = useState({
        id: citaAEditar.id,
        mascota: citaAEditar.mascota,
        propietario: citaAEditar.propietario,
        fecha: citaAEditar.fecha,
        hora: citaAEditar.hora,
        sintomas: citaAEditar.sintomas
    });

    // Crear State de mensajes de error
    const [ error, actualizarError ] = useState(false)

    // Función que se ejecuta cada que el usuario escribe en un input
    //---------------------------------------------------------------
    const actualizarState = e => {
        actualizarCampos({
            ...citaId,
            [e.target.name]: e.target.value 
        })
    }

    // Extraer los valores del formulario
    const {mascota, propietario, fecha, hora, sintomas } = citaAEditar;

    // Cuando se envia el formulario
    //---------------------------------------------------------------
    const submitCita = () => {

        // Validar el formulario
        if(mascota.trim() === '' || propietario.trim() === ''  || fecha.trim() === ''  || hora.trim() === ''  || sintomas.trim() === '' ){
            actualizarError(true);
            return;
        }

        // Eliminar el mensaje previo 
        actualizarError(false);
        // Actualizamos la cita
        actualizarCita(citaId);

        // Reiniciar el form
        actualizarCampos({
            id: '',
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })

    }

    return ( 
        <Fragment>
            <h3>Modificar Cita</h3>
            {/* Mensaje de error de validacion del formulario */}
            { error 
                ? <p className="alerta-error">Todos los campos son obligatorios.</p>
                : null 
            }
            <div className="cita">
                {/* Formulario */}
                    {/* Nombre - Mascota */}
                    <label htmlFor="mascota">Nombre Mascota</label>
                    <input id="mascota" type="text" name="mascota" className="u-full-width" onChange={actualizarState} placeholder="Nombre Mascota" defaultValue={mascota} />
                    {/* Nombre - Dueño */}
                    <label htmlFor="dueno">Nombre Due&ntilde;o</label>
                    <input  id="dueno" type="text" name="propietario" className="u-full-width" onChange={actualizarState} placeholder="Nombre  Dueño de la mascota" defaultValue={propietario}/>
                    {/* Fecha */}
                    <label htmlFor="fecha">Fecha</label>
                    <input  id="fecha" type="date" name="fecha" className="u-full-width" onChange={actualizarState} defaultValue={fecha} />
                    {/* Hora */}
                    <label htmlFor="hora">Hora</label>
                    <input  id="hora" type="time" name="hora" className="u-full-width" onChange={actualizarState} defaultValue={hora} />
                    {/* Sintomas/Descripcion */}
                    <label htmlFor="sintomas">Síntomas</label>
                    <textarea  id="sintomas" className="u-full-width" name="sintomas" onChange={actualizarState} defaultValue={sintomas} ></textarea>
                <div className="row mx-auto">
                    <div className="col">
                        {/* Confirmar edicion cita */}
                        <button className="btn confirmar mt-1 btn-block" onClick={() => submitCita()}>Confirmar Cita</button>
                    </div>
                    <div className="col">
                        {/* Boton para cancelar edicion cita */}
                        <button id="btnCancelar" className="btn eliminar mt-1 btn-block" onClick={() => cancelarCita(false)}>Cancelar</button>  
                    </div>
                </div> 
            </div>
        </Fragment>
    );
}

// Definicion del componente "FormularioEdicion", que props se le pasan
FormularioEdicion.propTypes = {
    citaAEditar: PropTypes.object.isRequired,
    actualizarCita: PropTypes.func.isRequired,
    cancelarCita: PropTypes.func.isRequired
}
 
export default FormularioEdicion;