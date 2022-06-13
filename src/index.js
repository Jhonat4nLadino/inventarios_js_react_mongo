import React from 'react';//Importación de React
import ReactDOM from 'react-dom/client'; //Renderiza los componentes de la página
import { App } from './App'; //3. Importo mis componentes desde la ruta indicada
import './index.css';//Estilos propios

//Renderiza la información de todos los componentes de una unica página con el id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

//4. Renderizo mis componentes con las etiquetas < Nombre_de_mi_componente />
root.render(<App />);