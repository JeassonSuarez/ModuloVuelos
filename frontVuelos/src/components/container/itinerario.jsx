import React from 'react'
import ReporteComp from '../pure/reporteComp'

const Itinerario = ({iti, numIti, aDestino}) => {
    
    console.log();

    return (
        <div className='div-itinerario'>
            <h3>ITINERARIO NUMERO {numIti+1}</h3>
            {
                iti && iti.map((rep,i)=>{
                    
                    return(
                        <ReporteComp key={i} item={rep} numItem={i}/>
                    )
                })
            }
        </div>
    )
}

export default Itinerario