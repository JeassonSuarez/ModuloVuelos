export default class Segmento {

    vuelo = '';
    aerolinea = '';
    aeropuerto = '';
    ciudad = '';
    division='';
    pais='';
    fecha='';
    hora='';
    piloto='';
    nombreDiv='';

    constructor(vuelo, aerolinea, aeropuerto, ciudad, division, nombreDiv, pais, fecha, hora, piloto) {
        this.vuelo = vuelo;
        this.aerolinea = aerolinea;
        this.aeropuerto = aeropuerto;
        this.ciudad = ciudad;
        this.division=division;
        this.nombreDiv=nombreDiv;
        this.pais=pais;
        this.fecha=fecha;
        this.hora=hora;
        this.piloto=piloto;
    };

}