import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import DangerAlert from '../components/dangerAlert'
import LocalStorageService from '../app/service/localStorageService'

import UsuarioService from '../app/service/usuarioService'

import { withRouter } from 'react-router-dom'

class Login extends React.Component {

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }

    login = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            LocalStorageService.adicionarItem('_usuario_logado', response.data)
            this.props.history.push('/home')
        }).catch(erro => {
            this.setState({mensagemErro: erro.response.data})
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup htmlFor="inputEmail" label="Email: *">
                                                <input
                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                    type="email"
                                                    className="form-control"
                                                    id="inputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup htmlFor="inputPassword" label="Password">
                                                <input
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({ senha: e.target.value })}
                                                    type="password"
                                                    className="form-control"
                                                    id="inputPassword"
                                                    placeholder="Password" />
                                            </FormGroup>
                                            <button onClick={this.login} className="btn btn-primary">Entrar</button>
                                            <button onClick={this.prepareCadastrar} className="btn btn-info">Cadastrar</button>
                                        </fieldset>
                                        <DangerAlert>{this.state.mensagemErro}</DangerAlert>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)