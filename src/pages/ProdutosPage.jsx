import React, { useState, useEffect } from 'react';
import api from '../api';
import './ProdutosPage.css'; // Vamos criar este arquivo de estilo
import ProdutoModal from '../components/ProdutoModal';
function ProdutosPage() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true); // State para controlar o feedback de carregamento
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                setLoading(true); // Começa a carregar
                // Fazemos a chamada para a nossa API de produtos
                const response = await api.get('/produtos?idEmpresa=1');
                setProdutos(response.data);
                setError('');
            } catch (err) {
                setError('Não foi possível carregar os produtos.');
                console.error("Erro ao buscar produtos:", err);
            } finally {
                setLoading(false); 
            }
        };

        fetchProdutos();
    }, []);

     const handleDelete = async (idProduto) => {
        // 1. Pede confirmação ao usuário antes de deletar
        if (window.confirm('Tem certeza de que deseja excluir este produto?')) {
            try {
                // 2. Chama o endpoint DELETE da nossa API
                await api.delete(`/produtos/${idProduto}`);

                // 3. Se deu certo, atualiza a lista na tela removendo o produto
                setProdutos(produtosAtuais => produtosAtuais.filter(p => p.idProduto !== idProduto));
                alert('Produto excluído com sucesso!');

            } catch (err) {
                setError('Não foi possível excluir o produto.');
                console.error("Erro ao excluir produto:", err);
            }
        }
    };



    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Gestão de Produtos</h1>
                <button className="add-button" onClick={() => setIsModalOpen(true)}>
                    + Novo Produto
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {loading ? (
                <p>Carregando produtos...</p>
            ) : (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Código Interno</th>
                            <th>Status</th>
                            <th>Estoque Total</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(produto => (
                            <tr key={produto.idProduto}>
                                <td>{produto.nome}</td>
                                <td>{produto.codigoInterno}</td>
                                <td>
                                    <span className={`status-badge status-${produto.status.toLowerCase()}`}>
                                        {produto.status}
                                    </span>
                                </td>

                                <td>
                                    {/* Usamos .reduce() para somar a 'quantidadeEstoque' de todas as variações */}
                                    {produto.variacoes.reduce((total, variacao) => total + variacao.quantidadeEstoque, 0)}
                                </td>
                                {/* ------------------------- */}
                                <td className="actions-cell">
                                    <button className="action-button edit">Editar</button>
                                    <button
                                        className="action-button delete"
                                        onClick={() => handleDelete(produto.idProduto)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        
            {isModalOpen && <ProdutoModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}

export default ProdutosPage;