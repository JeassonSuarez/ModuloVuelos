/*==============================================================*/
/* DBMS name:      ORACLE Version 12c                           */
/* Created on:     6/12/2022 9:58:43 p. m.                      */
/*==============================================================*/


alter table AIRLINE
   drop constraint FK_AIRLINE_AIRLINEAI_AIRLINE;

alter table AIRLINE
   drop constraint FK_AIRLINE_AIRLINEPL_PLACEB;

alter table AIRPORT
   drop constraint FK_AIRPORT_AIRPORTPL_PLACEB;

alter table AIRPORT
   drop constraint FK_AIRPORT_ATAIRPORT_AIRPORTT;

alter table AIRPORTSERVICE
   drop constraint FK_AIRPORTS_AIRPORTAS_AIRPORT;

alter table EMPLOYEE
   drop constraint FK_EMPLOYEE_AIRLINEEM_AIRLINE;

alter table EMPLOYEE
   drop constraint FK_EMPLOYEE_EMPLOYEEP_PARKINGS;

alter table EMPLOYEE
   drop constraint FK_EMPLOYEE_PERSONEMP_PERSON;

alter table FLIGHT
   drop constraint FK_FLIGHT_AIRLINEFL_AIRLINE;

alter table FLIGHTSEGMENT
   drop constraint FK_FLIGHTSE_AIRPORTFS_AIRPORT;

alter table FLIGHTSEGMENT
   drop constraint FK_FLIGHTSE1_AIRPORTFS_AIRPORT;

alter table FLIGHTSEGMENT
   drop constraint FK_FLIGHTSE_FLIGHTFS_FLIGHT;

alter table FSFS
   drop constraint FK_FSFS_FSFS_FLIGHTSE;

alter table FSFS
   drop constraint FK_FSFS_FSFS2_FLIGHTSE;

alter table GROUNDCREW
   drop constraint FK_GROUNDCR_EMPLOYEEG_EMPLOYEE;

alter table PARKINGSPACE
   drop constraint FK_PARKINGS_EMPLOYEEP_EMPLOYEE;

alter table PASSENGER
   drop constraint FK_PASSENGE_PERSONPAS_PERSON;

alter table PERSON
   drop constraint FK_PERSON_RESIDE_PLACEA;

alter table PILOT
   drop constraint FK_PILOT_EMPLOYEEP_EMPLOYEE;

alter table PILOTASSIGNMENT
   drop constraint FK_PILOTASS_FSPA_FLIGHTSE;

alter table PILOTASSIGNMENT
   drop constraint FK_PILOTASS_PILOTPA_PILOT;

alter table PLACEA
   drop constraint FK_PLACEA_PLACE_PLA_PLACEA;

alter table PLACEA
   drop constraint FK_PLACEA_TYPY_PLAC_PLACETYP;

alter table PLACEB
   drop constraint FK_PLACEB_PLACEPLAC_PLACEB;

alter table PLACEB
   drop constraint FK_PLACEB_PLACETYPE_PLACETYP;

drop index AIRLINEPLACEB_FK;

drop index AIRLINEAIRLINE_FK;

drop table AIRLINE cascade constraints;

drop index AIRPORTPLACEB_FK;

drop index ATAIRPORT_FK;

drop table AIRPORT cascade constraints;

drop index AIRPORTAS_FK;

drop table AIRPORTSERVICE cascade constraints;

drop table AIRPORTTYPE cascade constraints;

drop index AIRLINEEMPLOYEE_FK;

drop index EMPLOYEEPARKS_FK;

drop index PERSONEMPLOYEE_FK;

drop table EMPLOYEE cascade constraints;

drop index AIRLINEFLIGHT_FK;

drop table FLIGHT cascade constraints;

drop index AIRPORTFS_1_FK;

drop index AIRPORTFS_FK;

drop index FLIGHTFS_FK;

drop table FLIGHTSEGMENT cascade constraints;

drop index FSFS_FK;

drop index FSFS2_FK;

drop table FSFS cascade constraints;

drop index EMPLOYEEGROUNDCREW_FK;

