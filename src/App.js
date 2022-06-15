//Los componentes se crea con Mayuscula inicial y no es más que una función de JS conalgunas propiedades que lo hacen unico como imprimir código HTML

// Se importa react en la cabecera
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Header } from './components/ui/Header';
import { EstadoView } from "./components/estados/EstadoView";
import { InventarioView } from "./components/inventarios/InventarioView";
import { MarcaView } from "./components/marcas/MarcaView";
import { TipoView } from "./components/tipos/TipoView";
import { UsuarioView } from "./components/usuarios/UsuarioView";
import { EstadoUpdate } from "./components/estados/EstadoUpdate";
import { InventarioUpdate } from "./components/inventarios/InventarioUpdate";
import { MarcaUpdate } from "./components/marcas/MarcaUpdate";
import { TipoUpdate } from "./components/tipos/TipoUpdate";
import { UsuarioUpdate } from "./components/usuarios/UsuarioUpdate";


//1. Se define el compartamiento de nuestro componente
//1.1 Se puede imprimir directamente desde nuestro componente
const App = () => {

    //Con las propiedades podremos obtener el valor desde nuestro componente padre index
    return <Router>
        <Header />
        <Switch>
            <Route exact path="/estados" component={EstadoView} />
            <Route exact path="/" component={InventarioView} />
            <Route exact path="/marcas" component={MarcaView} />
            <Route exact path="/tipos" component={TipoView} />
            <Route exact path="/usuarios" component={UsuarioView} />
            <Route exact path="/estado-equipo/edit/:estadoId" component={EstadoUpdate} />
            <Route exact path="/inventario/edit/:inventarioId" component={InventarioUpdate} />
            <Route exact path="/marca/edit/:marcaId" component={MarcaUpdate} />
            <Route exact path="/usuario/edit/:usuarioId" component={UsuarioUpdate} />
            <Route exact path="/tipo-equipo/edit/:tipoId" component={TipoUpdate} />
            <Redirect to='/' />
        </Switch>
    </Router>;
}

//2. Exporto mi componente para invocarlos a nuestro inicio "index"
export {
    App,
}