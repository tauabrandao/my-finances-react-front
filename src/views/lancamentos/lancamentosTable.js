import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.lancamentos.map((lancamento, index) => {
        return (
            <tr key={index}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormatter.format(lancamento.valor, { locale: 'pt-BR' })}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button disabled={lancamento.status !== 'PENDENTE'} title="Efetivar" type="button" className="btn btn-success" onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}><i className="pi pi-check"/></button>
                    <button disabled={lancamento.status !== 'PENDENTE'} title="Cancelar" type="button" className="btn btn-warning" onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}><i className="pi pi-times"/></button>
                    <button title="Editar" type="button" className="btn btn-primary" onClick={e => props.editAction(lancamento.id)}><i className="pi pi-pencil"/></button>
                    <button title="Deletar" type="button" className="btn btn-danger" onClick={e => props.deleteAction(lancamento)}><i className="pi pi-trash"/></button>
                </td>
            </tr>
        )
    })


    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )

}