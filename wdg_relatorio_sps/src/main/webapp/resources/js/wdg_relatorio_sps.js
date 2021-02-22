var MyWidget = SuperWidget.extend({
  urlServicos: "https://api.com.br",

  Authorization: "Basic Authorization",

  //método iniciado quando a widget é carregada
  init: function () {
    that = this;
    FLUIGC.calendar("#dataVencimento", {
      dateFormat: "dd/mm/yyyy",
    });
    kendo.culture("pt-BR");
    this.loadSelects();
    this.loadWidgetPreferences();
    // $("#botaoFiltrar").attr("disabled", true);
    $(".validate-key-up").keyup((event) => {
      var isFiltersValid = that.validateFilters();
      if (isFiltersValid) {
        $("#botaoFiltrar").attr("disabled", false);
      } else {
        $("#botaoFiltrar").attr("disabled", true);
      }
    });
    $(".validate-change").change((event) => {
      var isFiltersValid = that.validateFilters();
      if (isFiltersValid) {
        $("#botaoFiltrar").attr("disabled", false);
      } else {
        $("#botaoFiltrar").attr("disabled", true);
      }
    });
  },

  loadWidgetPreferences: async function () {
    try {
      FLUIGC.loading(window).show();
      const preferences = await fluigServices.getWidgetPreferences("2422");
      if (!preferences.content.hasOwnProperty("usersFilters")) {
        return;
      }
      const usersFilters = JSON.parse(preferences.content.usersFilters);
      const userFilter = usersFilters.find((x) => x.user == WCMAPI.userCode);
      if (!userFilter) {
        return;
      }
      $("#atividades").val(userFilter.filters.atividades);
      $("#contrato").val(userFilter.filters.contrato);
      $("#fornecedor").val(userFilter.filters.fornecedor);
      $("#dataVencimento").val(userFilter.filters.dataVencimento);
      $("#ordenacaoDtVencimento").val(userFilter.filters.ordenacaoDtVencimento);
      $("#aprovador").val(userFilter.filters.aprovador);
      $("#solicitante").val(userFilter.filters.solicitante);
      $("#numeroNota").val(userFilter.filters.numeroNota);
      $("#numeroSolicitacao").val(userFilter.filters.numeroSolicitacao);
      $("#centroCusto").val(userFilter.filters.centroCusto);
      $("#abertas").attr("checkd", userFilter.filters.abertas ? true : false);
      $("#finalizadas:checked").attr("checkd", userFilter.filters.finalizadas ? true : false);
      $("#canceladas:checked").attr("checkd", userFilter.filters.canceladas ? true : false);
    } catch (error) {
      console.error(error);
    } finally {
      FLUIGC.loading(window).hide();
    }
  },

  validateFilters: function () {
    const atividades = $("#atividades").val();
    const contrato = $("#contrato").val();
    const fornecedor = $("#fornecedor").val();
    const dataVencimento = $("#dataVencimento").val();
    const aprovador = $("#aprovador").val();
    const solicitante = $("#solicitante").val();
    const numeroNota = $("#numeroNota").val();
    const numeroSolicitacao = $("#numeroSolicitacao").val();
    const centroCusto = $("#centroCusto").val();
    const abertas = $("#abertas:checked").val();
    const finalizadas = $("#finalizadas:checked").val();
    const canceladas = $("#canceladas:checked").val();

    if (
      (!atividades || !atividades.length) &&
      !contrato &&
      !fornecedor &&
      !dataVencimento &&
      (!aprovador || !aprovador.length) &&
      !solicitante &&
      !numeroNota &&
      !numeroSolicitacao &&
      !centroCusto &&
      !abertas &&
      !finalizadas &&
      !canceladas
    ) {
      return false;
    } else {
      return true;
    }
  },

  filtrar: function () {
    const relatorioContratints = [];
    const atividades = $("#atividades").val();
    const contrato = $("#contrato").val();
    const fornecedor = $("#fornecedor").val();
    const dataVencimento = $("#dataVencimento").val();
    const ordenacaoDtVencimento = $("#ordenacaoDtVencimento").val();
    const aprovador = $("#aprovador").val();
    const solicitante = $("#solicitante").val();
    const numeroNota = $("#numeroNota").val();
    const numeroSolicitacao = $("#numeroSolicitacao").val();
    const centroCusto = $("#centroCusto").val();
    const abertas = $("#abertas:checked").val();
    const finalizadas = $("#finalizadas:checked").val();
    const canceladas = $("#canceladas:checked").val();
    const statusArr = [];

    const userFilters = {
      user: WCMAPI.userCode,
      filters: {
        atividades,
        contrato,
        fornecedor,
        dataVencimento,
        ordenacaoDtVencimento,
        aprovador,
        solicitante,
        numeroNota,
        numeroSolicitacao,
        centroCusto,
        abertas,
        finalizadas,
      },
    };

    this.updateFilters(userFilters);

    if (abertas) {
      statusArr.push(abertas);
    }
    if (finalizadas) {
      statusArr.push(finalizadas);
    }
    if (canceladas) {
      statusArr.push(canceladas);
    }
    if (statusArr.length > 0) {
      relatorioContratints.push({
        _field: "status",
        _initialValue: JSON.stringify(statusArr),
        _finalValue: JSON.stringify(statusArr),
        _type: 0,
      });
    }

    if (atividades && atividades.length) {
      relatorioContratints.push({
        _field: "atividade",
        _initialValue: JSON.stringify(atividades),
        _finalValue: JSON.stringify(atividades),
        _type: 0,
      });
    }

    if (contrato) {
      relatorioContratints.push({
        _field: "contrato",
        _initialValue: contrato,
        _finalValue: contrato,
        _type: 0,
      });
    }

    if (fornecedor) {
      relatorioContratints.push({
        _field: "fornecedor",
        _initialValue: fornecedor,
        _finalValue: fornecedor,
        _type: 0,
      });
    }

    if (dataVencimento) {
      relatorioContratints.push({
        _field: "dataVencimento",
        _initialValue: dataVencimento,
        _finalValue: dataVencimento,
        _type: 0,
      });
    }

    if (ordenacaoDtVencimento) {
      relatorioContratints.push({
        _field: "operadorVencimento",
        _initialValue: ordenacaoDtVencimento,
        _finalValue: ordenacaoDtVencimento,
        _type: 0,
      });
    }

    if (aprovador && aprovador.length) {
      relatorioContratints.push({
        _field: "aprovador",
        _initialValue: JSON.stringify(aprovador),
        _finalValue: JSON.stringify(aprovador),
        _type: 0,
      });
    }

    if (solicitante) {
      relatorioContratints.push({
        _field: "solicitante",
        _initialValue: solicitante,
        _finalValue: solicitante,
        _type: 0,
      });
    }

    if (numeroNota) {
      relatorioContratints.push({
        _field: "numeroNf",
        _initialValue: numeroNota,
        _finalValue: numeroNota,
        _type: 0,
      });
    }

    if (numeroSolicitacao) {
      relatorioContratints.push({
        _field: "numeroSolicitacao",
        _initialValue: numeroSolicitacao,
        _finalValue: numeroSolicitacao,
        _type: 0,
      });
    }

    if (centroCusto) {
      relatorioContratints.push({
        _field: "centroCusto",
        _initialValue: centroCusto,
        _finalValue: centroCusto,
        _type: 0,
      });
    }

    if (status) {
      relatorioContratints.push({
        _field: "status",
        _initialValue: status,
        _finalValue: status,
        _type: 0,
      });
    }

    this.gerarGrid(relatorioContratints);
  },

  updateFilters: async function (userFilters) {
    const preferences = await fluigServices.getWidgetPreferences("2422");
    const filters = preferences.content.usersFilters
      ? JSON.parse(preferences.content.usersFilters)
      : [];
    let oldUserFilter = filters.find((x) => x.user == userFilters.user);
    if (oldUserFilter) {
      oldUserFilter.filters = userFilters.filters;
    } else {
      filters.push(userFilters);
    }
    WCMSpaceAPI.PageService.UPDATEPREFERENCES(
      {
        async: true,
        success: function (data) {
          console.log(data);
        },
        fail: function (xhr, message, errorData) {
          console.log(errorData);
        },
      },
      2422,
      { usersFilters: JSON.stringify(filters) }
    );
  },

  gerarGrid: async function (constraints = []) {
    if ($("#grid").data("kendoGrid") != undefined) {
      $("#grid").data("kendoGrid").destroy();
      $("#grid").empty();
    }

    FLUIGC.loading($("#grid").parent()).show();
    $("#botaoFiltrar").attr("disabled", true);
    try {
      const responseSpsData = await fluigServices.getDataset("ds_get_relatorio_sps", constraints);
      const gridData = responseSpsData.content.values;

      if (gridData.length == 0) {
        FLUIGC.toast({
          message: "Não foram encontrados registros para o filtro escolhido!",
          type: "warning",
        });
      }

      gridData.map((element) => {
        for (const prop in element) {
          if (element[prop] == "null" || element[prop] == null) {
            element[prop] = "";
          }
        }
      });

      $("#grid").kendoGrid({
        toolbar: ["excel", "pdf"],
        pdf: {
          allPages: true,
          avoidLinks: true,
          margin: { top: "1cm", left: "0.5cm", right: "0.5cm", bottom: "1cm" },
          landscape: true,
          scale: 0.3,
          template: $("#page-template").html(),
        },
        dataSource: {
          text: "pt-BR",
          data: gridData,
          schema: {
            model: {
              fields: spsKendoField,
            },
          },
          pageSize: 20,
        },
        columns: spsKendoColumns,
        excel: {
          allPages: true,
        },
        excelExport: function (e) {
          e.preventDefault();
          for (var i = 1; i < e.workbook.sheets[0].rows.length; i++) {
            //O indice da prop data deve ser -1 pois a primeira linha do sheet e o header
            const dataIndex = i - 1;
            const splitedDate = e.data[dataIndex].DT_CRIACAO.split("-");
            e.workbook.sheets[0].rows[i].cells[0].value =
              splitedDate[2] + "/" + splitedDate[1] + "/" + splitedDate[0];

            e.workbook.sheets[0].rows[i].cells[3].value = e.data[dataIndex].solicitacao;

            if (e.data[dataIndex].fornecedorDescricao.includes(" - ")) {
              e.workbook.sheets[0].rows[i].cells[4].value = e.data[
                dataIndex
              ].fornecedorDescricao.split(" - ")[1];
            } else {
              e.workbook.sheets[0].rows[i].cells[4].value = e.data[dataIndex].fornecedorDescricao;
            }

            if (e.data[dataIndex].vencimentoNF.includes("-")) {
              const splitedVencimento = e.data[dataIndex].vencimentoNF.split("-");
              e.workbook.sheets[0].rows[i].cells[9].value =
                splitedVencimento[2] + "/" + splitedVencimento[1] + "/" + splitedVencimento[0];
            } else {
              e.workbook.sheets[0].rows[i].cells[9].value = e.data[dataIndex].vencimentoNF;
            }

            e.workbook.sheets[0].rows[i].cells[11].format = "R$ #,##0.00";

            const dataInicioAtividade = moment(e.data[dataIndex].ASSIGN_START_DATE);
            const hoje = moment();
            const result = hoje.diff(dataInicioAtividade, "hours") + " horas";
            e.workbook.sheets[0].rows[i].cells[12].value = result;

            const numAtividade = e.data[dataIndex].NUM_SEQ_ESTADO;
            const foundedActivit = atividades.find((x) => x.id == numAtividade);
            e.workbook.sheets[0].rows[i].cells[13].value = foundedActivit
              ? foundedActivit.text
              : "";
          }
          kendo.saveAs({
            dataURI: new kendo.ooxml.Workbook(e.workbook).toDataURL(),
            fileName: "Relatório de Solicitações de Pagamento.xlsx",
          });
        },
        height: 550,
        groupable: true,
        sortable: true,
        resizable: true,
        columnMenu: true,
        reorderable: true,
        pageable: {
          refresh: true,
          pageSizes: true,
          buttonCount: 5,
        },
        language: "pt-BR",
        filterable: {
          extra: false,
          operators: {
            string: {
              startswith: "Começa com",
              eq: "é igual a",
              neq: "não é igual a",
              contains: "Contém",
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      FLUIGC.toast({
        message: "Erro ao carregar relatórios, entre em contato com o suporte!",
        type: "danger",
      });
    } finally {
      FLUIGC.loading($("#grid").parent()).hide();
      $("#botaoFiltrar").attr("disabled", false);
    }
  },

  loadSelects: function () {
    $("#atividades").select2({
      placeholder: "Selecione as atividades",
      allowClear: true,
      width: "100%",
      theme: "bootstrap",
      data: atividades,
    });
    // $("#status").select2({
    //     placeholder: "Selecione o status da solicitação",
    //     allowClear: true,
    //     width: "100%",
    //     theme: "bootstrap",
    //     data: [
    //         {
    //             id: "0",
    //             text: "Aberta"
    //         }, {
    //             id: "1",
    //             text: "Cancelada"
    //         }, {
    //             id: "2",
    //             text: "Finalizada"
    //         }
    //     ]
    // });
    $("#fornecedor").select2({
      allowClear: true,
      placeholder: "Selecione o fornecedor",
      theme: "bootstrap",
      language: {
        noResults: function () {
          return "Sem resultados para está busca.";
        },
        searching: function () {
          return "Buscanco...";
        },
        inputTooShort: function () {
          return "Digite pelo menos três caracteres";
        },
      },
      minimumInputLength: 3,
      ajax: {
        delay: 250,
        method: "GET",
        url: that.urlServicos + "FORNECEDORES",
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xyz) {
          xyz.setRequestHeader("Authorization", that.Authorization);
        },
        data: function (term, page) {
          var isNum = /^\d+$/;
          return {
            nome: isNum.test(term.term) ? "" : term.term,
            cnpj: isNum.test(term.term) ? term.term : "",
          };
        },
        processResults: function (data, params) {
          //var dadosFornecedores = $('#contrato').select2('data')[0].dadosFornecedores;
          return {
            results: $.map(data.fornecedores, function (obj) {
              return {
                id: obj.codigo,
                text: obj.cnpj + " - " + obj.nome,
                telefone: obj.telefone,
                loja: obj.loja,
                cnpj: obj.cnpj,
              };
            }),
          };
        },
      },
    });
    $("#aprovador").select2({
      placeholder: "Selecione um Usuário",
      allowClear: true,
      width: "100%",
      theme: "bootstrap",
      language: {
        noResults: function () {
          return "Sem resultados para está busca.";
        },
        searching: function () {
          return "Buscanco...";
        },
      },
      ajax: {
        url: "/api/public/ecm/dataset/datasets",
        method: "POST",
        contentType: "application/json",
        data: function (term) {
          var dadosConsulta = {
            name: "colleague",
            constraints: [],
          };
          if (term.term) {
            dadosConsulta.constraints.push({
              _field: "colleagueName",
              _initialValue: term.term || "",
              _finalValue: term.term || "",
              _type: 1,
              _likeSearch: true,
            });
          }
          return JSON.stringify(dadosConsulta);
        },
        processResults: function (data) {
          return {
            results: data.content.values.map((element) => {
              return {
                id: element["colleaguePK.colleagueId"],
                text: element.colleagueName,
              };
            }),
          };
        },
      },
    });
    $("#solicitante").select2({
      placeholder: "Selecione um Usuário",
      allowClear: true,
      width: "100%",
      theme: "bootstrap",
      language: {
        noResults: function () {
          return "Sem resultados para está busca.";
        },
        searching: function () {
          return "Buscanco...";
        },
      },
      ajax: {
        url: "/api/public/ecm/dataset/datasets",
        method: "POST",
        contentType: "application/json",
        data: function (term) {
          var dadosConsulta = {
            name: "colleague",
            constraints: [],
          };
          if (term.term) {
            dadosConsulta.constraints.push({
              _field: "colleagueName",
              _initialValue: term.term || "",
              _finalValue: term.term || "",
              _type: 1,
              _likeSearch: true,
            });
          }
          return JSON.stringify(dadosConsulta);
        },
        processResults: function (data) {
          return {
            results: data.content.values.map((element) => {
              return {
                id: element["colleaguePK.colleagueId"],
                text: element.colleagueName,
              };
            }),
          };
        },
      },
    });

    this.loadCentroCusto();
  },

  loadCentroCusto: async function () {
    try {
      FLUIGC.loading($("#centroCusto").parent()).show();
      const responseCentros = await protheusServices.getCentroCusto();
      const centrosSelectData = responseCentros.ccusto.map((centroCusto) => {
        return {
          id: `${centroCusto.codigo} - ${centroCusto.descricao}`,
          text: `${centroCusto.codigo} - ${centroCusto.descricao}`,
        };
      });
      $("#centroCusto").select2({
        allowClear: true,
        placeholder: "Selecione o centro de custo",
        theme: "bootstrap",
        data: centrosSelectData,
      });
    } catch (error) {
      console.error(error);
      FLUIGC.toast({
        message: "Falha ao carregar centro de custo!",
        type: "warning",
      });
    } finally {
      FLUIGC.loading($("#centroCusto").parent()).hide();
    }
  },

  //BIND de eventos
  bindings: {
    local: {
      execute: ["click_executeAction"],
      filtrar: ["click_filtrar"],
    },
    global: {},
  },

  executeAction: function (htmlElement, event) {},
});

const atividades = [
  {
    id: "2",
    text: "Contabilidade - Aprovação e classificação fiscal",
  },
  {
    id: "15",
    text: "Revisão",
  },
  {
    id: "244",
    text: "Correção da Integração - Cadastro Nota",
  },
  {
    id: "4",
    text: "Coordenador financeiro - Aprovação pagamento",
  },
  {
    id: "7",
    text: "Coordenador área - Aprovação pagamento",
  },
  {
    id: "9",
    text: "Gestor área - Aprovação pagamento",
  },
  {
    id: "194",
    text: "Comitê Executivo",
  },
  {
    id: "11",
    text: "Gestor financeiro - Aprovar saldo orçamentário",
  },
  {
    id: "12",
    text: "Superintendente - Aprovação pagamento",
  },
  {
    id: "250",
    text: "Correção da Integração - Liberação",
  },
  {
    id: "156",
    text: "Aguardando Processamento do Financeiro",
  },
];

const spsKendoField = {
  dataInclusaoSPS: { type: "string" },
  inicioNota: { type: "string" },
  numeroNF: { type: "string" },
  numeroSolicitacao: { type: "string" },
  status: { type: "string " },
  nomeFornecedor: { type: "string" },
  naturezaRateio: { type: "string" },
  ccRateio: { type: "string" },
  contratoCodigo: { type: "string" },
  filialDescricao: { type: "string" },
  vencimentoNF: { type: "string" },
  descricao: { type: "string" },
  valorNF: { type: "number" },
  ASSIGN_START_DATE: { type: "string" },
  atividade: { type: "string" },
};

const spsKendoColumns = [
  {
    field: "dataInclusaoSPS",
    width: "200px",
    title: "Data da Inclusão da SPS",
    template: (data) => {
      const splitedDate = data.DT_CRIACAO.split("-");
      return splitedDate[2] + "/" + splitedDate[1] + "/" + splitedDate[0];
    },
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
    sortable: {
      compare: function (a, b) {
        const dataA =
          new Date(moment(a.DT_CRIACAO, "YYYY-MM-DD").format("MM/DD/YYYY")) == "Invalid Date"
            ? 0
            : new Date(moment(a.DT_CRIACAO, "YYYY-MM-DD").format("MM/DD/YYYY"));
        const dataB =
          new Date(moment(b.DT_CRIACAO, "YYYY-MM-DD").format("MM/DD/YYYY")) == "Invalid Date"
            ? 0
            : new Date(moment(b.DT_CRIACAO, "YYYY-MM-DD").format("MM/DD/YYYY"));
        return dataA - dataB;
      },
    },
  },
  {
    field: "inicioNota",
    width: "200px",
    title: "Data de Emissão da Nota",
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
    sortable: {
      compare: function (a, b) {
        const dataA =
          new Date(moment(a.inicioNota, "DD/MM/YYYY").format("MM/DD/YYYY")) == "Invalid Date"
            ? 0
            : new Date(moment(a.inicioNota, "DD/MM/YYYY").format("MM/DD/YYYY"));
        const dataB =
          new Date(moment(b.inicioNota, "DD/MM/YYYY").format("MM/DD/YYYY")) == "Invalid Date"
            ? 0
            : new Date(moment(b.inicioNota, "DD/MM/YYYY").format("MM/DD/YYYY"));
        return dataA - dataB;
      },
    },
  },
  {
    field: "numeroNF",
    width: "200px",
    title: "Número da NF",
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
  },
  {
    field: "numeroSolicitacao",
    width: "200px",
    title: "Solicitação",
    template: function (data) {
      var serverURL = WCMAPI.serverURL;
      var html = `<a target="_blank" href="${serverURL}/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=${data.solicitacao}">${data.solicitacao}</a>`;
      return html;
    },
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
  },
  {
    field: "status",
    width: "200px",
    title: "Status",
    template: function (data) {
      const statusNumber = data.STATUS;
      return statusNumber == "0" ? "Aberta" : statusNumber == "1" ? "Cancelada" : "Finalizada";
    },
  },
  {
    field: "nomeFornecedor",
    width: "200px",
    title: "Fornecedor",
    template: (data) => {
      if (data.fornecedorDescricao.includes(" - ")) {
        return data.fornecedorDescricao.split(" - ")[1];
      } else {
        return data.fornecedorDescricao;
      }
    },
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
  },
  {
    field: "naturezaRateio",
    width: "200px",
    title: "Natureza Orçamentária",
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
  },
  {
    field: "ccRateio",
    width: "200px",
    title: "Centro de Custo",
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
  },
  {
    field: "contratoCodigo",
    width: "200px",
    title: "Contrato",
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
  },
  {
    field: "filialDescricao",
    width: "200px",
    title: "Filial",
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
  },
  {
    field: "vencimentoNF",
    width: "200px",
    title: "Vencimento NF",
    template: (data) => {
      if (data.vencimentoNF.includes("-")) {
        const splitedDate = data.vencimentoNF.split("-");
        return splitedDate[2] + "/" + splitedDate[1] + "/" + splitedDate[0];
      } else {
        return data.vencimentoNF;
      }
    },
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
    sortable: {
      compare: function (a, b) {
        let dataA;
        let dataB;
        if (a.vencimentoNF.includes("-")) {
          dataA =
            new Date(moment(a.vencimentoNF, "YYYY-MM-DD").format("MM/DD/YYYY")) == "Invalid Date"
              ? 0
              : new Date(moment(a.vencimentoNF, "YYYY-MM-DD").format("MM/DD/YYYY"));
        } else {
          dataA =
            new Date(moment(a.vencimentoNF, "DD/MM/YYYY").format("MM/DD/YYYY")) == "Invalid Date"
              ? 0
              : new Date(moment(a.vencimentoNF, "DD/MM/YYYY").format("MM/DD/YYYY"));
        }
        if (b.vencimentoNF.includes("-")) {
          dataB =
            new Date(moment(b.vencimentoNF, "YYYY-MM-DD").format("MM/DD/YYYY")) == "Invalid Date"
              ? 0
              : new Date(moment(b.vencimentoNF, "YYYY-MM-DD").format("MM/DD/YYYY"));
        } else {
          dataB =
            new Date(moment(b.vencimentoNF, "DD/MM/YYYY").format("MM/DD/YYYY")) == "Invalid Date"
              ? 0
              : new Date(moment(b.vencimentoNF, "DD/MM/YYYY").format("MM/DD/YYYY"));
        }
        return dataA - dataB;
      },
    },
  },
  {
    field: "descricao",
    width: "200px",
    title: "Descrição NF",
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
  },
  {
    field: "valorNF",
    width: "200px",
    title: "Valor NF",
    format: "{0:c2}",
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
  },
  {
    field: "ASSIGN_START_DATE",
    width: "200px",
    title: "Tempo na Atividade",
    template: function (e) {
      var data1 = moment(e.ASSIGN_START_DATE);
      var hoje = moment();
      var html = hoje.diff(data1, "hours") + " horas";
      return html;
    },
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
  },
  {
    field: "atividade",
    width: "200px",
    title: "Atividade",
    template: (data) => {
      const numAtividade = data.NUM_SEQ_ESTADO;
      const foundedActivit = atividades.find((x) => x.id == numAtividade);
      return foundedActivit ? foundedActivit.text : "";
    },
    filterable: {
      cell: {
        operator: "contains",
        suggestionOperator: "contains",
      },
    },
  },
];

function verificaSelecionadoData(e) {
  var selecionado = e;
  if (selecionado == ">") {
    $(".li-hover:nth-child(2)").removeClass("selecionado");
    $(".li-hover:last-child").removeClass("selecionado");
    $(".li-hover:first-child").addClass("selecionado");
  } else if (selecionado == "<") {
    $(".li-hover:first-child").removeClass("selecionado");
    $(".li-hover:last-child").removeClass("selecionado");
    $(".li-hover:nth-child(2)").addClass("selecionado");
  } else if (selecionado == "=") {
    $(".li-hover:first-child").removeClass("selecionado");
    $(".li-hover:nth-child(2)").removeClass("selecionado");
    $(".li-hover:last-child").addClass("selecionado");
  }
}
