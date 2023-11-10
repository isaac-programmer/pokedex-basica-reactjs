import React from "react";
import { Link } from "react-router-dom";
import { getPokemonsType } from '../api/api';
import './estilos/styles.css';


export default function ListaDeTipos({ tipos, pokes }: any) {

    return (
        <>
            {
                tipos?.map((type, index) => {
                    return (
                        <li key={index}>
                            <Link to={`/${type.name}`} onClick={() => { getPokemonsType(inserirNomeTipo(type.name, tipos), pokes.funcao) }} className={`tipo ${type.name}`}>
                                {type.name}
                            </Link>
                        </li>
                    )
                })
            }
        </>
    )
}

function inserirNomeTipo(nome, tipos) {
    for (let i = 0; i < tipos.length; i++) {
        if (nome === tipos[i].name) {
            return tipos[i].pokemon;
        }
    }
}