import React from 'react'

const SegmentoComp = ({segmenItem, resp}) => {
  return (
    <div className='segmentoCom'>
        <b>Vuelo: </b>
        <p>{segmenItem.vuelo}</p>
        <b>Aerolínea: </b>
        <p>{resp[5]}</p>
        <b>Aeropuerto: </b>
        <p>{resp[4]}</p>
        <b>Ciudad: </b>
        <p>{segmenItem.ciudad}</p>
        <b>{segmenItem.nombreDiv}: </b>
        <p>{segmenItem.division}</p>
        <b>Pais: </b>
        <p>{segmenItem.pais}</p>
        <b>Fecha: </b>
        <p>{segmenItem.fecha}</p>
        <b>Hora: </b>
        <p>{segmenItem.hora}</p>
        <b>Piloto:</b>
        <p>{segmenItem.piloto}</p>
    </div>
  )
}

export default SegmentoComp