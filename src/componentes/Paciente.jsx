import {useNavigate} from 'react-router-dom'
import usePacientes from '../hooks/usePacientes'

 
const Paciente = ({paciente}) => {

    const navigate = useNavigate()
    
    const { eliminarPaciente } = usePacientes()

    const handleClick = () => {
        if(confirm('¿Desea eliminar este paciente?')){
            eliminarPaciente(_id)
        } 
    }

    const { nombre, email, telefono, edad, peso , notas , _id} = paciente

    

  return (
    <tr className=" border-b hover:bg-gray-50 text-center">
        <td className="p-3"> {nombre}</td>
        <td className="p-3">
            <p><span className="text-grey-800  uppercase font-bold">Email: </span>{email}</p>
            <p><span className="text-grey-800  uppercase font-bold">Tel: </span>{telefono}</p>
        </td>
        <td className="p-3">
            <button
                type="Button"
                className="bg-slate-600 hover:bg-slate-800 block w-full text-white p-2 uppercase fond-bold text-xs"
                onClick={() => navigate(`/pacientes/${_id}`)}
                >Ver</button>
            <button
                type="Button"
                className="bg-teal-600 hover:bg-teal-800 block w-full text-white p-2 uppercase fond-bold text-xs mt-3"
                onClick={() => navigate(`/pacientes/editar/${_id}`)}
                >Editar</button>
            <button
                type="Button"
                className="bg-red-300 hover:bg-red-500 block w-full text-white p-2 uppercase fond-bold text-xs mt-3"
                onClick={handleClick}
                >Eliminar</button>
        </td>
    </tr>

  )
}

export default Paciente