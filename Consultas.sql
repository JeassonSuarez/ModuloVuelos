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
		
select distinct codsAeropuertosSegs.numVuelo numeroVueloFinal, codsAeropuertosSegs.codAerolinea coda from 
    placetypeb ntipoDiv, placeb pais, placeb division, placeb ciudad, airport a, pilotassignment pilotoAsig, pilot piloto, employee empleado, person persona, flight vuelo, airline aerolinea,
    (select fs.airtportcode codAeropuerto, fs.airlinecode codAerolinea, fs.airlinecode||''||fs.flightnumber numVueloAerolinea, fs.flightnumber numVuelo,to_char(dateflightseg, 'yyyy/mm/dd') fecha, to_char(dateflightseg, 'hh24') hora  from flightsegment fs, flight fliV where fs.flightnumber=fliV.flightnumber and fs.airlinecode=fliV.airlinecode and fs.air_airtportcode='${req.body.aOrigen}' and to_char(fliV.dateflight, 'yyyy-mm-dd')='${req.body.fecha}') codsAeropuertosSegs where 
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

select codsAeropuertosSegs.numVueloAerolinea, codsAeropuertosSegs.codAerolinea, aerolinea.airlinename,  a.airportname, codsAeropuertosSegs.codAeropuerto,  ciudad.placebname, ntipoDiv.desplacetypeb, division.placebname, pais.placebname, codsAeropuertosSegs.fecha, codsAeropuertosSegs.hora, persona.personname from 
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
    vuelo.airlinecode=aerolinea.airlinecode
	
	
select p.placebname, p2.placebname, p3.placebname, pt.desplacetypeb, a.airportname, al.airlinename 
from placetypeb pt, placeb p, placeb p2, placeb p3, airport a, airline al 
where pt.idplacetypeb=p2.idplacetypeb and p.idplaceb=p2.pla_idplaceb and p2.idplaceb=p3.pla_idplaceb and a.idplaceb=p3.idplaceb and a.airtportcode='${req.body.aeropuertoVal}'


select p.placebname, p2.placebname, p3.placebname, pt.desplacetypeb, a.airportname, al.airlinename 
from placetypeb pt, placeb p, placeb p2, placeb p3, airport a, airline al 
where pt.idplacetypeb=p2.idplacetypeb and p.idplaceb=p2.pla_idplaceb and p2.idplaceb=p3.pla_idplaceb and a.idplaceb=p3.idplaceb and al.airlinecode='${req.body.aerolinea}' and a.airtportcode='${req.body.aeropuerto}'

select * from flightsegment where flightnumber=${req.body[1].numVuelo} ORDER BY dateflightseg


select * from flight where flightnumber='${req.body.numVuelo}' and airlinecode='${req.body.aerolinea}'

select pi.pilotlicense from pilot pi, employee e, person pe 
where pe.idperson=e.idperson and e.employeenumber=pi.employeenumber and e.airlinecode=pi.airlinecode and pe.personname='${r[i].piloto}' and e.airlinecode='${r[i].aerolinea}'

select p.placebname, p2.placebname, p3.placebname, pt.desplacetypeb, a.airportname, al.airlinename from placetypeb pt, placeb p, placeb p2, placeb p3, airport a, airline al 
where pt.idplacetypeb=p2.idplacetypeb and p.idplaceb=p2.pla_idplaceb and p2.idplaceb=p3.pla_idplaceb and a.idplaceb=p3.idplaceb and al.airlinecode='V7' and a.airtportcode='BOG'

select p.personname from pilot pi, employee e, person p where pi.airlinecode=e.airlinecode and pi.employeenumber=e.employeenumber and p.idperson=e.idperson and pi.airlinecode='${req.body[0]}'

select p.placebname, p2.placebname, p3.placebname, pt.desplacetypeb, a.airportname, al.airlinename from placetypeb pt, placeb p, placeb p2, placeb p3, airport a, airline al 
where pt.idplacetypeb=p2.idplacetypeb and p.idplaceb=p2.pla_idplaceb and p2.idplaceb=p3.pla_idplaceb and a.idplaceb=p3.idplaceb and al.airlinecode='${req.body.aerolinea}' and a.airtportcode='${req.body.aeropuerto}'

select pi.pilotlicense from pilot pi, employee e, person pe 
where pe.idperson=e.idperson and e.employeenumber=pi.employeenumber and e.airlinecode=pi.airlinecode and pe.personname='${r[i].piloto}' and e.airlinecode='${r[i].aerolinea}'
