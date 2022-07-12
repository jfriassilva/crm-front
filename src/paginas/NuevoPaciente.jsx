import React from 'react'
import FormularioPaciente from '../componentes/FormularioPaciente'

const NuevoPaciente = () => {
  return (
    <>
    <h1 className="font-black text-4xl text-sky-600">Nuevo Paciente</h1>
    <p className="mt-3">Llena los siguientes campos para registrar un paciente</p>


    <FormularioPaciente/>
    </>
  )
}

export default NuevoPaciente