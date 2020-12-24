import React from 'react'

import {Route, Switch, HashRouter, Redirect} from 'react-router-dom'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuarios'
import Home from '../views/home'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastroLancamntos from '../views/lancamentos/cadastro-lancamentos'
import AuthService from '../app/service/authService'


function RotaAutenticada({component: Component, ...props}) {
    return(
        <Route {...props} render={(componentProps) => {
            if(AuthService.isUsuarioAutenticado()){
                return(
                    <Component {...componentProps}/>
                )
            }else{
                return(
                    <Redirect to={{pathname: '/login', state:{from: componentProps.location}}}/>
                )
            }
        }}/>
    )
}

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}/>
                <RotaAutenticada path="/home" component={Home}/>
                <RotaAutenticada path="/consulta-lancamentos" component={ConsultaLancamentos}/>
                <RotaAutenticada path="/cadastro-lancamentos/:id?" component={CadastroLancamntos}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas