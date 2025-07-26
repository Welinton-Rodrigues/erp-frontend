import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProdutosPage from './pages/ProdutosPage';
import MainLayout from './components/MainLayout'; // 1. Importamos o Layout

function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Rotas Privadas que usam o MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/produtos" element={<ProdutosPage />} />
        {/* Adicione aqui as futuras rotas de Clientes, Fornecedores, etc. */}
        {/* <Route path="/clientes" element={<ClientesPage />} /> */}
      </Route>
    </Routes>
  )
}

export default App