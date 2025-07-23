import React, { useState, useEffect } from 'react';
import api from '../api'; // Importamos nosso cliente de API

function DashboardPage() {
    
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchClientes = async () => {
            try {

                const response = await api.get('/clientes?idEmpresa=1'); 

                setClientes(response.data);

            } catch (err) {
                setError('Não foi possível carregar os clientes.');
                console.error("Erro ao buscar clientes:", err);
            }
        };

        fetchClientes(); 
    }, []); // O array vazio [] no final garante que o useEffect rode apenas uma vez.

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Seja bem-vindo! Você está logado.</p>
            <hr />

            <h2>Últimos Clientes Cadastrados</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.idCliente}>
                        {cliente.nomeRazaoSocial} - (CPF/CNPJ: {cliente.cpfCnpj})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DashboardPage;