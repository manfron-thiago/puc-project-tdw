import { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/Principal.css'; // Importando estilos

const Principal = () => {
    const [usuario, setUsuario] = useState(() => {
        const user = localStorage.getItem('usuarioLogado');
        return user ? JSON.parse(user) : null;
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuario = async () => {
            if (auth.currentUser) {
                const uid = auth.currentUser.uid;
                const docRef = doc(db, 'usuarios', uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUsuario(userData);
                    localStorage.setItem('usuarioLogado', JSON.stringify(userData));
                } else {
                    console.log('Nenhum documento encontrado!');
                }
            }
        };

        fetchUsuario();
    }, []);

    const handleLogout = () => {
        auth.signOut();
        localStorage.removeItem('usuarioLogado');
        setUsuario(null);
        navigate('/');
    };

    return (
        <div className="principal-container">
            <h2>Página Principal</h2>
            {usuario ? (
                <div className="user-info">
                    <p><strong>Bem-vindo, {usuario.nome}!</strong></p>
                    <p><strong>Nome:</strong> {usuario.nome}</p>
                    <p><strong>Sobrenome:</strong> {usuario.sobrenome}</p>
                    <p><strong>Data de Nascimento:</strong> {usuario.dataNascimento}</p>
                    <button className="logout-button" onClick={handleLogout}>Sair</button>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
            <div className="footer">
                <p>© Thiago Aifelder Manfron</p>
            </div>
        </div>
    );
};

export default Principal;
