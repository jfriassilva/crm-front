import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'
import NuevoPaciente from './paginas/NuevoPaciente'
import EditarPaciente from './paginas/EditarPaciente'
import VerPaciente from './paginas/VerPaciente'
import Cargando from './paginas/Cargando'

import AuthLayout from './layout/AuthLayout'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'

import {AuthProvider} from './context/AuthProvider'
import {PacientesProvider} from './context/PacientesProvider'


function App() {

  
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword/>} />
              <Route path="olvide-password/:token" element={<NuevoPassword/>} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>} />
            </Route>
            <Route path="/pacientes"  element={<Layout/>}>
              <Route index element={<Inicio />} />
              <Route path="nuevo" element={<NuevoPaciente />} />
              <Route path="cargando" element={<Cargando />} />
              <Route path="editar/:id" element={<EditarPaciente />} />
              <Route path=":id" element={<VerPaciente />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
