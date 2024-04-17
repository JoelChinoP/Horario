import React from "react";
import "./Selectores.css";

export default function Selectores ({selectores}) {
    return (
        <>
            <h3 className="titulo-selectores">Seleccionar Cursos</h3>
            <div className="Selectores">
            {selectores}
            </div>
        </>
    );
}