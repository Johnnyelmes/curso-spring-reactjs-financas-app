import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'
import * as messages from '../../components/toastr'

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }


    componentDidMount() {
        const params = this.props.match.params
        if (params.id) {
            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true })
                }).catch(error => {
                    messages.mensagemErro(error.response.data)
                })
        }
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id };

        try {
            this.service.validar(lancamento)
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, id, usuario, status } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, id, usuario, status };

        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value })
    }

    render() {
        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        return (
            <Card title={this.state.atualizando ? "Atualização de Lançamento" : "Cadastro de Lançamentos"}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup label="Descrição: *" htmlFor="inputDesc">
                            <input type="text"
                                className="form-control"
                                id="inputDesc"
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup label="Ano: *" htmlFor="inputAno">
                            <input type="text"
                                className="form-control"
                                id="inputAno"
                                name="ano"
                                value={this.state.ano}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup label="Mês: *" htmlFor="inputMes">
                            <SelectMenu id="inputMes"
                                className="form-control"
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChange}
                                lista={meses} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup label="Valor: *" htmlFor="inputValor">
                            <input type="text"
                                className="form-control"
                                id="inputValor"
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup label="Tipo: *" htmlFor="inputTipo">
                            <SelectMenu id="inputTipo"
                                className="form-control"
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange}
                                lista={tipos} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup label="Status: *" htmlFor="inputStatus">
                            <input id="inputStatus"
                                type="text"
                                className="form-control"
                                name="status"
                                value={this.state.status}
                                disabled />
                        </FormGroup>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-6">
                        {this.state.atualizando ?
                            (
                                <button onClick={this.atualizar} type="button" className="btn btn-success">Atualizar</button>
                            ) : (
                                <button onClick={this.submit} type="button" className="btn btn-success">Salvar</button>
                            )
                        }
                        <button onClick={e => this.props.history.push('/consulta-lancamentos')} type="button" className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(CadastroLancamentos)