import React from 'react'

import axios from 'axios'

class Home extends React.Component {

    state = {
        saldo : 0,
        nomeUsuario: null
    }

    componentDidMount(){
        const usuarioLogadoFromLocalStorage = localStorage.getItem('_usuario_logado')
        const usuarioLogado = JSON.parse(usuarioLogadoFromLocalStorage)

        const url = `http://localhost:8080/api/usuarios/${usuarioLogado.id}/saldo`

        console.log(usuarioLogado)
        console.log(url)
        axios.get(url)
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
                <a className="btn btn-primary btn-lg" href="#/cadastro-usuarios" role="button"><i className="fa fa-users"></i>  Cadastrar Usuário</a>
                <a className="btn btn-danger btn-lg" href="https://bootswatch.com/flatly/#" role="button"><i className="fa fa-users"></i>  Cadastrar Lançamento</a>
                </p>
            </div>
        )
    }

   
}

export default Home