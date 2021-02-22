<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">

    <!-- SELECT2 CSS -->
    <link href="/wdg_relatorio_sps/resources/js/libs/select2/select2.min.css" rel="stylesheet">
    <link href="/wdg_relatorio_sps/resources/js/libs/select2/select2-bootstrap.css" rel="stylesheet">

    <!-- KENDO CSS -->
    <link href="/wdg_relatorio_sps/resources/js/libs/kendo/kendo.common-material.min.css" rel="stylesheet">
    <link href="/wdg_relatorio_sps/resources/js/libs/kendo/kendo.material.min.css" rel="stylesheet">
    <link href="/wdg_relatorio_sps/resources/js/libs/kendo/kendo.material.mobile.min.css" rel="stylesheet">
    <link href="/wdg_relatorio_sps/resources/js/libs/kendo/kendo.rtl.min.css" rel="stylesheet">

    <!-- KENDO JS -->
    <script type="text/javascript" src="/wdg_relatorio_sps/resources/js/libs/kendo/zip.min.js"></script>
    <script type="text/javascript" src="/wdg_relatorio_sps/resources/js/libs/kendo/kendo.all.min.js"></script>
    <script type="text/javascript" src="/wdg_relatorio_sps/resources/js/libs/kendo/kendo.culture.pt-BR.min.js"></script>
    <script type="text/javascript" src="/wdg_relatorio_sps/resources/js/libs/kendo/kendo.grid.min.js"></script>
    <script type="text/javascript" src="/wdg_relatorio_sps/resources/js/libs/kendo/kendo.messages.pt-BR.min.js"></script>

    <!-- SELECT2 JS -->
    <script type="text/javascript" src="/wdg_relatorio_sps/resources/js/libs/select2/select2.min.js"></script>

    <!-- SCRIPTS -->
    <script src="/wdg_relatorio_sps/resources/js/services/fluigServices.js"></script>
    <script src="/wdg_relatorio_sps/resources/js/services/protheusServices.js"></script>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 style="margin: 0.2em 0; font-weight: bold;">Relatório de Solicitação de Pagamento de Serviço</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-12">
					<h3>Filtros</h3>
					<hr style="margin: 0.5em 0;">
				</div>
            </div>
            <div class="row"> 
                <div class="form-group col-md-3">
                    <label for="atividades">Atividades</label>
                    <select class="form-control validate-change" id="atividades" name="atividades" multiple>                        
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <label for="contrato">Contrato</label>
                    <input type="text" class="form-control validate-key-up" id="contrato" name="contrato">
                </div>  
                <div class="form-group col-md-3">
                    <label for="fornecedor">Fornecedor</label>
                    <select class="form-control validate-change" id="fornecedor" name="fornecedor">                        
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <label>Data de encerramento:</label>
                    <div class="input-group">
                        <input type="text" class="form-control validate-change" id="dataVencimento" name="dataVencimento"/>
                        <input type="hidden" id="ordenacaoDtVencimento" class="form-control">
                        <div class="input-group-btn">
                            <button type="button" onclick="verificaSelecionadoData(document.querySelector('#ordenacaoDtVencimento').value)" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><i class="fluigicon fluigicon-filter"></i></button>
                            <ul class="dropdown-menu dropdown-menu-right" role="menu">
                                <li class="li-hover" onclick="document.querySelector('#ordenacaoDtVencimento').value = '>'">Maior</li>
                                <li class="li-hover" onclick="document.querySelector('#ordenacaoDtVencimento').value = '<'">Menor</li>
                                <li class="li-hover" onclick="document.querySelector('#ordenacaoDtVencimento').value = '='">Igual</li>
                            </ul>
                        </div>
                    </div>
                </div>                                  
            </div>
            <div class="row">
                <div class="form-group col-md-3">
                    <label for="aprovador">Aprovador</label>
                    <select class="form-control validate-change" id="aprovador" name="aprovador" multiple>                        
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <label for="solicitante">Solicitante</label>
                    <select class="form-control validate-change" id="solicitante" name="solicitante">                        
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <label for="numeroNota">Numero da NF</label>
                    <input type="text" class="form-control validate-key-up" id="numeroNota" name="numeroNota">
                </div>
                <div class="form-group col-md-3">
                    <label for="numeroSolicitacao">Numero da Solicitação</label>
                    <input type="text" class="form-control validate-key-up" id="numeroSolicitacao" name="numeroSolicitacao">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-3">
                    <label for="centroCusto">Centro de Custo</label>
                    <select class="form-control validate-change" id="centroCusto" name="centroCusto">
                        <option value=""></option>
                    </select>
                </div>                
            </div>
            <div class="row">
                <label style="padding: 15px;">Status: </label>
                <label class="checkbox-inline">
                    <input type="checkbox" class="validate-change" name="abertas" id="abertas" value="0" checked>Abertas
                </label>
                <label class="checkbox-inline">
                    <input type="checkbox" class="validate-change" name="finalizadas" id="finalizadas" value="2" checked>Finalizadas
                </label>
                <label class="checkbox-inline">
                    <input type="checkbox" class="validate-change" name="canceladas" id="canceladas" value="1">Canceladas
                </label>
            </div>
            <div class="row">
				<div class="col-md-2">
					<button name="botaoFiltrar" class="btn btn-primary" id="botaoFiltrar" data-filtrar>Filtrar</button>
				</div>
			</div>
        </div>
    </div>

    <div style="width:100%" class="container-fluid">
		<div class="row">
			<div style="font-size:10px;" id="grid"></div>
		</div>
    </div>
    
    <script type="x/kendo-template" id="page-template">
		<div class="page-template">
			<div class="header">
			<div style="float: right">Page #: pageNum # of #: totalPages #</div>
			Multi-page grid with automatic page breaking
			</div>
			<div class="footer">
			Page #: pageNum # of #: totalPages #
			</div>
		</div>
	</script>
</div>

