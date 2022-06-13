// Componetes de todas la vistas de navegacion en la cabecera
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" to="#">Shop</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact aria-current="page" to="/">Activos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact aria-current="page" to="/usuarios">Usuarios</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact aria-current="page" to="/marcas">Marcas</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact aria-current="page" to="/estados">Estados</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact aria-current="page" to="/tipos">Tipos</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>;
}

export {
    Header,
}
