import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'

import UsuarioService from '../app/service/usuarioService'
import { showErrorMessage, showSuccessMessage } from '../components/toastr'

class CadastroUsuario extends React.Component {

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }


    cadastrar = () => {

        const { nome, email, senha, senhaRepeticao } = this.state
        const usuario = { nome, email, senha, senhaRepeticao }

        try{
            this.service.validar(usuario);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => showErrorMessage(msg));
            return;
        }

        this.service.salvar(usuario)
            .then(response => {
                showSuccessMessage('Usuário cadastrado com sucesso! Faça login para acessar.')
                this.props.history.push('/login')
            }).catch(error => {
                showErrorMessage(error.response.data)
            })
    }

    prepareLogin = () => {
        this.props.history.push('/login')
    }

    render() {
        return (

            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text"
                                    className="form-control"
                                    id="inputNome"
                                    name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email"
                                    id="inputEmail"
                                    name="email"
                                    className="form-control"
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                    id="inputSenha"
                                    name="senha"
                                    className="form-control"
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                <input type="password"
                                    id="inputRepitaSenha"
                                    name="senha"
                                    className="form-control"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </FormGroup>
                            <button onClick={this.cadastrar} type="button" className="btn btn-info"><i className="pi pi-save"/> Salvar</button>
                            <button onClick={this.prepareLogin} type="button" className="btn btn-danger"><i className="pi pi-times"/> Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>

        )
    }
}

export default withRouter(CadastroUsuario)