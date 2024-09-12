import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PageIniciarSesion from './components/organisms/IniciarSesion/PageIniciarSesion';
import { PageCreateForm } from './components/molecules/PageCreateForm';
import { PageRevision } from './components/organisms/Direccion/PageRevision';
import { PageMyForm } from './components/molecules/PageMyForm';
import { PageCRUDCarreras } from './components/carreras/PageCRUDCarreras';
import { PageDireccion } from './components/organisms/Direccion/PageDireccion';
import PageRegistro from './components/organisms/Registro/PageRegistro';
import PageInstituciones from './components/organisms/Instituciones/PageInstituciones';
import PageCrearInstituciones from './components/organisms/Instituciones/PageCrearInstitucion';
import PageEditarInstituciones from './components/organisms/Instituciones/PageEditarInstitucion';
import PageInstitucionDashboard from './components/organisms/Instituciones/PageInstitucionDashboard';
import PageDireccionDashboard from './components/organisms/Direccion/PageDireccionDashboard';
import PageSuperUsuario from './components/PageSuperUsuario';
import PageResetPassword from './components/organisms/PageResetPassword';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3000');

function App() {
    const rol = JSON.parse(localStorage.getItem('rol'));

    return (
        <Router>
            <Routes>
                {rol === 'alumno' && (
                    <>
                        <Route path="/usuario/equivalencias" element={<PageMyForm />} />
                        <Route path="/usuario/visualizar/:id" element={<PageRevision socket={socket} />} />
                        <Route path="/usuario/formulario" element={<PageCreateForm />} />
                    </>
                )}
                {rol === 'directivo' && (
                    <>
                        <Route path="/direccion/solicitudes" element={<PageDireccion />} />
                        <Route path="/direccion/revision/:id" element={<PageRevision socket={socket} />} />
                        <Route path="/instituciones/todas" element={<PageInstituciones />} />
                        <Route path="/instituciones/crear" element={<PageCrearInstituciones />} />
                        <Route path="/instituciones/editarInstitucion/:id" element={<PageEditarInstituciones />} />
                        <Route path="/direccion/instituciones" element={<PageInstitucionDashboard />} />
                        <Route path="/direccionDashboard" element={<PageDireccionDashboard />} />
                    </>
                )}
                {rol === 'superusuario' && (
                    <>
                        <Route path="/superusuario/solicitudes" element={<PageDireccion />} />
                        <Route path="/direccion/revision/:id" element={<PageRevision socket={socket} />} />
                        <Route path="/superusuario/usuarios" element={<PageSuperUsuario />} />
                        <Route path="/superusuario/carreras" element={<PageCRUDCarreras />} />
                        <Route path="/instituciones/todas" element={<PageInstituciones />} />
                        <Route path="/instituciones/crear" element={<PageCrearInstituciones />} />
                        <Route path="/instituciones/editarInstitucion/:id" element={<PageEditarInstituciones />} />
                        <Route path="/direccion/instituciones" element={<PageInstitucionDashboard />} />
                        <Route path="/direccionDashboard" element={<PageDireccionDashboard />} />
                    </>
                )}
                <Route path="/" element={<PageIniciarSesion />} />
                <Route path="/registro" element={<PageRegistro />} />
                <Route path="/resetPassword/:hash" element={<PageResetPassword />} />
            </Routes>

            <ToastContainer
                containerId={'Toastify'}
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Router>
    );
}

export default App;
