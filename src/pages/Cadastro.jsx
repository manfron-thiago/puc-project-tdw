import { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask'; // Importando a biblioteca de máscara
import '../styles/Cadastro.css'; // Importando estilos

const Cadastro = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const navigate = useNavigate();

    const handleCadastro = async (e) => {
        e.preventDefault();
        
        // Limpa as mensagens de erro e sucesso
        setErro('');
        setSucesso('');
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const uid = userCredential.user.uid;

            await setDoc(doc(db, 'usuarios', uid), {
                nome,
                sobrenome,
                dataNascimento
            });

            setSucesso('Usuário cadastrado com sucesso!');
            setTimeout(() => {
                navigate('/'); // Redireciona para a página de login após 3 segundos
            }, 3000);
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                setErro('Adicione um email válido');
            } else if (error.code === 'auth/weak-password') {
                setErro('A senha deve ter pelo menos 6 caracteres');
            } else {
                setErro('Erro ao cadastrar: ' + error.message);
            }
        }
    };

    return (
        <div className="cadastro-container">
            <h2>Cadastro</h2>
            <form onSubmit={handleCadastro}>
                <input 
                    type="text" 
                    placeholder="Nome" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Sobrenome" 
                    value={sobrenome} 
                    onChange={(e) => setSobrenome(e.target.value)} 
                    required 
                />
                {/* Campo de data com máscara para garantir o formato dd/mm/aaaa */}
                <InputMask
                    mask="99/99/9999"
                    placeholder="Data de Nascimento"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    required
                />
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
                <button type="submit">Cadastrar</button>
            </form>
            <button onClick={() => navigate('/')} className="button-light">Voltar</button>
            {/* Mensagens abaixo do botão "Voltar" */}
            {sucesso && <p className="message success">{sucesso}</p>}
            {erro && <p className="message error">{erro}</p>}

            <div className="footer">
                <p>© Thiago Aifelder Manfron</p>
            </div>
        </div>
    );
};

export default Cadastro;
