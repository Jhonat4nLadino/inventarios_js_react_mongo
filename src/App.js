//Los componentes se crea con Mayuscula inicial y no es más que una función de JS conalgunas propiedades que lo hacen unico como imprimir código HTML

// Se importa react en la cabecera
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import { Header } from './components/ui/Header';
import { InventarioView } from "./components/inventarios/InventarioView";
import { UsuarioView } from "./components/usuarios/UsuarioView";
import { MarcaView } from "./components/marcas/MarcaView";
import { EstadoView } from "./components/estados/EstadoView";
import { TipoView } from "./components/tipos/TipoView";
import { InventarioUpdate } from "./components/inventarios/InventarioUpdate";

//1. Se define el compartamiento de nuestro componente
//1.1 Se puede imprimir directamente desde nuestro componente
const App = () => {

    //Con las propiedades podremos obtener el valor desde nuestro componente padre index
    return <Router>
        <Header />
        <Switch>
            <Route exact path="/" component={InventarioView} />
            <Route exact path="/usuarios" component={UsuarioView} />
            <Route exact path="/marcas" component={MarcaView} />
            <Route exact path="/estados" component={EstadoView} />
            <Route exact path="/tipos" component={TipoView} />
            <Route exact path="/inventario/edit/:inventarioId" component={InventarioUpdate} />
            <Redirect to='/' />
        </Switch>
    </Router>;
}

//2. Exporto mi componente para invocarlos a nuestro inicio "index"
export {
    App,
}