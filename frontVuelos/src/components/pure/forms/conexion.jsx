import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";


export const Conexion = ({vueloPrev, enviarConexion}) => {
    
const initialCredentials = { 
    nuevaConexion:'',
    aerolinea: '',
    numVuelo:'',
    aeropuerto:''
}

const registroEsquema = Yup.object().shape(
{
    nuevaConexion: Yup.string().required('debe chekear para crear nueva conexión'),
    aerolinea: Yup.string().oneOf(['W3', 'V7', 'VY', 'EB', 'AC', 'WS', 'TS', '7F', '5T', 'YC', 'PD', 'AM', '4O', 'Y4', 'VB', 'VW', 'YQ', 'AV', '5Z', 'P5', 'VE', 'AA', 'XP', 'MX', 'DL', 'AR', 'AU', '4M']).required("Debe seleccionar una aerolinea"),
    numVuelo: Yup.string().required("Debe ingresar el numero del vuelo"),
}
);

const request = async (url, vp) => {
    const response = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    },
    body:JSON.stringify(vp)
    });
    if (!response.ok)
        throw new Error("WARN", response.status);
    const data = await response.json();
    return data;
}

return (
<div className='div-registro'>
    <h2 className='titleform'>Nueva conexión</h2>
    <Formik
    initialValues={ initialCredentials }
    validationSchema={ registroEsquema }
    onSubmit={async (values, { setSubmitting }) => {
            console.log('Vuelo previo',vueloPrev)
            if(vueloPrev.numVuelo===values.numVuelo){
                alert('El numero de vuelo para conexion no puede ser el mismo del vuelo')
            }else{
                console.log('TRAYENDO DATOS VUELO PREVIO')
                request('http://localhost:3000/conexion', vueloPrev)
                .then(response=>{
                    console.log('DATOS VUELO PREVIO',response);
                    if(values.numVuelo===response[1]){
                        alert('No puede realizar la conexion con el mismo vuelo')
                    }else if(values.aeropuerto!==response[0]){
                        alert(`Debe seleccionar el aeropuerto ${response[2]}`)
                    }else{
                        //VERIFICA SI EXISTE UN VUELO ASOCIADO A UNA AEROLINEA Y UN NUMERO DE VUELO, DE ACUERDO CON QUE SI EXISTE UN VUELO CON AEROPUERTO
                        console.log('VALIDANDO SI EXISTE UN VUELO ASOCIADO A LOS DATOS INSERTADOS')
                        request('http://localhost:3000/existenciaVuelo', values)
                        .then(response=>{
                            console.log('VUELO ASOCIADO A LOS DATOS',response)
                            if(response.length===0){
                                alert(`El vuelo numero ${values.numVuelo} con la aerolinea ${values.aerolinea} no existe`)
                            }else{
                                //TRAE LOS SEGMENTOS DEL VUELO INICIAL AL CUAL SE LE QUIERE ASOCIAR UNA CONEXION
                                console.log('TRAYENDO LOS SEGMENTOS DEL VUELO INICIAL')
                                request('http://localhost:3000/traerSegmentosConexion', [vueloPrev, values])
                                .then(response=>{
                                    console.log('SEGMENTO ULTIMO Y PRIMERO DE VUELO INICIAL Y CONEXION RESPECTIVAMENTE',response)
                                    if(response.length===2){
                                        //REALIZA LA INSERSION EN LA TABLA FSFS
                                        console.log('REALIZANDO LA INSERSION EN LA TABLA CONEXION')
                                        request('http://localhost:3000/insertarConexion', response)
                                        .then(response=>{
                                            console.log('INDICANDO SI SE REALIZO LA CONEXION:',response)
                                            if(!response){
                                                alert('No se pudo crear la conexión')
                                            }else{
                                                alert('Conexión creada')
                                                console.log('TAYENDO TODOS LOS SEGMENTOS DEL VUELO CON EL QUE SE REALIZO LA CONEXION')
                                                request('http://localhost:3000/conexionSegmentos', values)
                                                .then(response=>{
                                                    enviarConexion(response)
                                                    console.log('ELEMENTOS CON LOS QUE SE REALIZARA LA CONEXION',response)
                                                })
                                            }
                                        })
                                    }
                                })
                            } 
                        })
                    }                
                });
                // console.log(values)
            }
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

            <div className='divcheck'>
                <label htmlFor="nuevaConexion" id='check'>NUEVA CONEXION:</label>
                <Field type="checkbox" id="nuevaConexion" name="nuevaConexion" className='nuevaConexion'/>
            </div>

            <label htmlFor="aerolinea">Aerolineas:</label>
            <Field component="select" id="aerolinea" name="aerolinea" className='select'>
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

            <label htmlFor='numVuelo'>No.Vuelo:</label>
            <Field id='numVuelo' name='numVuelo' placeholder='#' type='number'/>
            {/* description errors */}
            {
                errors.numVuelo && touched.numVuelo &&
                (
                    <ErrorMessage component='div' name='numVuelo' className='errorM' />
                )
            }
            
            <label htmlFor={`aeropuerto`}>Aeropuerto:</label>
            <Field component="select" id={`aeropuerto`} name={`aeropuerto`} className='select'>
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
            {/* levelTask errors */}
            {
                errors.aeropuerto && touched.aeropuerto &&
                (
                    <ErrorMessage component='div' name='aeropuerto' className='errorM' />
                )
            }

            <button type='submit' style={{marginTop:'15px'}}>CREAR CONEXIÓN</button>
        </Form>
    )}
    </Formik>
</div>
);
};