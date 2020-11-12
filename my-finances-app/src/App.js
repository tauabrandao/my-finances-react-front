import React from 'react'

import Login from './views/login'
import CadastroUsuario from './views/cadastroUsuarios'

import 'bootswatch/dist/cosmo/bootstrap.css'
import './custom.css'

class App extends React.Component {
  render() {
    return (
      <div>
        <CadastroUsuario/>
      </div>
    )
  }
}

export default App;
