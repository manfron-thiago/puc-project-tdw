import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    return usuarioLogado ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
