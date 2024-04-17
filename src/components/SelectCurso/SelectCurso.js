import React, { useState} from 'react';
import './SelectCurso.css';

export default function SelectCurso ({curso, valorSeleccionado, handleChange}) {
    return (
        <div style={{backgroundColor: curso.color}} className='container-select'>
            <div className='nombre-curso'><h3>{curso.nombre}</h3></div>
            <select value={valorSeleccionado} onChange={(event) => handleChange(event.target.value)}
                className='select-curso'
            >
                <option value="" >Ninguno</option>
                <OptionCurso curso={curso} />
            </select>
        </div>
    );
}

function OptionCurso ({curso}) {
    return curso.grupos.map(grupo => (
        <option key={`${curso.id}-${grupo.grupo}`} value={`${curso.id}-${grupo.grupo}`}>
            GRUPO {grupo.grupo}
        </option>
    ));
}