drop table GROUNDCREW cascade constraints;

drop index EMPLOYEEPARKS2_FK;

drop table PARKINGSPACE cascade constraints;

drop index PERSONPASSENGER_FK;

drop table PASSENGER cascade constraints;

drop index RESIDE_FK;

drop table PERSON cascade constraints;

drop index EMPLOYEEPILOT_FK;

drop table PILOT cascade constraints;

drop index PILOTPA_FK;

drop index FSPA_FK;

drop table PILOTASSIGNMENT cascade constraints;

drop index PLACE_PLACEA_FK;

drop index TYPY_PLACE_FK;

drop table PLACEA cascade constraints;

drop index PLACETYPE_PLACE_FK;

drop index PLACEPLACEB_FK;

drop table PLACEB cascade constraints;

drop table PLACETYPEA cascade constraints;

drop table PLACETYPEB cascade constraints;

/*==============================================================*/
/* Table: AIRLINE                                               */
/*==============================================================*/
create table AIRLINE (
   AIRLINECODE          VARCHAR2(5)           not null,
   AIR_AIRLINECODE      VARCHAR2(5),
   IDPLACEB             VARCHAR2(5)           not null,
   AIRLINENAME          VARCHAR2(25)          not null,
   constraint PK_AIRLINE primary key (AIRLINECODE)
);

/*==============================================================*/
/* Index: AIRLINEAIRLINE_FK                                     */
/*==============================================================*/
create index AIRLINEAIRLINE_FK on AIRLINE (
   AIR_AIRLINECODE ASC
);

/*==============================================================*/
/* Index: AIRLINEPLACEB_FK                                      */
/*==============================================================*/
create index AIRLINEPLACEB_FK on AIRLINE (
   IDPLACEB ASC
);

/*==============================================================*/
/* Table: AIRPORT                                               */
/*==============================================================*/
create table AIRPORT (
   AIRTPORTCODE         VARCHAR2(5)           not null,
   AIRPORTTYPE          VARCHAR2(3),
   IDPLACEB             VARCHAR2(5),
   AIRPORTNAME          VARCHAR2(55)          not null,
   constraint PK_AIRPORT primary key (AIRTPORTCODE)
);

/*==============================================================*/
/* Index: ATAIRPORT_FK                                          */
/*==============================================================*/
create index ATAIRPORT_FK on AIRPORT (
   AIRPORTTYPE ASC
);

/*==============================================================*/
/* Index: AIRPORTPLACEB_FK                                      */
/*==============================================================*/
create index AIRPORTPLACEB_FK on AIRPORT (
   IDPLACEB ASC
);

/*==============================================================*/
/* Table: AIRPORTSERVICE                                        */
/*==============================================================*/
create table AIRPORTSERVICE (
   AIRPORTSERVICETK     VARCHAR2(6)           not null,
   AIRTPORTCODE         VARCHAR2(5)           not null,
   NEVERONSUNDAY        VARCHAR2(15)          not null,
   constraint PK_AIRPORTSERVICE primary key (AIRPORTSERVICETK)
);

/*==============================================================*/
/* Index: AIRPORTAS_FK                                          */
/*==============================================================*/
create index AIRPORTAS_FK on AIRPORTSERVICE (
   AIRTPORTCODE ASC
);

/*==============================================================*/
/* Table: AIRPORTTYPE                                           */
/*==============================================================*/
create table AIRPORTTYPE (
   AIRPORTTYPE          VARCHAR2(3)           not null,
   DESAIRPORTTYPE       VARCHAR2(30)          not null,
   constraint PK_AIRPORTTYPE primary key (AIRPORTTYPE)
);

/*==============================================================*/
/* Table: EMPLOYEE                                              */
/*==============================================================*/
create table EMPLOYEE (
   AIRLINECODE          VARCHAR2(5)           not null,
   EMPLOYEENUMBER       VARCHAR2(11)          not null,
   IDPERSON             VARCHAR2(3)           not null,
   PARKINGSPACE         VARCHAR2(4),
   DATEHIRED            DATE                  not null,
   constraint PK_EMPLOYEE primary key (AIRLINECODE, EMPLOYEENUMBER)
);

