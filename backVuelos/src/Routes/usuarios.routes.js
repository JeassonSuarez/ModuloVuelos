import { Router } from "express";
import { getUsuario } from "../db.js";


const router = Router();
router.get('/vuelo', async(req, res)=>{
    res.json(await getUsuario("select p.placebname, p2.placebname, p3.placebname, pt.desplacetypeb, a.airportname, al.airlinename from placetypeb pt, placeb p, placeb p2, placeb p3, airport a, airline al where pt.idplacetypeb=p2.idplacetypeb and p.idplaceb=p2.pla_idplaceb and p2.idplaceb=p3.pla_idplaceb and a.idplaceb=p3.idplaceb and al.airlinecode='V7' and a.airtportcode='BOG'"));
});

router.post('/traePilotoAerolinea', async(req, res)=>{
    // console.log('holaaaaaaaaaaaaa',req.body);
    let npiloto = await getUsuario(`select p.personname from pilot pi, employee e, person p where pi.airlinecode=e.airlinecode and pi.employeenumber=e.employeenumber and p.idperson=e.idperson and pi.airlinecode='${req.body[0]}'`);
    // console.log(npiloto.rows);
    res.json(npiloto.rows);
})

router.post('/vuelo', async(req, res)=>{
    
    // console.log(req.body)
    let respuesta = await getUsuario(`select p.placebname, p2.placebname, p3.placebname, pt.desplacetypeb, a.airportname, al.airlinename from placetypeb pt, placeb p, placeb p2, placeb p3, airport a, airline al where pt.idplacetypeb=p2.idplacetypeb and p.idplaceb=p2.pla_idplaceb and p2.idplaceb=p3.pla_idplaceb and a.idplaceb=p3.idplaceb and al.airlinecode='${req.body.aerolinea}' and a.airtportcode='${req.body.aeropuerto}'`)
    res.json(respuesta.rows)
    // res.json(respuesta.rowsAffected)
});

router.post('/seg', async(req, res)=>{
    
    // console.log(req.body.aeropuertoVal)
    let respuesta = await getUsuario(`select p.placebname, p2.placebname, p3.placebname, pt.desplacetypeb, a.airportname, al.airlinename from placetypeb pt, placeb p, placeb p2, placeb p3, airport a, airline al where pt.idplacetypeb=p2.idplacetypeb and p.idplaceb=p2.pla_idplaceb and p2.idplaceb=p3.pla_idplaceb and a.idplaceb=p3.idplaceb and a.airtportcode='${req.body.aeropuertoVal}'`)
    res.json(respuesta.rows)
    // res.json(respuesta.rowsAffected)
});


router.post('/segmento', async(req, res)=>{
    let contadorColsAfectadas = 0;
    let r=req.body;   
    console.log(r); 
    for (let i = 0; i < r.length; i++) {
        let fechaFlight = r[i].fecha+" "+r[i].hora+":00";
        if (i===0) {
            let insertarVuelo = await getUsuario(`insert into flight values('${r[i].aerolinea}', '${r[i].vuelo}', TIMESTAMP '${fechaFlight}')`) 
            console.log('Insertando vuelo',insertarVuelo);
            let insertarSegmentoInicial = await getUsuario(`insert into flightsegment values('${r[i].aeropuerto}', '${r[i].aerolinea}', '${r[i].vuelo}', '${r[i].aeropuerto}', TIMESTAMP '${fechaFlight}')`)
            let respuestaLisPilotoInicial= await getUsuario(`select pi.pilotlicense from pilot pi, employee e, person pe where pe.idperson=e.idperson and e.employeenumber=pi.employeenumber and e.airlinecode=pi.airlinecode and pe.personname='${r[i].piloto}' and e.airlinecode='${r[i].aerolinea}'`)
            console.log(respuestaLisPilotoInicial.rows[0][0]);
            let respuestaAsignacionPilotoInicial = await getUsuario(`insert into PilotAssignment values('${respuestaLisPilotoInicial.rows[0][0]}', '${r[i].aeropuerto}', '${r[i].aerolinea}', '${r[i].vuelo}')`)
            console.log(respuestaAsignacionPilotoInicial);
            if(insertarVuelo.rowsAffected===1 && insertarSegmentoInicial.rowsAffected===1 && respuestaAsignacionPilotoInicial.rowsAffected===1)contadorColsAfectadas++;           
        }else{
            let insertarSegmento = await getUsuario(`insert into flightsegment values('${r[i].aeropuerto}', '${r[i].aerolinea}', '${r[i].vuelo}', '${r[i-1].aeropuerto}', TIMESTAMP '${fechaFlight}:00')`)
            console.log('Insertando segmento',insertarSegmento);           
            let respuestaLisPiloto= await getUsuario(`select pi.pilotlicense from pilot pi, employee e, person pe where pe.idperson=e.idperson and e.employeenumber=pi.employeenumber and e.airlinecode=pi.airlinecode and pe.personname='${r[i].piloto}' and e.airlinecode='${r[i].aerolinea}'`)
            console.log(respuestaLisPiloto.rows[0][0]);
            let respuestaAsignacionPiloto = await getUsuario(`insert into PilotAssignment values('${respuestaLisPiloto.rows[0][0]}', '${r[i].aeropuerto}', '${r[i].aerolinea}', '${r[i].vuelo}')`)
            console.log(respuestaAsignacionPiloto);
            if(insertarSegmento.rowsAffected===1 && respuestaAsignacionPiloto.rowsAffected===1){
                contadorColsAfectadas++;    
            }
        }
    }
    contadorColsAfectadas===r.length?res.json(true):res.json(false)
});

