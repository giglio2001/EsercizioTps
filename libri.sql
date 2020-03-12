drop table if exists autori;
create table autori (
    id integer primary key,
    cognome text not null,
    nome text
);

drop table if exists libri;
create table libri (
    id integer primary key,
    titolo text not null,
    fk_autore integer not null
);

insert into autori (id,cognome, nome) values (1,"pascoli", "giovanni");
insert into libri (id,titolo, fk_autore) values (1,"ciaociao", 1);