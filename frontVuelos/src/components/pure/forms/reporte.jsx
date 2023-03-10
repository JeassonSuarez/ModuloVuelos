import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const Reporte = ({traerItinerarios}) => {


    const initialCredentials = { 
        aOrigen:'',
        fecha: '',
        hora:'',
        aDestino:''
    }
    
    const registroEsquema = Yup.object().shape(
    {
        aOrigen: Yup.string().required('Debe seleccionar un aeropuerto de origen'),
        fecha: Yup.string().required("Debe seleccionar una fecha de vuelo"),
        hora: Yup.string().required("Debe seleccionar una hora de vuelo"),
        aDestino: Yup.string().required("Debe seleccionar un aeropuerto de destino"),
    }
    );

    return (
        <div className='div-registro'>
            <h2 className='titleform'>Validar existencia de vuelo</h2>
            <Formik
            initialValues={ initialCredentials }
            validationSchema={ registroEsquema }
            onSubmit={async (values, { setSubmitting }) => {
                fetch('http://localhost:3000/buscadorVuelos', {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(values)
                })
                .then(response => response.json())
                .then(response => {
                    if(!response){
                        alert('No hay vuelos con este filtro')
                    }else{
                        fetch('http://localhost:3000/segmentosFiltroVuelos', {
                        method: "POST",
                        headers: {
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify([response, values.aDestino])
                        })
                        .then(response => response.json())
                        .then(response => {
                            console.log(response)
                            traerItinerarios(response, values.aDestino)
                        })
                    }
                })
                // console.log(values)
                await new Promise(r => setTimeout(r, 500));
                setSubmitting(false);
            }}
            >
            {({ values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur }) => (
                <Form className='form-filtro-asignacionCitas generador-rep'>
                    
                    <label htmlFor={`aOrigen`}>Aeropuerto de origen:</label>
                    <Field component="select" id={`aOrigen`} name={`aOrigen`} className='select'>
                        <option value="">Seleccione un aeropuerto</option>
                        <option value="YYZ">Lester B. Pearson International Airport </option>
                        <option value="YUL">Montreal / Pierre Elliott Trudeau International Airport</option>
                        <option value="YVR">Vancouver International Airport</option>
                        <option value="YYC">Calgary International Airport</option>
                        <option value="YEG">Edmonton International Airport</option>
                        <option value="YQB">Aeropuerto Internacional Jean-Lesage de Quebec</option>  
                        <option value="ATL">Aeropuerto Internacional Hartsfield-Jackson</option>
                        <option value="LAX">Aeropuerto Internacional de Los ??ngeles</option>
                        <option value="ORD">Aeropuerto Internacional OHare</option>  
                        <option value="DFW">Aeropuerto Internacional de Dallas-Fort Worth</option>  
                        <option value="DEN">Aeropuerto Internacional de Denver</option>
                        <option value="JFK">Aeropuerto Internacional John F. Kennedy</option>  
                        <option value="SFO">Aeropuerto Internacional de San Francisco</option>  
                        <option value="SEA">Aeropuerto Internacional de Seattle-Tacoma</option> 
                        <option value="LAS">Aeropuerto Internacional Harry Reid</option>
                        <option value="MCO">Aeropuerto Internacional de Orlando </option> 
                        <option value="EWR">Aeropuerto Internacional Libertad de Newark </option>
                        <option value="ACA">Aeropuerto Internacional de Acapulco </option>
                        <option value="PIE">Base A??rea No. 7 Le??n Gonz??lez Pie de la Cuesta </option>  
                        <option value="AGU">Aeropuerto Internacional de Aguascalientes </option>
                        <option value="XAL"> Aeropuerto Nacional de ??lamos</option>
                        <option value="AZG">Aeropuerto Nacional Pablo L. Sidar </option>
                        <option value="JJC">Aeropuerto Nacional Jorge Jim??nez Cant?? </option> 
                        <option value="CSL">Aer??dromo Internacional de Cabo San Lucas </option> 
                        <option value="CPE">Aeropuerto Internacional de Campeche </option>
                        <option value="CNA">Aeropuerto Nacional de Cananea </option>
                        <option value="CUN">Aeropuerto Internacional de Canc??n </option>
                        <option value="CYW">Aeropuerto Nacional Capit??n Rogelio Castillo </option>  
                        <option value="CTM">Internacional de Chetumal </option>
                        <option value="EZE">Ministro Pistarini International Airport </option>  
                        <option value="AEP">Jorge Newbery Airpark </option>
                        <option value="COR">Ingeniero Ambrosio Taravella Airport </option>  
                        <option value="ROS">Islas Malvinas Airport </option> 
                        <option value="MDZ">El Plumerillo Airport </option> 
                        <option value="SLA">Martin Miguel De Guemes International Airport </option>  
                        <option value="BCN">Barcelona International Airport </option>  
                        <option value="MAD">Adolfo Su??rez Madrid???Barajas Airport </option> 
                        <option value="AGP">M??laga Airport </option>  
                        <option value="PMI">Palma De Mallorca Airport </option>   
                        <option value="ALC">Alicante International Airport </option>   
                        <option value="VLC">Valencia Airport </option> 
                        <option value="SVQ">Sevilla Airport </option> 
                        <option value="AXM">Aeropuerto Internacional El Ed??n </option> 
                        <option value="BAQ">Aeropuerto Internacional Ernesto Cortissoz</option>
                        <option value="BOG">Aeropuerto Internacional El Dorado</option>
                        <option value="BGA">Aeropuerto Internacional Palonegro</option>
                        <option value="CLO">Aeropuerto Internacional Alfonso Bonilla Arag??n</option> 
                        <option value="CTG">Aeropuerto Internacional Rafael N????ez</option> 
                        <option value="CUC">Aeropuerto Internacional Camilo Daza</option> 
                        <option value="LET">Aeropuerto Internacional Alfredo V??squez Cobo</option> 
                        <option value="MDE">Aeropuerto Internacional Jos?? Mar??a C??rdova</option>  
                        <option value="PEI">Aeropuerto Internacional Mateca??a</option> 
                        <option value="RCH">Aeropuerto Internacional Almirante Padilla</option> 
                        <option value="ADZ">Aeropuerto Internacional Gustavo Rojas Pinilla</option>  
                        <option value="SMR">Aeropuerto Internacional Sim??n Bol??var</option>
                    </Field>
                    {/* levelTask errors */}
                    {
                        errors.aOrigen && touched.aOrigen &&
                        (
                            <ErrorMessage component='div' name='aOrigen' className='errorM' />
                        )
                    }

                    <label htmlFor='fecha'>Fecha de vuelo:</label>
                    <Field id='fecha' name='fecha' placeholder='#' type='date'/>
                    {/* description errors */}
                    {
                        errors.fecha && touched.fecha &&
                        (
                            <ErrorMessage component='div' name='fecha' className='errorM' />
                        )
                    }

                    <label htmlFor='hora'>Hora Vuelo:</label>
                    <Field id='hora' name='hora' placeholder='#' type='number' min='0' max='23'/>
                    {/* description errors */}
                    {
                        errors.hora && touched.hora &&
                        (
                            <ErrorMessage component='div' name='hora' className='errorM' />
                        )
                    }

                    <label htmlFor={`aDestino`}>Aeropuerto de destino:</label>
                    <Field component="select" id={`aDestino`} name={`aDestino`} className='select'>
                        <option value="">Seleccione un aeropuerto</option>
                        <option value="YYZ">Lester B. Pearson International Airport </option>
                        <option value="YUL">Montreal / Pierre Elliott Trudeau International Airport</option>
                        <option value="YVR">Vancouver International Airport</option>
                        <option value="YYC">Calgary International Airport</option>
                        <option value="YEG">Edmonton International Airport</option>
                        <option value="YQB">Aeropuerto Internacional Jean-Lesage de Quebec</option>  
                        <option value="ATL">Aeropuerto Internacional Hartsfield-Jackson</option>
                        <option value="LAX">Aeropuerto Internacional de Los ??ngeles</option>
                        <option value="ORD">Aeropuerto Internacional OHare</option>  
                        <option value="DFW">Aeropuerto Internacional de Dallas-Fort Worth</option>  
                        <option value="DEN">Aeropuerto Internacional de Denver</option>
                        <option value="JFK">Aeropuerto Internacional John F. Kennedy</option>  
                        <option value="SFO">Aeropuerto Internacional de San Francisco</option>  
                        <option value="SEA">Aeropuerto Internacional de Seattle-Tacoma</option> 
                        <option value="LAS">Aeropuerto Internacional Harry Reid</option>
                        <option value="MCO">Aeropuerto Internacional de Orlando </option> 
                        <option value="EWR">Aeropuerto Internacional Libertad de Newark </option>
                        <option value="ACA">Aeropuerto Internacional de Acapulco </option>
                        <option value="PIE">Base A??rea No. 7 Le??n Gonz??lez Pie de la Cuesta </option>  
                        <option value="AGU">Aeropuerto Internacional de Aguascalientes </option>
                        <option value="XAL"> Aeropuerto Nacional de ??lamos</option>
                        <option value="AZG">Aeropuerto Nacional Pablo L. Sidar </option>
                        <option value="JJC">Aeropuerto Nacional Jorge Jim??nez Cant?? </option> 
                        <option value="CSL">Aer??dromo Internacional de Cabo San Lucas </option> 
                        <option value="CPE">Aeropuerto Internacional de Campeche </option>
                        <option value="CNA">Aeropuerto Nacional de Cananea </option>
                        <option value="CUN">Aeropuerto Internacional de Canc??n </option>
                        <option value="CYW">Aeropuerto Nacional Capit??n Rogelio Castillo </option>  
                        <option value="CTM">Internacional de Chetumal </option>
                        <option value="EZE">Ministro Pistarini International Airport </option>  
                        <option value="AEP">Jorge Newbery Airpark </option>
                        <option value="COR">Ingeniero Ambrosio Taravella Airport </option>  
                        <option value="ROS">Islas Malvinas Airport </option> 
                        <option value="MDZ">El Plumerillo Airport </option> 
                        <option value="SLA">Martin Miguel De Guemes International Airport </option>  
                        <option value="BCN">Barcelona International Airport </option>  
                        <option value="MAD">Adolfo Su??rez Madrid???Barajas Airport </option> 
                        <option value="AGP">M??laga Airport </option>  
                        <option value="PMI">Palma De Mallorca Airport </option>   
                        <option value="ALC">Alicante International Airport </option>   
                        <option value="VLC">Valencia Airport </option> 
                        <option value="SVQ">Sevilla Airport </option> 
                        <option value="AXM">Aeropuerto Internacional El Ed??n </option> 
                        <option value="BAQ">Aeropuerto Internacional Ernesto Cortissoz</option>
                        <option value="BOG">Aeropuerto Internacional El Dorado</option>
                        <option value="BGA">Aeropuerto Internacional Palonegro</option>
                        <option value="CLO">Aeropuerto Internacional Alfonso Bonilla Arag??n</option> 
                        <option value="CTG">Aeropuerto Internacional Rafael N????ez</option> 
                        <option value="CUC">Aeropuerto Internacional Camilo Daza</option> 
                        <option value="LET">Aeropuerto Internacional Alfredo V??squez Cobo</option> 
                        <option value="MDE">Aeropuerto Internacional Jos?? Mar??a C??rdova</option>  
                        <option value="PEI">Aeropuerto Internacional Mateca??a</option> 
                        <option value="RCH">Aeropuerto Internacional Almirante Padilla</option> 
                        <option value="ADZ">Aeropuerto Internacional Gustavo Rojas Pinilla</option>  
                        <option value="SMR">Aeropuerto Internacional Sim??n Bol??var</option>
                    </Field>
                    {/* levelTask errors */}
                    {
                        errors.aDestino && touched.aDestino &&
                        (
                            <ErrorMessage component='div' name='aDestino' className='errorM' />
                        )
                    }

                    <button type='submit' style={{marginTop:'15px'}}>GENERAR REPORTE</button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Reporte