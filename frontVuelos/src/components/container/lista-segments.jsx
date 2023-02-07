import React, { useEffect, useState } from 'react'
import Segmento from '../../models/segmento.class'
import ConexionComp from '../pure/conexionComponent';
import Segmentoform from '../pure/forms/segmentoform';
import Segcon from '../pure/segcon';
import SegmentoComp from '../pure/segmentoDefault';

const ListaSegComp = ({segmentos, values, resp, conexionItems}) => {

    // console.log(resp);

    useEffect(() => {
        console.log(conexionItems);
    }, [conexionItems])
    
    const segmentoDefault = new Segmento(values.numVuelo, values.aerolinea, values.aeropuerto, resp[2], resp[1], resp[3], resp[0], values.fecha, `${values.hora}:00`, values.piloto);
    const [arregloSegmentosVuelo, setArregloSegmentosVuelo] = useState([segmentoDefault])

    const agregarSegmento = (s) => {
        const tempSeg = [...arregloSegmentosVuelo];
        tempSeg.push(s);
        setArregloSegmentosVuelo(tempSeg);
    };

    const clic = () => {
        fetch('http://localhost:3000/segmento', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(arregloSegmentosVuelo)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            response?alert('Se ha creado el vuelo y segmentos'):alert('No se ha podido crear el vuelo');
        })
    }

    return (
        <div className='lista-segmentos'>
            <h3>Lista de segmentos</h3>
            <SegmentoComp segmenItem={segmentoDefault} resp={resp}/>
            {
                segmentos.map((e,i)=>{
                return(
                    <Segmentoform key={i} keys={i} numSeg={i+1} valDefault={values} resp={resp} agregarSegmento={agregarSegmento}/>
                )
                })
            }
            <div className='divenviarseg'>
                <button onClick={clic}>INSERTAR SEGMENTOS</button>
            </div>
            {
                conexionItems && <Segcon ultimoSegmentoVuelo={arregloSegmentosVuelo[arregloSegmentosVuelo.length-1]}/>
                
            }    
            {
                conexionItems && conexionItems.map((e,i)=>{
                    return(
                        <ConexionComp key={i} conexionItem={e} numItem={i+1}/>
                    )
                })
            }
        </div>
    )
}

export default ListaSegComp