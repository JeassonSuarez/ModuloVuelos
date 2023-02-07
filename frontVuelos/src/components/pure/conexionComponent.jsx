import React from 'react'

const ConexionComp = ({conexionItem, numItem}) => {
  return (
    <div className='segmentoCom'>
        <h3 className='h3con'>{numItem===0?`Conexion ${numItem}`:`Segmento ${numItem}`}</h3>
        <b>No.Vuelo: </b>
        <p>{conexionItem[0]}</p>
        <b>Aerolínea: </b>
        <p>{conexionItem[2]}</p>
        <b>Aeropuerto: </b>
        <p>{conexionItem[3]}</p>
        <b>Ciudad: </b>
        <p>{conexionItem[5]}</p>
        <b>{conexionItem[6]}: </b>
        <p>{conexionItem[7]}</p>
        <b>Pais: </b>
        <p>{conexionItem[8]}</p>
        <b>Fecha: </b>
        <p>{conexionItem[9]}</p>
        <b>Hora: </b>
        <p>{conexionItem[10]}</p>
        <b>Piloto:</b>
        <p>{conexionItem[11]}</p>
    </div>
  )
}

export default ConexionComp