/*==============================================================*/
/* Index: PERSONEMPLOYEE_FK                                     */
/*==============================================================*/
create index PERSONEMPLOYEE_FK on EMPLOYEE (
   IDPERSON ASC
);

/*==============================================================*/
/* Index: EMPLOYEEPARKS_FK                                      */
/*==============================================================*/
create index EMPLOYEEPARKS_FK on EMPLOYEE (
   PARKINGSPACE ASC
);

/*==============================================================*/
/* Index: AIRLINEEMPLOYEE_FK                                    */
/*==============================================================*/
create index AIRLINEEMPLOYEE_FK on EMPLOYEE (
   AIRLINECODE ASC
);

/*==============================================================*/
/* Table: FLIGHT                                                */
/*==============================================================*/
create table FLIGHT (
   AIRLINECODE          VARCHAR2(5)           not null,
   FLIGHTNUMBER         VARCHAR2(5)           not null,
   DATEFLIGHT           TIMESTAMP             not null,
   constraint PK_FLIGHT primary key (AIRLINECODE, FLIGHTNUMBER)
);

/*==============================================================*/
/* Index: AIRLINEFLIGHT_FK                                      */
/*==============================================================*/
create index AIRLINEFLIGHT_FK on FLIGHT (
   AIRLINECODE ASC
);

/*==============================================================*/
/* Table: FLIGHTSEGMENT                                         */
/*==============================================================*/
create table FLIGHTSEGMENT (
   AIRTPORTCODE         VARCHAR2(5)           not null,
   AIRLINECODE          VARCHAR2(5)           not null,
   FLIGHTNUMBER         VARCHAR2(5)           not null,
   AIR_AIRTPORTCODE     VARCHAR2(5)           not null,
   DATEFLIGHTSEG        TIMESTAMP             not null,
   constraint PK_FLIGHTSEGMENT primary key (AIRTPORTCODE, AIRLINECODE, FLIGHTNUMBER)
);

/*==============================================================*/
/* Index: FLIGHTFS_FK                                           */
/*==============================================================*/
create index FLIGHTFS_FK on FLIGHTSEGMENT (
   AIRLINECODE ASC,
   FLIGHTNUMBER ASC
);

/*==============================================================*/
/* Index: AIRPORTFS_FK                                          */
/*==============================================================*/
create index AIRPORTFS_FK on FLIGHTSEGMENT (
   AIRTPORTCODE ASC
);

/*==============================================================*/
/* Index: AIRPORTFS_1_FK                                        */
/*==============================================================*/
create index AIRPORTFS_1_FK on FLIGHTSEGMENT (
   AIR_AIRTPORTCODE ASC
);

/*==============================================================*/
/* Table: FSFS                                                  */
/*==============================================================*/
create table FSFS (
   FLI_AIRTPORTCODE     VARCHAR2(5)           not null,
   FLI_AIRLINECODE      VARCHAR2(5)           not null,
   FLI_FLIGHTNUMBER     VARCHAR2(5)           not null,
   AIRTPORTCODE         VARCHAR2(5)           not null,
   AIRLINECODE          VARCHAR2(5)           not null,
   FLIGHTNUMBER         VARCHAR2(5)           not null,
   constraint PK_FSFS primary key (FLI_AIRTPORTCODE, FLI_AIRLINECODE, FLI_FLIGHTNUMBER, AIRTPORTCODE, AIRLINECODE, FLIGHTNUMBER)
);

/*==============================================================*/
/* Index: FSFS2_FK                                              */
/*==============================================================*/
create index FSFS2_FK on FSFS (
   AIRTPORTCODE ASC,
   AIRLINECODE ASC,
   FLIGHTNUMBER ASC
);

/*==============================================================*/
/* Index: FSFS_FK                                               */
/*==============================================================*/
create index FSFS_FK on FSFS (
   FLI_AIRTPORTCODE ASC,
   FLI_AIRLINECODE ASC,
   FLI_FLIGHTNUMBER ASC
);

