import React from 'react'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localStorageService'

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
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

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
        <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4"/>
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                <a className="btn btn-primary btn-lg" href="#/cadastro-usuarios" role="button"><i className="fa fa-users"></i><i className="pi pi-plus"/>  Cadastrar Usuário</a>
                <a className="btn btn-danger btn-lg" href="#/cadastro-lancamentos" role="button"><i className="fa fa-users"></i><i className="pi pi-plus"/>  Cadastrar Lançamento</a>
                </p>
            </div>
        )
    }

   
}

export default Home