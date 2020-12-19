import React from 'react'
import {withRouter} from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'


import LancamentoService from '../../app/service/lancamentoService'

import * as messages from '../../components/toastr'

import LocalStorageService from '../../app/service/localStorageService';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


class ConsultaLancamentos extends React.Component{

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    buscar = () =>{
        if(!this.state.ano){
            messages.showErrorMessage('O campo Ano deve ser preenchido!')
            return;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id,
        }
        

        this.service
            .consultar(lancamentoFiltro)
            .then(resposta => {
                this.setState({lancamentos: resposta.data})
            }).catch(error => {
                messages.showErrorMessage(error)
            })
    }
    
    abrirConfirmacaoDeDelecao = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento})
    }
    
    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}})
    }
    editar = (id) => {
        console.log('editando o lancamento ', id)
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
        .then(response => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(this.state.lancamentoDeletar);
            lancamentos.splice(index, 1);
            this.setState({lancamentos: lancamentos, showConfirmDialog: false});

            messages.showSuccessMessage('Lançamento deletado com sucesso!')
        }).catch(erro => {
            messages.showErrorMessage('Ocorreu um erro ao deletar o lançamento')
        })
    }


    render(){

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Não" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        return (
            
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputAno"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ano: e.target.value})}
                                    placeholder="Digite o Ano"/>
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu id="inputMes"
                                        className="form-control"
                                        value={this.state.mes}
                                        onChange={e => this.setState({mes: e.target.value})}
                                        lista={meses}/>
                            </FormGroup>
                            <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputDescricao"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({descricao: e.target.value})}
                                    placeholder="Digite a descrição"/>
                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" label="Tipo: ">
                                <SelectMenu id="inputTipo"
                                    className="form-control"
                                    value={this.state.tipo}
                                    onChange={e => this.setState({tipo: e.target.value})}
                                    lista={tipos}/>
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-info">Buscar</button>
                            <button type="button" className="btn btn-warning">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable
                                deleteAction={this.abrirConfirmacaoDeDelecao}
                                editAction={this.editar}
                                lancamentos={this.state.lancamentos}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Atenção"
                            visible={this.state.showConfirmDialog}
                            style={{ width: '50vw' }}
                            footer={confirmDialogFooter}
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        O lançamento será excluído, deseja continuar?
                    </Dialog>
                </div>

            </Card>


        )
    }

}

export default withRouter(ConsultaLancamentos)