router.post('/conexion', async(req, res)=>{

    //TRAE TODOS LOS SEGMENTOS DE UN VUELO ORDENADOS POR FECHA, Y SE SELECCIONA EL CODIGO DEL AEROPUERTO
    let respuestaSegmentos = await getUsuario(`select * from flightsegment where flightnumber='${req.body.numVuelo}' order by dateflightseg`)
    // console.log(respuestaSegmentos.rows[respuestaSegmentos.rows.length-1][0], respuestaSegmentos.rows[respuestaSegmentos.rows.length-1][2]);

    // TRAE NOMBRE DE AEROPUERTO PREVIO
    let respuestaAeropuerto = await getUsuario(`select airportname from airport where airtportcode='${respuestaSegmentos.rows[respuestaSegmentos.rows.length-1][0]}'`);
    // console.log(respuestaAeropuerto.rows[0][0]);

    //ENVIA DATOS DE VUELO PREVIO A LA CONEXION
    const arrSegCon = [respuestaSegmentos.rows[respuestaSegmentos.rows.length-1][0], respuestaSegmentos.rows[respuestaSegmentos.rows.length-1][2], respuestaAeropuerto.rows[0][0]];
    // console.log(arrSegCon);
    res.json(arrSegCon);
})

router.post('/existenciaVuelo', async(req, res)=>{
    let respuestaEVuelo = await getUsuario(`select * from flight where flightnumber='${req.body.numVuelo}' and airlinecode='${req.body.aerolinea}'`);
    // console.log(respuestaEVuelo.rows);
    res.json(respuestaEVuelo.rows);
})

router.post('/traerSegmentosConexion', async(req, res)=>{
    console.log(req.body);
    let respuestaVueloInicial = await getUsuario(`select * from flightsegment where flightnumber=${req.body[0].numVuelo} ORDER BY dateflightseg`);
    console.log(respuestaVueloInicial.rows[respuestaVueloInicial.rows.length-1]);
    let respuestaConexion = await getUsuario(`select * from flightsegment where flightnumber=${req.body[1].numVuelo} ORDER BY dateflightseg`);
    console.log(respuestaConexion.rows[0]);
    let arrConexion = [respuestaVueloInicial.rows[respuestaVueloInicial.rows.length-1], respuestaConexion.rows[0]]
    res.json(arrConexion);
})

router.post('/insertarConexion', async(req, res)=>{
    console.log('INSERTAR ESTO: ',req.body);
    let insertFSFS = await getUsuario(`insert into fsfs values ('${req.body[0][0]}', '${req.body[0][1]}', '${req.body[0][2]}', '${req.body[1][0]}', '${req.body[1][1]}', '${req.body[1][2]}')`);
    if (insertFSFS.rowsAffected===1) {
        // console.log(insertFSFS);
        res.json(true);
    }else{
        res.json(false);
    }
})

