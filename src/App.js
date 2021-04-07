import React, { Fragment, useState, useEffect } from 'react';
// Componentes
import Formulario from './components/Formulario';
import FormularioEdicion from './components/FormularioEdicion';
import Cita from './components/Cita';
import Footer from './components/Footer';
import Titulo from './components/Titulo';
import Header from './components/Header';
// Iconos
require('./plugins/fontawesome');

function App() {

  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  // State para modificar citas
  const [isEdit, setEdicion] = useState(false);

  // Array de citas
  const [citas, guardarCitas] = useState(citasIniciales);
  const [citaAEditar, modificarCita] = useState({});

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
      let citasIniciales = JSON.parse(localStorage.getItem('citas'));

      if(citasIniciales) {
        localStorage.setItem('citas', JSON.stringify(citas))
      } else {
        localStorage.setItem('citas', JSON.stringify([]));
      }
  }, [citas] );

  // Función que tome las citas actuales y añada la nueva
  //---------------------------------------------------------------
  const crearCita = cita => {
    guardarCitas([ 
      ...citas,
      cita 
    ]);
  }

  // Función que actualiza la cita seleccionada
  //---------------------------------------------------------------
  const actualizarCita = citaEditada => {
    const nuevasCitas = JSON.parse(localStorage.getItem('citas'));
    
    for (let index = 0; index < citas.length; index++) {
      if(citaEditada.id === citas[index].id){
        nuevasCitas[index] = citaEditada;
      }
    }
    guardarCitas(nuevasCitas);
    setEdicion(false);
  }

  // Función que edita una cita por su id
  //---------------------------------------------------------------
  const editarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id === id );
    setEdicion(true);
    modificarCita(nuevasCitas[0]);
 }

  // Función que elimina una cita por su id
  //---------------------------------------------------------------
  const eliminarCita = id => {
     const nuevasCitas = citas.filter(cita => cita.id !== id );
     guardarCitas(nuevasCitas);
  }

  // Función que elimina una cita por su id
  //---------------------------------------------------------------
  const cancelarCita = (cancelarCita) => {
    setEdicion(cancelarCita);
 }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            {isEdit 
              ? <FormularioEdicion citaAEditar={citaAEditar} actualizarCita={actualizarCita} cancelarCita={cancelarCita} />
              : <Formulario crearCita={crearCita} />
            }
          </div>
          <div className="col-sm-6">
              <Titulo titulo={titulo} />  
              {citas.map(cita => (
                <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} editarCita={editarCita} />
                ))
              }
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
