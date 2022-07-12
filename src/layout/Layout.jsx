import {Outlet, Link, useLocation, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../componentes/Header'
import Spinner from '../componentes/Spinner'



const Layout = () => {

const { auth, cargando } = useAuth()
const location = useLocation()
const urlActual = location.pathname

if(cargando) return <Spinner/>
  return (
    <>
    {auth._id ? ( 
      <div className="bg-gray-100 " >
        <Header />
         <div className="md:flex md:min-h-screen">
          <div className="mx-auto bg-teal-600 px-5 py-10">
              <h2 className= "text-4xl font-black text-center text-white">Bienvenido: {auth.nombre}</h2>

              <nav className="mt-10">
                <Link
                  className={`${urlActual === '/pacientes' ? 'text-teal-300' : 'text-white'} text-2xl block mt-2 hover:text-teal-300`}
                  to="/pacientes">Pacientes</Link>
                <Link 
                  className={`${urlActual === '/pacientes/nuevo' ? 'text-teal-300' : 'text-white'} text-2xl block mt-2 hover:text-teal-300`}
                  to="/pacientes/nuevo">Nuevo Paciente</Link>
              </nav>
            </div>
            <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
              <Outlet/>
            </div>

          </div> 
      </div>
      ): <Navigate to= "/" />}
    </>
  )
}

export default Layout



