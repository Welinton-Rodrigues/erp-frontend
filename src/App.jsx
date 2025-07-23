import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      {/* Se o usuário tentar acessar a raiz, redireciona para /login */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Define que a URL /login renderiza o componente LoginPage */}
      <Route path="/login" element={<LoginPage />} />

      {/* Define que a URL /dashboard renderiza o componente DashboardPage */}
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App