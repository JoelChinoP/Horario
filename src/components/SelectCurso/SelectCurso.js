import React, { useState} from 'react';
import './SelectCurso.css';

export default function SelectCurso ({curso, valorSeleccionado, handleChange}) {
    return (
        <div style={{backgroundColor: curso.color}}>
            <h3>{curso.nombre}</h3>
            <select value={valorSeleccionado} onChange={(event) => handleChange(event.target.value)}>
                <OptionCurso curso={curso} />
                <option value="">N.A.</option>
            </select>
        </div>
    );
}

function OptionCurso ({curso}) {
    return curso.grupos.map(grupo => (
        <option key={`${curso.id}-${grupo.grupo}`} value={`${curso.id}-${grupo.grupo}`}>
            {grupo.grupo}
        </option>
    ));
}
