import React, { useState, useEffect } from 'react';
import api from '../api';
import './DashboardPage.css';
// Importando os ícones que vamos usar
import { FaUserFriends, FaBoxOpen, FaChartLine, FaDollarSign } from 'react-icons/fa';

function DashboardPage() {
    const [clientes, setClientes] = useState([]);
    const [stats, setStats] = useState({ vendasHoje: 'R$ 0,00', pedidosMes: 0, estoqueBaixo: 0 });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
               
                setStats({
                    vendasHoje: 'R$ 1.250,00',
                    pedidosMes: 152,
                    estoqueBaixo: 8
                });

               
                const response = await api.get('/clientes?idEmpresa=1');
                setClientes(response.data);

            } catch (err) {
                setError('Não foi possível carregar os dados do dashboard.');
                console.error("Erro ao buscar dados:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Painel de Controle</h1>

            {/* Seção de Cards (KPIs) */}
            <div className="kpi-cards-container">
                <div className="kpi-card">
                    <div className="card-icon" style={{ backgroundColor: '#2980b9' }}>
                        <FaDollarSign />
                    </div>
                    <div className="card-info">
                        <span className="card-value">{stats.vendasHoje}</span>
                        <span className="card-label">Vendas Hoje</span>
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="card-icon" style={{ backgroundColor: '#27ae60' }}>
                        <FaChartLine />
                    </div>
                    <div className="card-info">
                        <span className="card-value">{stats.pedidosMes}</span>
                        <span className="card-label">Pedidos no Mês</span>
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="card-icon" style={{ backgroundColor: '#f39c12' }}>
                        <FaUserFriends />
                    </div>
                    <div className="card-info">
                        <span className="card-value">{clientes.length}</span>
                        <span className="card-label">Total de Clientes</span>
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="card-icon" style={{ backgroundColor: '#c0392b' }}>
                        <FaBoxOpen />
                    </div>
                    <div className="card-info">
                        <span className="card-value">{stats.estoqueBaixo}</span>
                        <span className="card-label">Produtos com Estoque Baixo</span>
                    </div>
                </div>
            </div>

            {/* Seção da Tabela de Clientes */}
            <div className="recent-activity-container">
                <h2>Clientes Recentes</h2>
                {error && <p className="dashboard-error">{error}</p>}
                <table className="activity-table">
                    <thead>
                        <tr>
                            <th>Nome / Razão Social</th>
                            <th>CPF / CNPJ</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.slice(0, 5).map(cliente => ( // Mostra apenas os 5 primeiros
                            <tr key={cliente.idCliente}>
                                <td>{cliente.nomeRazaoSocial}</td>
                                <td>{cliente.cpfCnpj}</td>
                                <td>{cliente.emailPrincipal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashboardPage;