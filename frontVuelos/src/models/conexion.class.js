export default class ConexionClass {

    vuelo = '';
    aerolinea = '';
    aeropuerto = '';
    ciudad = '';
    division='';
    pais='';
    fecha='';
    hora='';
    piloto='';

    constructor(vuelo, aerolinea, aeropuerto, ciudad, division, pais, fecha, hora, piloto) {
        this.vuelo = vuelo;
        this.aerolinea = aerolinea;
        this.aeropuerto = aeropuerto;
        this.ciudad = ciudad;
        this.division=division;
        this.pais=pais;
        this.fecha=fecha;
        this.hora=hora;
        this.piloto=piloto;
    };

}