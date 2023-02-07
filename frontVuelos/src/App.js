import './App.css';
import ListaSegComp from './components/container/lista-segments';
import { Conexion } from './components/pure/forms/conexion';
import Reporte from './components/pure/forms/reporte';
import { Vuelo } from './components/pure/forms/vuelo';
import { useState } from 'react'
import Itinerario from './components/container/itinerario';

function App() {

  const [Segmentos, setSegmentos] = useState([]);
  const [values, setValues] = useState(null)
  const [creado, setCreado] = useState(false)
  const [res, setRes] = useState();
  const [itinerarios, setItinerarios] = useState([])
  const [aDestino, setaDestino] = useState();

  const traerNumSegmentos = (arrSegmentosComp, values, creadoVal, resp) => {
      setSegmentos(arrSegmentosComp);
      setValues(values);
      setCreado(creadoVal);
      // console.log(resp);
      setRes(resp);
  }

  const traerItinerarios = (itineririos, aDestino) => {
    setItinerarios(itineririos);
    setaDestino(aDestino)
    console.log(itineririos);
  }

  const [conexionItems, setConexionItems] = useState();

  const traerConexion = (itemsC)=>{
    setConexionItems(itemsC);
    console.log('ITEMS CONEXION', itemsC);
  }

  return (
    <div className="App">
      <h1>MÓDULO AEROLINEA</h1>
      <div className='containerForms'>
      {/* MODULO DE CREACION DE VUELO */}
        <Vuelo genSegs = {traerNumSegmentos}/>
        {/* CREA LA LISTA DE SEGMENTOS PARA LLENARLOS */}
        {/* {
          creado && <ListaSegComp segmentos={Segmentos} values={values} resp={res} conexionItems={conexionItems}/>
        } */}
        {/* CREA FORM PARA CREAR CONEXION */}
        <Conexion vueloPrev={values} enviarConexion={traerConexion}/>
        {/* CREA FORMULARIO PARA GENERAR ITINERARIOS */}
        <Reporte traerItinerarios={traerItinerarios}/>
        {/* CREA LOS ITINERARIOS SI EXISTEN */}
        {
          itinerarios.length!==0 && itinerarios.map((it, i)=>{
            console.log('generando itinerario', i)
            return(
              <Itinerario key={i} iti={it} numIti={i} aDestino={aDestino}/>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