/*==============================================================*/
/* Table: GROUNDCREW                                            */
/*==============================================================*/
create table GROUNDCREW (
   CONSEC               VARCHAR2(2)           not null,
   AIRLINECODE          VARCHAR2(5),
   EMPLOYEENUMBER       VARCHAR2(11),
   CERFICATIONDATE      DATE                  not null,
   constraint PK_GROUNDCREW primary key (CONSEC)
);

/*==============================================================*/
/* Index: EMPLOYEEGROUNDCREW_FK                                 */
/*==============================================================*/
create index EMPLOYEEGROUNDCREW_FK on GROUNDCREW (
   AIRLINECODE ASC,
   EMPLOYEENUMBER ASC
);

/*==============================================================*/
/* Table: PARKINGSPACE                                          */
/*==============================================================*/
create table PARKINGSPACE (
   PARKINGSPACE         VARCHAR2(4)           not null,
   AIRLINECODE          VARCHAR2(5),
   EMPLOYEENUMBER       VARCHAR2(11),
   constraint PK_PARKINGSPACE primary key (PARKINGSPACE)
);

/*==============================================================*/
/* Index: EMPLOYEEPARKS2_FK                                     */
/*==============================================================*/
create index EMPLOYEEPARKS2_FK on PARKINGSPACE (
   AIRLINECODE ASC,
   EMPLOYEENUMBER ASC
);

/*==============================================================*/
/* Table: PASSENGER                                             */
/*==============================================================*/
create table PASSENGER (
   IDPASSENGER          VARCHAR2(10)          not null,
   IDPERSON             VARCHAR2(3)           not null,
   constraint PK_PASSENGER primary key (IDPASSENGER)
);

/*==============================================================*/
/* Index: PERSONPASSENGER_FK                                    */
/*==============================================================*/
create index PERSONPASSENGER_FK on PASSENGER (
   IDPERSON ASC
);

/*==============================================================*/
/* Table: PERSON                                                */
/*==============================================================*/
create table PERSON (
   IDPERSON             VARCHAR2(3)           not null,
   IDPLACEA             VARCHAR2(5),
   PERSONNAME           VARCHAR2(30)          not null,
   constraint PK_PERSON primary key (IDPERSON)
);

/*==============================================================*/
/* Index: RESIDE_FK                                             */
/*==============================================================*/
create index RESIDE_FK on PERSON (
   IDPLACEA ASC
);

/*==============================================================*/
/* Table: PILOT                                                 */
/*==============================================================*/
create table PILOT (
   PILOTLICENSE         VARCHAR2(12)          not null,
   AIRLINECODE          VARCHAR2(5)           not null,
   EMPLOYEENUMBER       VARCHAR2(11)          not null,
   PILOTLICENSEEXPIRATION DATE                  not null,
   constraint PK_PILOT primary key (PILOTLICENSE)
);

/*==============================================================*/
/* Index: EMPLOYEEPILOT_FK                                      */
/*==============================================================*/
create index EMPLOYEEPILOT_FK on PILOT (
   AIRLINECODE ASC,
   EMPLOYEENUMBER ASC
);

/*==============================================================*/
/* Table: PILOTASSIGNMENT                                       */
/*==============================================================*/
create table PILOTASSIGNMENT (
   PILOTLICENSE         VARCHAR2(12)          not null,
   AIRTPORTCODE         VARCHAR2(5)           not null,
   AIRLINECODE          VARCHAR2(5)           not null,
   FLIGHTNUMBER         VARCHAR2(5)           not null,
   constraint PK_PILOTASSIGNMENT primary key (PILOTLICENSE, AIRTPORTCODE, AIRLINECODE, FLIGHTNUMBER)
);

/*==============================================================*/
/* Index: FSPA_FK                                               */
/*==============================================================*/
create index FSPA_FK on PILOTASSIGNMENT (
   AIRTPORTCODE ASC,
   AIRLINECODE ASC,
   FLIGHTNUMBER ASC
);