router.post('/conexionSegmentos', async(req, res)=>{
    console.log(req.body);
    let conexionSegmentos= await getUsuario(`select codsAeropuertosSegs.numVueloAerolinea, codsAeropuertosSegs.codAerolinea, aerolinea.airlinename,  a.airportname, codsAeropuertosSegs.codAeropuerto,  ciudad.placebname, ntipoDiv.desplacetypeb, division.placebname, pais.placebname, codsAeropuertosSegs.fecha, codsAeropuertosSegs.hora, persona.personname from 
    placetypeb ntipoDiv, placeb pais, placeb division, placeb ciudad, airport a, pilotassignment pilotoAsig, pilot piloto, employee empleado, person persona, flight vuelo, airline aerolinea,
    (select fs.airtportcode codAeropuerto, fs.airlinecode codAerolinea, fs.airlinecode||''||fs.flightnumber numVueloAerolinea, fs.flightnumber numVuelo,to_char(dateflightseg, 'yyyy/mm/dd') fecha, to_char(dateflightseg, 'hh24') hora  from flightsegment fs where fs.flightnumber='${req.body.numVuelo}') codsAeropuertosSegs where 
    ntipoDiv.idplacetypeb=division.idplacetypeb and 
    pais.idplaceb=division.pla_idplaceb and 
    division.idplaceb=ciudad.pla_idplaceb and 
    a.idplaceb=ciudad.idplaceb and 
    a.airtportcode=codsAeropuertosSegs.codAeropuerto and
    pilotoAsig.airtportcode=codsAeropuertosSegs.codAeropuerto and
    pilotoAsig.airlinecode=codsAeropuertosSegs.codAerolinea and
    pilotoAsig.flightnumber=codsAeropuertosSegs.numVuelo and
    pilotoAsig.pilotlicense=piloto.pilotlicense and
    piloto.airlinecode=empleado.airlinecode and
    piloto.employeenumber=empleado.employeenumber and
    persona.idperson=empleado.idperson and
    codsAeropuertosSegs.numVuelo=vuelo.flightnumber and
    codsAeropuertosSegs.codAerolinea=vuelo.airlinecode and
    vuelo.airlinecode=aerolinea.airlinecode`);
    res.json(conexionSegmentos.rows)
})

// GENERACION DE REGISTROS

