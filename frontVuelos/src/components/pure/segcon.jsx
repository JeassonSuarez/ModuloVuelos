import React from 'react'

const Segcon = ({ultimoSegmentoVuelo}) => {
    return (
    <div className='segmentoCom'>
        <b>Vuelo: </b>
        <p>{ultimoSegmentoVuelo.vuelo}</p>
        <b>Aerolínea: </b>
        <p>{ultimoSegmentoVuelo.aerolinea}</p>
        <b>Aeropuerto: </b>
        <p>{ultimoSegmentoVuelo.aeropuerto}</p>
        <b>Ciudad: </b>
        <p>{ultimoSegmentoVuelo.ciudad}</p>
        <b>{ultimoSegmentoVuelo.nombreDiv}: </b>
        <p>{ultimoSegmentoVuelo.division}</p>
        <b>Pais: </b>
        <p>{ultimoSegmentoVuelo.pais}</p>
        <b>Fecha: </b>
        <p>{ultimoSegmentoVuelo.fecha}</p>
        <b>Hora: </b>
        <p>{ultimoSegmentoVuelo.hora}</p>
        <b>Piloto:</b>
        <p>{ultimoSegmentoVuelo.piloto}</p>
    </div>
    )
}

export default Segcon