/*==============================================================*/
/* Index: PILOTPA_FK                                            */
/*==============================================================*/
create index PILOTPA_FK on PILOTASSIGNMENT (
   PILOTLICENSE ASC
);

/*==============================================================*/
/* Table: PLACEA                                                */
/*==============================================================*/
create table PLACEA (
   IDPLACEA             VARCHAR2(5)           not null,
   IDPLACETYPE          VARCHAR2(3)           not null,
   PLA_IDPLACEA         VARCHAR2(5),
   PLACEANAME           VARCHAR2(30)          not null,
   SIGLADIVISIONA       VARCHAR2(2),
   constraint PK_PLACEA primary key (IDPLACEA)
);

/*==============================================================*/
/* Index: TYPY_PLACE_FK                                         */
/*==============================================================*/
create index TYPY_PLACE_FK on PLACEA (
   IDPLACETYPE ASC
);

/*==============================================================*/
/* Index: PLACE_PLACEA_FK                                       */
/*==============================================================*/
create index PLACE_PLACEA_FK on PLACEA (
   PLA_IDPLACEA ASC
);

/*==============================================================*/
/* Table: PLACEB                                                */
/*==============================================================*/
create table PLACEB (
   IDPLACEB             VARCHAR2(5)           not null,
   IDPLACETYPEB         VARCHAR2(3)           not null,
   PLA_IDPLACEB         VARCHAR2(5),
   PLACEBNAME           VARCHAR2(30)          not null,
   SIGLADIVISIONB       VARCHAR2(2),
   constraint PK_PLACEB primary key (IDPLACEB)
);

/*==============================================================*/
/* Index: PLACEPLACEB_FK                                        */
/*==============================================================*/
create index PLACEPLACEB_FK on PLACEB (
   PLA_IDPLACEB ASC
);

/*==============================================================*/
/* Index: PLACETYPE_PLACE_FK                                    */
/*==============================================================*/
create index PLACETYPE_PLACE_FK on PLACEB (
   IDPLACETYPEB ASC
);

/*==============================================================*/
/* Table: PLACETYPEA                                            */
/*==============================================================*/
create table PLACETYPEA (
   IDPLACETYPE          VARCHAR2(3)           not null,
   DESPLACETYPE2        VARCHAR2(30)          not null,
   constraint PK_PLACETYPEA primary key (IDPLACETYPE)
);

/*==============================================================*/
/* Table: PLACETYPEB                                            */
/*==============================================================*/
create table PLACETYPEB (
   IDPLACETYPEB         VARCHAR2(3)           not null,
   DESPLACETYPEB        VARCHAR2(30)          not null,
   constraint PK_PLACETYPEB primary key (IDPLACETYPEB)
);

alter table AIRLINE
   add constraint FK_AIRLINE_AIRLINEAI_AIRLINE foreign key (AIR_AIRLINECODE)
      references AIRLINE (AIRLINECODE);

alter table AIRLINE
   add constraint FK_AIRLINE_AIRLINEPL_PLACEB foreign key (IDPLACEB)
      references PLACEB (IDPLACEB);

alter table AIRPORT
   add constraint FK_AIRPORT_AIRPORTPL_PLACEB foreign key (IDPLACEB)
      references PLACEB (IDPLACEB);

alter table AIRPORT
   add constraint FK_AIRPORT_ATAIRPORT_AIRPORTT foreign key (AIRPORTTYPE)
      references AIRPORTTYPE (AIRPORTTYPE);

alter table AIRPORTSERVICE
   add constraint FK_AIRPORTS_AIRPORTAS_AIRPORT foreign key (AIRTPORTCODE)
      references AIRPORT (AIRTPORTCODE);

alter table EMPLOYEE
   add constraint FK_EMPLOYEE_AIRLINEEM_AIRLINE foreign key (AIRLINECODE)
      references AIRLINE (AIRLINECODE);

alter table EMPLOYEE
   add constraint FK_EMPLOYEE_EMPLOYEEP_PARKINGS foreign key (PARKINGSPACE)
      references PARKINGSPACE (PARKINGSPACE);

