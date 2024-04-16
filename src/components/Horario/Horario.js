import React, { useState, useEffect } from 'react';

import "./Horario.css";
import datos from "../../data/datos.json"

import Tablero from '../Tablero/Tablero';
import Selectores from '../Selectores/Selectores';
import SelectCurso from '../SelectCurso/SelectCurso';
import Curso from '../Curso/Curso';
import {getColumn, getRow, getRowSpan} from '../Tablero/Tablero';

export default function Horario () {
    const [baseDeDatos, setBaseDeDatos] = useState(datos.cursos);
    const { cursos, selectores } = Render({ baseDeDatos });

    useEffect(() => {
        // Simulando una solicitud de datos asíncrona
        setBaseDeDatos(datos.cursos);
    }, []);

    return (
        <>
            <div className='tablero-container'>
                <Tablero 
                    cursos={cursos}
                />
            </div>
            <div>
                <Selectores
                    selectores={selectores}
                />
            </div>
        </>
    );
}

function Render({ baseDeDatos }) {
    const [valoresSeleccionados, setValoresSeleccionados] = useState({});

    const handleChange = (cursoId, valorSeleccionado) => {
        setValoresSeleccionados(prevState => ({
            ...prevState,
            [cursoId]: valorSeleccionado
        }));
    };

    const cursos = mapCursos(baseDeDatos, valoresSeleccionados, handleChange);
    const selectores = mapSelectores(baseDeDatos, valoresSeleccionados, handleChange);

    return {
        cursos: cursos,
        selectores: selectores
    };
}

function mapCursos(baseDeDatos, valoresSeleccionados, handleChange) {
    return baseDeDatos.map((curso) => {
        return curso.grupos.map((grupo) => {
            return grupo.horarios.map((horario) => {
                return (
                    <Curso
                        key={`${curso.id}-${grupo.grupo}`}
                        id={`${curso.id}-${grupo.grupo}`}
                        nombre={curso.nombre}
                        valorSeleccionado={valoresSeleccionados[curso.id] || ''}
                        backgroundColor={curso.color}
                        gridColumn={getColumn(horario.dia)}
                        gridRow={getRow(horario.horaIni)}
                        gridSpan={getRowSpan(horario.horaIni, horario.horaFin)}
                        horaIni={horario.horaIni}
                        horaFin={horario.horaFin}
                    />
                );
            });
        });
    });
}

function mapSelectores(baseDeDatos, valoresSeleccionados, handleChange) {
    return baseDeDatos.map(curso => (
        <SelectCurso
            key={curso.id}
            curso={curso}
            valorSeleccionado={valoresSeleccionados[curso.id] || ''}
            handleChange={(valor) => handleChange(curso.id, valor)}
        />
    ));
}


/*
function RenderCursos(baseDeDatos) {
    return baseDeDatos.map((curso) => {
      return curso.grupos.map((grupo) => {
        return grupo.horarios.map((horario) => {
          return (
            <Curso
              key={`${curso.id}-${grupo.grupo}`}
              id={`${curso.id}-${grupo.grupo}`}
              nombre={curso.nombre}
              valorSeleccionado={"PS-B"}
              backgroundColor={curso.color}
              gridColumn={getColumn(horario.dia)}
              gridRow={getRow(horario.horaIni)}
              gridSpan={getRowSpan(horario.horaIni, horario.horaFin)}
              horaIni={horario.horaIni}
              horaFin={horario.horaFin}
            />
          );
        });
      });
    });

    // Nuevo componente para manejar la lógica de selección
function useValoresSeleccionados() {
    const [valoresSeleccionados, setValoresSeleccionados] = useState({});

    const handleChange = (cursoId, valorSeleccionado) => {
        setValoresSeleccionados(prevState => ({
            ...prevState,
            [cursoId]: valorSeleccionado
        }));
    };

    return {
        valoresSeleccionados,
        handleChange
    };
}
  }*/