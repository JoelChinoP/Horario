import React from "react";
import "./Selectores.css";

export default function Selectores ({tituloTeoria, selectTeoria, tituloLab, selectLab}) {
    return (
        <>
            <div>
                <h3 className="titulo-selectores">{tituloTeoria}</h3>
                <div className="Selectores">
                {selectTeoria}
                </div>
                <div className="link-pdf">
                    <a href="https://drive.google.com/file/d/1F46vMoGYjbDPv2ydWgu_ml1AsEMm3Ukl/view?usp=sharing" 
                    target="_blank">link: horarios teoría</a>
                </div>
            </div>

            <div>
                <h3 className="titulo-selectores">{tituloLab}</h3>
                <div className="Selectores">
                {selectLab}
                </div>
                <div className="link-pdf">
                    <a href="https://docs.google.com/spreadsheets/d/1evnCs9MtT6VBxbz2ZE8CA_ZQa-OT8Nn2/edit#gid=1542532281" 
                    target="_blank">link: horarios laboratorio</a>
                </div>
            </div>
        </>
    );
}