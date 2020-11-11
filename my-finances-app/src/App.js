import React from 'react'
import './App.css';

class App extends React.Component {

  state = {
    nome: null,
    numero1: null,
    numero2: null,
    resultado: null
  }

  somar = () => {
    const result = parseInt(this.state.numero1) + parseInt(this.state.numero2)
    this.setState({ resultado: result })
  }

  render() {
    return (
      <>
        <div className="App">
          <label>Nome: </label>
          <input type="text" value={this.state.nome}
            onChange={(e) => this.setState({ nome: e.target.value })} />
          Hello {this.state.nome}!
        </div>
        <div>
          <label>Numero 1:</label>
          <input type="text" value={this.state.numero1}
            onChange={(e) => this.setState({ numero1: e.target.value })} />
          <br />

          <label>Numero 2:</label>
          <input type="text" value={this.state.numero2}
            onChange={(e) => this.setState({ numero2: e.target.value })} />
          <br />

          <button onClick={this.somar}>Somar</button>
          <br />
          A soma dos números é {this.state.resultado}
        </div>

      </>
    )
  }

}

export default App;
