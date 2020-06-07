import React from 'react'
import NavBarItem from './navbaritem'
import AuthService from '../app/service/authService'

const deslogar = () => {
    AuthService.removerUsuarioAutenticado()
}

function Navbar() {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <a href="https://bootswatch.com/" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavBarItem href="#/home" label="Home"/>
                        <NavBarItem href="#/cadastro-usuarios" label="Usuários"/>
                        <NavBarItem href="#/consulta-lancamentos" label="Lançamentos"/>
                        <NavBarItem onClick={deslogar} href="#/login" label="Sair"/>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Navbar