router.post('/buscadorVuelos', async(req, res)=>{
    console.log(req.body.hora, 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjd')
    let vuelos=await getUsuario(`
    
    select distinct codsAeropuertosSegs.numVuelo numeroVueloFinal, codsAeropuertosSegs.codAerolinea coda from 
    placetypeb ntipoDiv, placeb pais, placeb division, placeb ciudad, airport a, pilotassignment pilotoAsig, pilot piloto, employee empleado, person persona, flight vuelo, airline aerolinea,
    (select fs.airtportcode codAeropuerto, fs.airlinecode codAerolinea, fs.airlinecode||''||fs.flightnumber numVueloAerolinea, fs.flightnumber numVuelo,to_char(dateflightseg, 'yyyy/mm/dd') fecha, to_char(dateflightseg, 'hh24') hora  from flightsegment fs, flight fliV where fs.flightnumber=fliV.flightnumber and fs.airlinecode=fliV.airlinecode and fs.air_airtportcode='${req.body.aOrigen}' and to_char(fliV.dateflight, 'yyyy-mm-dd')='${req.body.fecha}' and to_char(CAST(to_char(fliV.dateflight, 'hh24') AS INT))='${req.body.hora}') codsAeropuertosSegs where 
    ntipoDiv.idplacetypeb=division.idplacetypeb and 
    pais.idplaceb=division.pla_idplaceb and 
    division.idplaceb=ciudad.pla_idplaceb and 
    a.idplaceb=ciudad.idplaceb and 
    a.airtportcode=codsAeropuertosSegs.codAeropuerto and
    pilotoAsig.airtportcode=codsAeropuertosSegs.codAeropuerto and
    pilotoAsig.airlinecode=codsAeropuertosSegs.codAerolinea and
    pilotoAsig.flightnumber=codsAeropuertosSegs.numVuelo and
    pilotoAsig.pilotlicense=piloto.pilotlicense and
    piloto.airlinecode=empleado.airlinecode and
    piloto.employeenumber=empleado.employeenumber and
    persona.idperson=empleado.idperson and
    codsAeropuertosSegs.numVuelo=vuelo.flightnumber and
    codsAeropuertosSegs.codAerolinea=vuelo.airlinecode and
    vuelo.airlinecode=aerolinea.airlinecode

    `);
    // console.log(vuelos.rows);
    if (vuelos.rows.length===0) {
        res.json(false);
    }else{
        res.json(vuelos.rows)
        console.log(vuelos.rows, vuelos.rows[0][0])
    }

})

router.post('/segmentosFiltroVuelos', async(req, res)=>{
    console.log("Vuelo con filtro",req.body);
    let arrVuelos = [];
    for (let i = 0; i < req.body[0].length; i++) {
        let segmentosVuelos = await getUsuario(`
        select codsAeropuertosSegs.numVueloAerolinea, codsAeropuertosSegs.codAerolinea, aerolinea.airlinename,  a.airportname, codsAeropuertosSegs.codAeropuerto,  ciudad.placebname, ntipoDiv.desplacetypeb, division.placebname, pais.placebname, codsAeropuertosSegs.fecha, codsAeropuertosSegs.hora, persona.personname from 
        placetypeb ntipoDiv, placeb pais, placeb division, placeb ciudad, airport a, pilotassignment pilotoAsig, pilot piloto, employee empleado, person persona, flight vuelo, airline aerolinea,
        (select fs.airtportcode codAeropuerto, fs.airlinecode codAerolinea, fs.airlinecode||''||fs.flightnumber numVueloAerolinea, fs.flightnumber numVuelo,to_char(dateflightseg, 'yyyy/mm/dd') fecha, to_char(dateflightseg, 'hh24') hora  from flightsegment fs where fs.flightnumber='${req.body[0][i][0]}' and fs.airlinecode='${req.body[0][i][1]}') codsAeropuertosSegs where 
        ntipoDiv.idplacetypeb=division.idplacetypeb and 
        pais.idplaceb=division.pla_idplaceb and 
        division.idplaceb=ciudad.pla_idplaceb and 
        a.idplaceb=ciudad.idplaceb and 
        a.airtportcode=codsAeropuertosSegs.codAeropuerto and
        pilotoAsig.airtportcode=codsAeropuertosSegs.codAeropuerto and
        pilotoAsig.airlinecode=codsAeropuertosSegs.codAerolinea and
        pilotoAsig.flightnumber=codsAeropuertosSegs.numVuelo and
        pilotoAsig.pilotlicense=piloto.pilotlicense and
        piloto.airlinecode=empleado.airlinecode and
        piloto.employeenumber=empleado.employeenumber and
        persona.idperson=empleado.idperson and
        codsAeropuertosSegs.numVuelo=vuelo.flightnumber and
        codsAeropuertosSegs.codAerolinea=vuelo.airlinecode and
        vuelo.airlinecode=aerolinea.airlinecode
        
        union
        
        /*INDICA CUALES SON LOS SEGMENTOS DE UN NUMERO DE VUELO*/
        select codsAeropuertosSegs.numVueloAerolinea, codsAeropuertosSegs.codAerolinea, aerolinea.airlinename,  a.airportname, codsAeropuertosSegs.codAeropuerto,  ciudad.placebname, ntipoDiv.desplacetypeb, division.placebname, pais.placebname, codsAeropuertosSegs.fecha, codsAeropuertosSegs.hora, persona.personname from 
        placetypeb ntipoDiv, placeb pais, placeb division, placeb ciudad, airport a, pilotassignment pilotoAsig, pilot piloto, employee empleado, person persona, flight vuelo, airline aerolinea,
        (select fs.airtportcode codAeropuerto, fs.airlinecode codAerolinea, fs.airlinecode||''||fs.flightnumber numVueloAerolinea, fs.flightnumber numVuelo,to_char(dateflightseg, 'yyyy/mm/dd') fecha, to_char(dateflightseg, 'hh24') hora  from flightsegment fs, (select flightnumber fn from fsfs connect by   fli_flightnumber=  prior flightnumber start with fli_flightnumber='${req.body[0][i][0]}' and fli_airlinecode='${req.body[0][i][1]}') jerarquia where fs.flightnumber=jerarquia.fn) codsAeropuertosSegs where 
        ntipoDiv.idplacetypeb=division.idplacetypeb and 
        pais.idplaceb=division.pla_idplaceb and 
        division.idplaceb=ciudad.pla_idplaceb and 
        a.idplaceb=ciudad.idplaceb and 
        a.airtportcode=codsAeropuertosSegs.codAeropuerto and
        pilotoAsig.airtportcode=codsAeropuertosSegs.codAeropuerto and
        pilotoAsig.airlinecode=codsAeropuertosSegs.codAerolinea and
        pilotoAsig.flightnumber=codsAeropuertosSegs.numVuelo and
        pilotoAsig.pilotlicense=piloto.pilotlicense and
        piloto.airlinecode=empleado.airlinecode and
        piloto.employeenumber=empleado.employeenumber and
        persona.idperson=empleado.idperson and
        codsAeropuertosSegs.numVuelo=vuelo.flightnumber and
        codsAeropuertosSegs.codAerolinea=vuelo.airlinecode and
        vuelo.airlinecode=aerolinea.airlinecode order by fecha
        `);
        console.log(segmentosVuelos.rows.length)
        const arr = [];
        // for (let i = 0; i < segmentosVuelos.rows.length; i++) {
        //     if(segmentosVuelos.rows[i][4]!==req.body[1]){
        //         arr.push(segmentosVuelos.rows[i])
        //     }else{
        //         arr.push(segmentosVuelos.rows[i])
        //         break;
        //     }
        // }
        let aux= false;
        for (const seg of segmentosVuelos.rows) {
            console.log(seg);
            if (seg[4]!==req.body[1]) {
                arr.push(seg)
            }else{
                arr.push(seg)
                aux=true;
                break
            }
        }
        if(aux){
            arrVuelos.push(arr)
        }
        // arrVuelos.push(segmentosVuelos.rows)
    }
    res.json(arrVuelos)
})
    
    export default router;
