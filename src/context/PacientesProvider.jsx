import {useState, useEffect, createContext} from 'react'
import usuarioAxios from '../config/usuarioAxios'
import { useNavigate } from 'react-router-dom'



const PacientesContext = createContext();

const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [paciente, setPaciente] = useState({});
    const [cargando, setCargando] = useState(false)
    const [buscador, setBuscador] = useState(false)

    const navigate = useNavigate();

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

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitPaciente = async paciente => {

        if(paciente.id) {
         await editarPaciente(paciente)
        } else {
         await nuevoPaciente(paciente)
        }
    }

    const editarPaciente = async paciente => {
      try {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await usuarioAxios.put(`/pacientes/${paciente.id}`, paciente, config)

        const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState )

        setPacientes(pacientesActualizados)

        setAlerta({
          msg:'Paciente actualizado correctamente',
          error: false
      })
      setTimeout(()=> {
          setAlerta({})
          navigate('/pacientes')
      }, 2000)

      } catch (error) {
        console.log(error)
      }                                                         
    }

    const nuevoPaciente = async paciente => {
      try {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await usuarioAxios.post('/pacientes', paciente, config)
        
        setPaciente([...pacientes, data])

        setAlerta({
            msg:'Paciente agregado correctamente',
            error: false
        })
        setTimeout(()=> {
            setAlerta({})
            navigate('/pacientes')
        }, 3000)
    } catch (error) {
        console.log(error)
    }
  }

    const obtenerPaciente = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

           const { data } = await usuarioAxios(`/pacientes/${id}`, config )
           setPaciente(data)
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }

        const eliminarPaciente = async id  => {
            try {
                const token = localStorage.getItem('token')
            if(!token) return
                const config = {
                 headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
                }
            }
                
            const { data } = await usuarioAxios.delete(`/pacientes/${id}`, config)
                
                
            const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== id)
                
                
            setPaciente(pacientesActualizados)
                
                

            setTimeout(()=> {

                 navigate('/pacientes')
             }, 3000)
            } catch (error) {
                console.log(error)
            } finally {
                navigate('/pacientes/cargando')
            }
        }

        const handleBuscador = () => {
            setBuscador(!buscador)
        }

        const cerrarSesionPacientes =() => {
            setPacientes([])
            setPaciente({})
            setAlerta({})

        }
        
        
        return (
            <PacientesContext.Provider
            value={{
                pacientes,
                mostrarAlerta,
                alerta,
                submitPaciente,
                obtenerPaciente,
                paciente,
                cargando,
                eliminarPaciente,
                buscador,
                handleBuscador,
                cerrarSesionPacientes
            }}
            >{children}
        </PacientesContext.Provider>
    )
}
export {
    PacientesProvider
}


export default PacientesContext