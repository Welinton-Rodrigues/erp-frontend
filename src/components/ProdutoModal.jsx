import React, { useState } from 'react';
import './ProdutoModal.css';
import api from '../api';

function ProdutoModal({ onClose, onProductCreated }) {
    // State para os dados do produto "pai"
    const [produtoData, setProdutoData] = useState({
        nome: '',
        codigoInterno: '',
        unidadeMedida: 'UN',
        status: 'ATIVO',
    });

    // State para a lista de variações. Começa com uma variação em branco.
    const [variacoes, setVariacoes] = useState([
        { cor: '', tamanho: '', codigoBarras: '', precoVenda: '', quantidadeEstoque: '' }
    ]);

    const [error, setError] = useState('');

    // Função para lidar com mudanças nos campos do produto "pai"
    const handleProdutoChange = (e) => {
        const { name, value } = e.target;
        setProdutoData(prevState => ({ ...prevState, [name]: value }));
    };

    // Função para lidar com mudanças nos campos de uma variação específica
    const handleVariacaoChange = (index, e) => {
        const { name, value } = e.target;
        const list = [...variacoes];
        list[index][name] = value;
        setVariacoes(list);
    };

    // Função para adicionar uma nova linha de variação
    const handleAddVariacao = () => {
        setVariacoes([...variacoes, { cor: '', tamanho: '', codigoBarras: '', precoVenda: '', quantidadeEstoque: '' }]);
    };

    // Função para remover uma linha de variação
    const handleRemoveVariacao = (index) => {
        const list = [...variacoes];
        list.splice(index, 1);
        setVariacoes(list);
    };

    // Função para enviar o formulário para a API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const payload = {
                idEmpresa: 1, // Futuramente, pegar da sessão do usuário
                ...produtoData,
                variacoes: variacoes.map(v => ({
                    ...v,
                    precoVenda: parseFloat(v.precoVenda),
                    quantidadeEstoque: parseInt(v.quantidadeEstoque, 10)
                }))
            };

            const response = await api.post('/produtos', payload);
            alert('Produto cadastrado com sucesso!');
            onProductCreated(response.data); // Avisa a página pai que um novo produto foi criado
            onClose(); // Fecha o modal
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Ocorreu um erro ao cadastrar o produto.';
            setError(errorMessage);
            console.error(err);
        }
    };

    return (
        <div className="modal-overlay">
            <form className="modal-content" onSubmit={handleSubmit}>
                <div className="modal-header">
                    <h2>Novo Produto</h2>
                    <button type="button" onClick={onClose} className="close-button">&times;</button>
                </div>

                <div className="modal-body">
                    {error && <p className="error-message">{error}</p>}
                    
                    <div className="form-grid">
                        <div className="input-group">
                            <label>Nome do Produto</label>
                            <input name="nome" value={produtoData.nome} onChange={handleProdutoChange} required />
                        </div>
                        <div className="input-group">
                            <label>Código Interno</label>
                            <input name="codigoInterno" value={produtoData.codigoInterno} onChange={handleProdutoChange} />
                        </div>
                        <div className="input-group">
                            <label>Unidade de Medida</label>
                            <input name="unidadeMedida" value={produtoData.unidadeMedida} onChange={handleProdutoChange} required />
                        </div>
                        <div className="input-group">
                            <label>Status</label>
                            <select name="status" value={produtoData.status} onChange={handleProdutoChange}>
                                <option value="ATIVO">Ativo</option>
                                <option value="INATIVO">Inativo</option>
                            </select>
                        </div>
                    </div>

                    <hr className="divider" />
                    <h3>Variações (SKUs)</h3>

                    {variacoes.map((variacao, i) => (
                        <div key={i} className="variacao-row">
                            <input name="cor" placeholder="Cor" value={variacao.cor} onChange={e => handleVariacaoChange(i, e)} />
                            <input name="tamanho" placeholder="Tamanho" value={variacao.tamanho} onChange={e => handleVariacaoChange(i, e)} />
                            <input name="codigoBarras" placeholder="Código de Barras" value={variacao.codigoBarras} onChange={e => handleVariacaoChange(i, e)} required />
                            <input type="number" name="precoVenda" placeholder="Preço Venda" value={variacao.precoVenda} onChange={e => handleVariacaoChange(i, e)} required />
                            <input type="number" name="quantidadeEstoque" placeholder="Estoque" value={variacao.quantidadeEstoque} onChange={e => handleVariacaoChange(i, e)} required />
                            {variacoes.length > 1 && (
                                <button type="button" className="remove-button" onClick={() => handleRemoveVariacao(i)}>Remover</button>
                            )}
                        </div>
                    ))}
                    <button type="button" className="add-row-button" onClick={handleAddVariacao}>+ Adicionar Variação</button>
                </div>

                <div className="modal-footer">
                    <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
                    <button type="submit" className="submit-button">Salvar Produto</button>
                </div>
            </form>
        </div>
    );
}

export default ProdutoModal;