alter table EMPLOYEE
   add constraint FK_EMPLOYEE_PERSONEMP_PERSON foreign key (IDPERSON)
      references PERSON (IDPERSON);

alter table FLIGHT
   add constraint FK_FLIGHT_AIRLINEFL_AIRLINE foreign key (AIRLINECODE)
      references AIRLINE (AIRLINECODE);

alter table FLIGHTSEGMENT
   add constraint FK_FLIGHTSE_AIRPORTFS_AIRPORT foreign key (AIRTPORTCODE)
      references AIRPORT (AIRTPORTCODE);

alter table FLIGHTSEGMENT
   add constraint FK_FLIGHTSE1_AIRPORTFS_AIRPORT foreign key (AIR_AIRTPORTCODE)
      references AIRPORT (AIRTPORTCODE);

alter table FLIGHTSEGMENT
   add constraint FK_FLIGHTSE_FLIGHTFS_FLIGHT foreign key (AIRLINECODE, FLIGHTNUMBER)
      references FLIGHT (AIRLINECODE, FLIGHTNUMBER);

alter table FSFS
   add constraint FK_FSFS_FSFS_FLIGHTSE foreign key (FLI_AIRTPORTCODE, FLI_AIRLINECODE, FLI_FLIGHTNUMBER)
      references FLIGHTSEGMENT (AIRTPORTCODE, AIRLINECODE, FLIGHTNUMBER);

alter table FSFS
   add constraint FK_FSFS_FSFS2_FLIGHTSE foreign key (AIRTPORTCODE, AIRLINECODE, FLIGHTNUMBER)
      references FLIGHTSEGMENT (AIRTPORTCODE, AIRLINECODE, FLIGHTNUMBER);

alter table GROUNDCREW
   add constraint FK_GROUNDCR_EMPLOYEEG_EMPLOYEE foreign key (AIRLINECODE, EMPLOYEENUMBER)
      references EMPLOYEE (AIRLINECODE, EMPLOYEENUMBER);

alter table PARKINGSPACE
   add constraint FK_PARKINGS_EMPLOYEEP_EMPLOYEE foreign key (AIRLINECODE, EMPLOYEENUMBER)
      references EMPLOYEE (AIRLINECODE, EMPLOYEENUMBER);

alter table PASSENGER
   add constraint FK_PASSENGE_PERSONPAS_PERSON foreign key (IDPERSON)
      references PERSON (IDPERSON);

alter table PERSON
   add constraint FK_PERSON_RESIDE_PLACEA foreign key (IDPLACEA)
      references PLACEA (IDPLACEA);

alter table PILOT
   add constraint FK_PILOT_EMPLOYEEP_EMPLOYEE foreign key (AIRLINECODE, EMPLOYEENUMBER)
      references EMPLOYEE (AIRLINECODE, EMPLOYEENUMBER);

alter table PILOTASSIGNMENT
   add constraint FK_PILOTASS_FSPA_FLIGHTSE foreign key (AIRTPORTCODE, AIRLINECODE, FLIGHTNUMBER)
      references FLIGHTSEGMENT (AIRTPORTCODE, AIRLINECODE, FLIGHTNUMBER);

alter table PILOTASSIGNMENT
   add constraint FK_PILOTASS_PILOTPA_PILOT foreign key (PILOTLICENSE)
      references PILOT (PILOTLICENSE);

alter table PLACEA
   add constraint FK_PLACEA_PLACE_PLA_PLACEA foreign key (PLA_IDPLACEA)
      references PLACEA (IDPLACEA);

alter table PLACEA
   add constraint FK_PLACEA_TYPY_PLAC_PLACETYP foreign key (IDPLACETYPE)
      references PLACETYPEA (IDPLACETYPE);

alter table PLACEB
   add constraint FK_PLACEB_PLACEPLAC_PLACEB foreign key (PLA_IDPLACEB)
      references PLACEB (IDPLACEB);

alter table PLACEB
   add constraint FK_PLACEB_PLACETYPE_PLACETYP foreign key (IDPLACETYPEB)
      references PLACETYPEB (IDPLACETYPEB);

