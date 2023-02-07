import React from 'react'

const ReporteComp = ({item, numItem}) => {
    console.log('mostrando un reporte',item);
    return (
        <div className='segmentoCom'>
            {/* <h3 className='h3con'>{numItem===0?`Conexion ${numItem}`:`Segmento ${numItem}`}</h3> */}
            <b>No.Vuelo: </b>
            <p>{item[0]}</p>
            <b>Aerolínea: </b>
            <p>{item[2]}</p>
            <b>Aeropuerto: </b>
            <p>{item[3]}</p>
            <b>Ciudad: </b>
            <p>{item[5]}</p>
            <b>{item[6]}: </b>
            <p>{item[7]}</p>
            <b>Pais: </b>
            <p>{item[8]}</p>
            <b>Fecha: </b>
            <p>{item[9]}</p>
            <b>Hora: </b>
            <p>{item[10]}</p>
            <b>Piloto:</b>
            <p>{item[11]}</p>
        </div>
    )
}

export default ReporteComp