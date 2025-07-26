import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import './MainLayout.css';

function MainLayout(){
    return(
        <div className="main-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo">MEU ERP</div>
                </div>
                <nav className="sidebar-nav">
                <NavLink to = "/dashboard" className= "nav-link">Relatórios</NavLink>
                <NavLink to = "/clientes" className= "nav-link">Clientes</NavLink>
                <NavLink to = "/produtos" className= "nav-link">Produtos</NavLink>
                <NavLink to = "/fornecedores" className= "nav-link">fornecedores</NavLink>
                <NavLink to = "/vendas" className= "nav-link">Vendas</NavLink>
                <NavLink to = "/compras" className= "nav-link">Compras</NavLink>
</nav>
            </aside>
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}// Importando o CSS para estilização
export default MainLayout;