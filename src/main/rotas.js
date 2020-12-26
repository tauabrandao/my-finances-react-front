import React from 'react'

import {Route, Switch, HashRouter, Redirect} from 'react-router-dom'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuarios'
import Home from '../views/home'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastroLancamntos from '../views/lancamentos/cadastro-lancamentos'
import {AuthConsumer} from '../main/provedorDeAutenticacao'

function RotaAutenticada({component: Component, isUsuarioAutenticado, ...props}) {
    return(
        <Route {...props} render={(componentProps) => {
            if(isUsuarioAutenticado){
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

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <Route exact path="/"><Redirect to="/login"/></Route>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamntos}/>
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {
            (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}/>)
        }
    </AuthConsumer>
)