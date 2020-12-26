import React from 'react'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localStorageService'
import currencyFormatter from 'currency-formatter'
import {AuthContext} from '../main/provedorDeAutenticacao'


class Home extends React.Component {

    constructor(){
        super()
        this.usuarioService = new UsuarioService();
    }

    state = {
        saldo : 0,
        nomeUsuario: null
    }

    componentDidMount(){
        const usuarioLogado = this.context.usuarioAutenticado

        this.usuarioService.obterSaldoPorUsuario(usuarioLogado.id)
        .then(response => {
            this.setState({saldo: response.data})
            this.setState({nomeUsuario: usuarioLogado.nome})
        }).catch(erro => {
            console.error(erro.response)
        })
    }

    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo {this.state.nomeUsuario}!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
        <p className="lead">Seu saldo para o mês atual é de R$ {currencyFormatter.format(this.state.saldo, { locale: 'pt-BR' })}</p>
                <hr className="my-4"/>
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                <a className="btn btn-primary btn-lg" href="#/cadastro-usuarios" role="button"><i className="fa fa-users"></i><i className="pi pi-users"/>  Cadastrar Usuário</a>
                <a className="btn btn-danger btn-lg" href="#/cadastro-lancamentos" role="button"><i className="fa fa-users"></i><i className="pi pi-money-bill"/>  Cadastrar Lançamento</a>
                </p>
            </div>
        )
    }

   
}

Home.contextType = AuthContext;

export default Home