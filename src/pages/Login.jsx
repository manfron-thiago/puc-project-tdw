import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Importando estilos

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Limpa a mensagem de erro
        setErro('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            localStorage.setItem('usuarioLogado', JSON.stringify(userCredential.user));
            navigate('/principal');
        } catch (error) {
            setErro('Usuário ou senha inválidos');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="E-mail" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                    required 
                />
                <button type="submit">Entrar</button>
            </form>
            <div className="register-button">
                <button className="button-light" onClick={() => navigate('/cadastro')}>Cadastrar-se</button>
            </div>
            {erro && <p className="message error">{erro}</p>} {/* Mensagem de erro abaixo do botão Cadastrar-se */}
            <div className="footer">
                <p>© Thiago Aifelder Manfron</p>
            </div>
        </div>
    );
};

export default Login;
