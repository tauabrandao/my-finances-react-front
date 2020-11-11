import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    login = () => {
        console.log('Email', this.state.email)
        console.log('Senha', this.state.senha)
    }

    render() {
        return (
            <div className="container" id="login">
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
                                                    onChange={e => this.setState({email: e.target.value})}
                                                    type="email"
                                                    className="form-control"
                                                    id="inputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email"/>
                                                </FormGroup>
                                                <FormGroup htmlFor="inputPassword" label="Password">
                                                    <input
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({senha: e.target.value})}
                                                    type="password"
                                                    className="form-control"
                                                    id="inputPassword"
                                                    placeholder="Password"/>
                                                </FormGroup>
                                                <button onClick={this.login} className="btn btn-primary">Entrar</button>
                                                <button className="btn btn-info">Cadastrar</button>
                                            </fieldset>
                                        </div>
                                        </div>
                                    </div>
                            </Card>
                        </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Login