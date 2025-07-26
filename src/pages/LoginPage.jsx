import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos o useNavigate
import './LoginPage.css';
import api from '../api';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // 2. Inicializamos a função de navegação

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/login', {
                email: email,
                senha: password
            });

            const token = response.data.token;
            localStorage.setItem('authToken', token);
            
            
            navigate('/dashboard');

        } catch (err) {
            const errorMessage = err.response?.data || 'Email ou senha inválidos.';
            setError(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <div className="welcome-panel">
                <h2>Seja Bem-vindo!</h2>
                <p>Ainda não tem uma conta? Cadastre-se e comece a organizar seu negócio hoje mesmo.</p>
                <button className="panel-button">Registre-se</button>
            </div>

            <div className="form-panel">
                <form onSubmit={handleSubmit}>
                    <h1>Acessar o Sistema</h1>
                    <div className="logo-placeholder">Seu Logo Aqui</div>
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <a href="#" className="forgot-password">Esqueci minha senha</a>

                    <button type="submit" className="login-button">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;