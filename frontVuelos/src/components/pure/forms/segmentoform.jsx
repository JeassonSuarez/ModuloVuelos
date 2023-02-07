import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import Segmento from '../../../models/segmento.class';


export const Segmentoform = ({keys ,numSeg, valDefault, resp, agregarSegmento}) => {

    const [aeropuertoValue, setaeropuertoValue] = useState('');
    const [respuesta, setRespuesta] = useState()

    // const handleclic = (e)=>{
    //     ocultBtn && parseInt(e.target.classList.value)===keys ? e.target.hidden=true : console.log('no');
    // }

    const handChang=(e)=>{
        // console.log(respuesta);
        console.log(e.target.value);
        setaeropuertoValue(e.target.value);
        fetch('http://localhost:3000/seg', {
        // mode: 'no-cors',
        // method: "POST",
        // headers: {
        //     "Content-Type":"application/json"
        // },
        // body:JSON.stringify
            // mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"aeropuertoVal":`${e.target.value}`})
        })
        .then(response => response.json())
        .then(response => {
        // console.log(response[0]);
        setRespuesta(response[0])
        })
        // console.log(e.target.value);
    }

    const initialCredentials = { 
    aerolinea: valDefault.aerolinea,
    numVuelo:valDefault.numVuelo,
    aeropuerto:'',
    ciudad:'',
    divisionName:'',
    pais:'',
    piloto:'',
    fecha:'',
    hora:'',
    divisionNamePrincipal:''
    }

    let registroEsquema = Yup.object().shape({
    aerolinea: Yup.string().oneOf(['W3', 'V7', 'VY', 'EB', 'AC', 'WS', 'TS', '7F', '5T', 'YC', 'PD', 'AM', '4O', 'Y4', 'VB', 'VW', 'YQ', 'AV', '5Z', 'P5', 'VE', 'AA', 'XP', 'MX', 'DL', 'AR', 'AU', '4M']).required("Debe seleccionar una aerolinea"),
    numVuelo: Yup.string().required("Debe ingresar su numero de vuelo"),
    piloto: Yup.string().oneOf(['Fernando','Laura','Samara','Brenda','Santiago','Diego','Juana','Messi','Juanito','Juanita','Sandra','Felipe','Lautaro','Sharin','Joshep', 'Josefina','Jacinto','Sonia','Oracio','Miguel','Esteban','Hernesto','Anuel','Brayan','CR7','Neymar','Morgan','Tobi']),
    aeropuerto: Yup.string().oneOf(['YYZ', 'YUL', 'YVR', 'YYC', 'YEG', 'YQB', 'ATL', 'LAX', 'ORD', 'DFW', 'DEN', 'JFK', 'SFO', 'SEA', 'LAS', 'MCO', 'EWR', 'ACA', 'PIE', 'AGU', 'XAL', 'AZG', 'JJC', 'CSL', 'CPE', 'CNA', 'CUN', 'CYW', 'CTM', 'EZE', 'AEP', 'COR', 'ROS', 'MDZ', 'SLA', 'BCN', 'MAD', 'AGP', 'PMI', 'ALC', 'VLC', 'SVQ', 'AXM', 'BAQ', 'BOG', 'BGA', 'CLO', 'CTG', 'CUC', 'LET', 'MDE', 'PEI', 'RCH', 'ADZ', 'SMR']),
    ciudad: Yup.string(),
    divisionName: Yup.string(),
    pais: Yup.string(),
    fecha: Yup.string().required('Debe seleccionar una fecha'),
    hora: Yup.string().required('Seleccione una hora de vuelo') 
    });

    // const clic = (e) => {
    //     e.target.style.backgroundColor = "green";
    //     e.target.style.color = "white";
    //     e.target.textContent='👍👍👍';
    //     e.target.style.fontSize='22px';
    //     e.target.disabled=true;
    //     e.target.style.borderColor = "grey";

    // }

    return(
        <div className='div-registro'>
            <h2 className='titleform'>segmento {numSeg}</h2>
            <Formik
                initialValues={ initialCredentials }
                validationSchema={ registroEsquema }
                onSubmit={async (values, { setSubmitting }) => {
                    
                    values.aeropuerto=aeropuertoValue;
                    values.ciudad=respuesta[2];
                    values.divisionName=respuesta[1];
                    values.pais=respuesta[0];
                    values.divisionNamePrincipal=respuesta[3];
                    let s=new Segmento(values.numVuelo, values.aerolinea, values.aeropuerto, values.ciudad, values.divisionName, values.divisionNamePrincipal, values.pais, values.fecha, values.hora, values.piloto);
                    agregarSegmento(s);
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
                <Form className='form-filtro-asignacionCitas'>
                    
                    <label htmlFor='numVuelo'>No.Vuelo:</label>
                    <Field id='numVuelo' name='numVuelo' placeholder='#' type='number' disabled/>
                    {/* description errors */}
                    {
                        errors.numVuelo && touched.numVuelo &&
                        (
                            <ErrorMessage component='div' name='numVuelo' className='errorM' />
                        )
                    }

                    <label htmlFor="aerolinea">Aerolinea:</label>
                    <Field component="select" id="aerolinea" name="aerolinea" className='select' disabled>
                    <option value="">Seleccione una aerolinea</option>
                    <option value="W3">Swiftair</option>
                    <option value="V7">Volotea</option>
                    <option value="VY">Vueling</option>
                    <option value="EB">Wamos Air</option>
                    <option value="AC">Air Canada</option>
                    <option value="WS">WestJet</option>
                    <option value="TS">Air Transat</option>
                    <option value="7F">First Air</option>
                    <option value="5T">Canadian North</option>
                    <option value="YC">Ciel Canadien</option>
                    <option value="PD">Porter Airlines </option>
                    <option value="AM">Aeroméxico</option>
                    <option value="4O">Interjet</option>
                    <option value="Y4">Volaris</option>
                    <option value="VB">Viva Aerobus</option>
                    <option value="VW">Aeromar</option>
                    <option value="YQ">TAR</option>
                    <option value="AV">Avianca</option>
                    <option value="5Z">Viva Air Colombia </option>
                    <option value="P5">Wingo</option>
                    <option value="VE">EasyFly</option>
                    <option value="AA">American Airlines</option>
                    <option value="XP">Avelo Airlines</option>
                    <option value="MX">Breeze Airways</option>
                    <option value="DL">Delta Air Lines</option>
                    <option value="AR">Aerolineas Argentinas</option>
                    <option value="AU">Austral</option>
                    <option value="4M">LATAM Airlines Argentina </option>
                    </Field>
                    {/* levelTask errors */}
                    {
                        errors.aerolinea && touched.aerolinea &&
                        (
                            <ErrorMessage component='div' name='aerolinea' className='errorM' />
                        )
                    }

                    
                    <label htmlFor={`aeropuerto`}>Aeropuerto:</label>
                    <Field component="select" id={`aeropuerto`} name={`aeropuerto`} className='select' onChange={handChang} value={aeropuertoValue}>
                    <option value="">Seleccione un aeropuerto</option>
                    <option value="YYZ">Lester B. Pearson International Airport </option>
                    <option value="YUL">Montreal / Pierre Elliott Trudeau International Airport</option>
                    <option value="YVR">Vancouver International Airport</option>
                    <option value="YYC">Calgary International Airport</option>
                    <option value="YEG">Edmonton International Airport</option>
                    <option value="YQB">Aeropuerto Internacional Jean-Lesage de Quebec</option>  
                    <option value="ATL">Aeropuerto Internacional Hartsfield-Jackson</option>
                    <option value="LAX">Aeropuerto Internacional de Los Ángeles</option>
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
                    <option value="PIE">Base Aérea No. 7 León González Pie de la Cuesta </option>  
                    <option value="AGU">Aeropuerto Internacional de Aguascalientes </option>
                    <option value="XAL"> Aeropuerto Nacional de Álamos</option>
                    <option value="AZG">Aeropuerto Nacional Pablo L. Sidar </option>
                    <option value="JJC">Aeropuerto Nacional Jorge Jiménez Cantú </option> 
                    <option value="CSL">Aeródromo Internacional de Cabo San Lucas </option> 
                    <option value="CPE">Aeropuerto Internacional de Campeche </option>
                    <option value="CNA">Aeropuerto Nacional de Cananea </option>
                    <option value="CUN">Aeropuerto Internacional de Cancún </option>
                    <option value="CYW">Aeropuerto Nacional Capitán Rogelio Castillo </option>  
                    <option value="CTM">Internacional de Chetumal </option>
                    <option value="EZE">Ministro Pistarini International Airport </option>  
                    <option value="AEP">Jorge Newbery Airpark </option>
                    <option value="COR">Ingeniero Ambrosio Taravella Airport </option>  
                    <option value="ROS">Islas Malvinas Airport </option> 
                    <option value="MDZ">El Plumerillo Airport </option> 
                    <option value="SLA">Martin Miguel De Guemes International Airport </option>  
                    <option value="BCN">Barcelona International Airport </option>  
                    <option value="MAD">Adolfo Suárez Madrid–Barajas Airport </option> 
                    <option value="AGP">Málaga Airport </option>  
                    <option value="PMI">Palma De Mallorca Airport </option>   
                    <option value="ALC">Alicante International Airport </option>   
                    <option value="VLC">Valencia Airport </option> 
                    <option value="SVQ">Sevilla Airport </option> 
                    <option value="AXM">Aeropuerto Internacional El Edén </option> 
                    <option value="BAQ">Aeropuerto Internacional Ernesto Cortissoz</option>
                    <option value="BOG">Aeropuerto Internacional El Dorado</option>
                    <option value="BGA">Aeropuerto Internacional Palonegro</option>
                    <option value="CLO">Aeropuerto Internacional Alfonso Bonilla Aragón</option> 
                    <option value="CTG">Aeropuerto Internacional Rafael Núñez</option> 
                    <option value="CUC">Aeropuerto Internacional Camilo Daza</option> 
                    <option value="LET">Aeropuerto Internacional Alfredo Vásquez Cobo</option> 
                    <option value="MDE">Aeropuerto Internacional José María Córdova</option>  
                    <option value="PEI">Aeropuerto Internacional Matecaña</option> 
                    <option value="RCH">Aeropuerto Internacional Almirante Padilla</option> 
                    <option value="ADZ">Aeropuerto Internacional Gustavo Rojas Pinilla</option>  
                    <option value="SMR">Aeropuerto Internacional Simón Bolívar</option>
                    </Field>
                    {
                        errors.aeropuerto && touched.aeropuerto &&
                        (
                            <ErrorMessage component='div' name='aeropuerto' className='errorM' />
                        )
                    }

                    <label htmlFor='ciudad'>Ciudad:</label>
                    <Field id='ciudad' name='ciudad' placeholder='#' type='text' value={respuesta!==undefined ? respuesta[2] : '' } disabled/>
                    {/* description errors */}
                    {
                        errors.ciudad && touched.ciudad &&
                        (
                            <ErrorMessage component='div' name='ciudad' className='errorM' />
                        )
                    }

                    <label htmlFor='divisionName'>{respuesta!==undefined ? respuesta[3] : 'division' }:</label>
                    <Field id='divisionName' name='divisionName' placeholder='#' type='text' value={respuesta!==undefined ? respuesta[1] : '' } disabled/>
                    {/* description errors */}
                    {
                        errors.divisionName && touched.divisionName &&
                        (
                            <ErrorMessage component='div' name='divisionName' className='errorM' />
                        )
                    }

                    <label htmlFor='pais'>Pais:</label>
                    <Field id='pais' name='pais' placeholder='#' type='text' value={respuesta!==undefined ? respuesta[0] : '' } disabled/>
                    {/* description errors */}
                    {
                        errors.pais && touched.pais &&
                        (
                            <ErrorMessage component='div' name='pais' className='errorM' />
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

                    <label htmlFor="piloto">Piloto:</label>
                    <Field component="select" id="piloto" name="piloto" className='select'>
                    <option value="">Seleccione un piloto</option>
                    <option value="Fernando">Fernando</option>
                    <option value="Laura">Laura</option>
                    <option value="Samara">Samara</option>
                    <option value="Brenda">Brenda</option>
                    <option value="Santiago">Santiago</option>
                    <option value="Diego">Diego</option>
                    <option value="Juana">Juana</option>
                    <option value="Messi">Messi</option>
                    <option value="Juanito">Juanito</option>
                    <option value="Juanita">Juanita</option>
                    <option value="Sandra">Sandra</option>
                    <option value="Felipe">Felipe</option>
                    <option value="Lautaro">Lautaro</option>
                    <option value="Sharin">Sharin</option>
                    <option value="Joshep">Joshep</option>
                    <option value="Josefina">Josefina</option>
                    <option value="Jacinto">Jacinto</option>
                    <option value="Sonia">Sonia</option>
                    <option value="Oracio">Oracio</option>
                    <option value="Miguel">Miguel</option>
                    <option value="Esteban">Esteban</option>
                    <option value="Hernesto">Hernesto</option>
                    <option value="Anuel">Anuel</option>
                    <option value="Brayan">Brayan</option>
                    <option value="CR7">CR7</option>
                    <option value="Neymar">Neymar</option>
                    <option value="Morgan">Morgan</option>
                    <option value="Tobi">Tobi</option>
                    </Field>
                    {/* levelTask errors */}
                    {
                        errors.piloto && touched.piloto &&
                        (
                            <ErrorMessage component='div' name='piloto' className='errorM' />
                        )
                    }
                    <button type='submit' style={{marginTop:'15px'}} className={keys} >CREAR SEGMENTO</button>
                </Form>
                )}
            </Formik>
        </div>
    );
}

export default Segmentoform