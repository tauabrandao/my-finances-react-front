import React from 'react'

import {Route, Switch, HashRouter} from 'react-router-dom'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuarios'
import Home from '../views/home'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastroLancamntos from '../views/lancamentos/cadastro-lancamentos'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}/>
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos}/>
                <Route path="/cadastro-lancamentos/:id?" component={CadastroLancamntos}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas