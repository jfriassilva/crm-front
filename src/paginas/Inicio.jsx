import {useState , useEffect} from 'react'
import Paciente from '../componentes/Paciente'
import usuarioAxios from '../config/usuarioAxios'
import usePacientes from '../hooks/usePacientes'
import Busqueda from '../componentes/busqueda'



const Inicio = () => {
  const [pacientes, setPacientes] = useState([])
 
  const { handleBuscador } = usePacientes()


useEffect(() => {
  const obtenerPacientes = async () => {
    try {
     const token = localStorage.getItem('token')
     if(!token) return

     const config = {
         headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
         }
     }
     const { data } = await usuarioAxios('/pacientes', config) 
     setPacientes(data)

      } catch (error) {
        console.log(error)
      }
    }
    obtenerPacientes()
}, [])


  return (
    <>
    <h1 className="font-black text-4xl text-teal-600">Pacientes</h1>
    <p className="mt-3">Administra tus pacientes</p>
    
    <div className="flex justify-end md:flex-row items-center gap-4">
          <button 
            type="button"
            className=" font-bold uppercase "
            onClick={handleBuscador}
          > Buscar Paciente
          </button>
      <Busqueda/>
      </div>
  
    <table className="w-full mt-5 table-auto shadow bg-white">
      <thead className='bg-teal-600 text-white'>
        <tr>
          <th className="p-2">Nombre</th>
          <th className="p-2">Contacto</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>

      <tbody>
          {pacientes.map( paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />
          ))}
      </tbody>
    </table>
    </>
  )
}

export default Inicio