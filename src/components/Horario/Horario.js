import React, { useState, useEffect } from 'react';

import "./Horario.css";
import datos from "../../data/datos.json"

import TablaHorario from './TablaHorario/TablaHorario';
import Selectores from './Selectores/Selectores';
import {getColumn, getRow, getRowSpan} from './TablaHorario/TablaHorario';

import SelectCurso from '../SelectCurso/SelectCurso';
import Curso from '../Curso/Curso';

export default function Horario () {
    const [baseDeDatos, setBaseDeDatos] = useState(datos.cursos);
    const { cursos, selectores } = Render({ baseDeDatos });

    useEffect(() => {
        // Simulando una solicitud de datos asíncrona
        setBaseDeDatos(datos.cursos);
    }, []);

    return (
        <div className='container-horario'>
            <div className='container-tablero'>
                <TablaHorario
                    cursos={cursos}
                />
            </div>
            <div className='container-selectores'>
                <Selectores
                    selectores={selectores}
                />
            </div>
        </div>
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