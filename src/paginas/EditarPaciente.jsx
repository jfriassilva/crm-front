import { useEffect} from "react"
import usePacientes from "../hooks/usePacientes"
import { useParams } from 'react-router-dom'
import Spinner from "../componentes/Spinner"
import FormularioPaciente from "../componentes/FormularioPaciente"

const EditarPaciente = () => {
  const params = useParams();
  const{ obtenerPaciente, paciente, cargando } = usePacientes()

  useEffect(() => {
    obtenerPaciente(params.id)
  }, []);

  const { nombre } = paciente

  if (cargando) return <Spinner/>

  return (
    <>
      <h1 className="font-black text-4xl text-sky-600">Editar Paciente: {nombre}</h1>
        <p className="mt-3">
          Utiliza este formulario para editar datos de un paciente
        </p>

        <FormularioPaciente/>
    
    </>
  )
}

export default EditarPaciente
