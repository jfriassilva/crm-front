import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import usePacientes from '../hooks/usePacientes'
import Alerta from './Alerta'



const FormularioPaciente = () => {

  const [id, setId] = useState(null)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [edad, setEdad] = useState('')
  const [peso, setPeso] = useState('')
  const [notas, setNotas] = useState('')

  const params = useParams()
  const { mostrarAlerta, alerta, submitPaciente, paciente } = usePacientes();

  useEffect(() => {
    if(params.id && paciente.nombre) {
      setId(paciente._id)
      setNombre(paciente.nombre)
      setEmail(paciente.email)
      setTelefono(paciente.telefono)
      setEdad(paciente.edad)
      setPeso(paciente.peso)
      setNotas(paciente.notas)
    }
  }, [params])


  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, telefono, edad, peso, notas].includes('') ) {
      mostrarAlerta({
        msg:'Todos los campos son obligatorios',
        error: true
      })

      return
    }
    
    // 
    await submitPaciente({id ,nombre, email, telefono, edad, peso, notas})

    setId(null)
    setNombre('')
    setEmail('')
    setTelefono('')
    setEdad('')
    setPeso('')
    setNotas('')
  }

  const { msg } = alerta

  return (
    <form className="bg-white py-10 px-5 mt-10 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
        {msg && <Alerta alerta={alerta} /> }
        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="nombre"
                >Nombre del paciente</label>

            <input 
            id="nombre" 
              type="text" 
              className="mt-2 block w-full p-3 bg-gray-50" 
              placeholder="Nombre del paciente" 
              value={nombre}
              onChange={e => setNombre(e.target.value)}  
            />
        </div>

        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="email"
                >Email</label>

            <input 
            id="email" 
              type="mail" 
              className="mt-2 block w-full p-3 bg-gray-50" 
              placeholder="Mail del paciente" 
              value={email}
              onChange={e => setEmail(e.target.value)}  
            />
        </div>

        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="telefono"
                >Telefono del paciente</label>

            <input 
              id="telefono" 
              type="tel" 
              className="mt-2 block w-full p-3 bg-gray-50" 
              placeholder="Telefono del paciente" 
              value={telefono}
              onChange={e => setTelefono(e.target.value)}  
            />
        </div>

        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="edad"
                >Edad del paciente</label>

            <input 
              id="edad" 
              type="age" 
              className="mt-2 block w-50% p-3 bg-gray-50" 
              placeholder="Edad del paciente" 
              value={edad}
              onChange={e => setEdad(e.target.value)}  
            />
        </div>

        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="peso"
                >Peso del paciente</label>

            <input 
              id="peso" 
              type="number" 
              className="mt-2 block w-50% p-3 bg-gray-50" 
              placeholder="Peso del paciente" 
              value={peso}
              onChange={e => setPeso(e.target.value)}  
            />
        </div>

        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="notas"
                >Descripción del paciente</label>

            <textarea 
              id="notas" 
              type="text" 
              className="mt-2 block w-full p-3 bg-gray-50" 
              placeholder="Notas" 
              value={notas}
              onChange={e => setNotas(e.target.value)}  
            />
        </div>

        <input
          type="submit"
          value={ id ? 'Actualizar paciente' : 'Agregar Paciente'}
          className="mt-5 w-full bg-teal-600 p-3 text-white uppercase font-bold text-lg cursor-pointer hover:bg-teal-700 transition-colors"
        />
    </form>
  )       
}

export default FormularioPaciente