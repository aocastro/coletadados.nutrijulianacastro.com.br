function avaliation(child) {

    let ID = `ID=${child}`

    $.ajax({
        type: 'POST',
        dataType: 'json',
        assync: true,
        data: ID,
        url: 'src/census/model/view-census',
        success: function(dado) {
            if (dado.tipo == "success") {
                if (dado.dados.AVALIACAO == null) {
                    $('#avaliation' + child).append('Sem avaliação')
                } else {
                    $('#avaliation' + child).append(dado.dados.AVALIACAO)
                }
            } else {
                Swal.fire({ // Inicialização do SweetAlert
                    title: 'Gerenciador Etec Cafelândia', // Título da janela SweetAler
                    text: dado.mensagem, // Mensagem retornada do microserviço
                    type: dado.tipo, // Tipo de retorno [success, info ou error]
                    confirmButtonText: 'OK'
                })
            }
        }
    })
}

$(document).ready(function() {

    $('.btn-child').click(function() {

        let dados = `LOCAL_ID=${$(this).attr('id')}`

        localStorage.setItem('local', dados)

        $('#principal').empty()

        $('#principal').load('children')

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/child/model/select-child',
            success: function(dados) {
                for (const dado of dados) {
                    let SEXO
                    if (dado.SEXO == 'Male') {
                        SEXO = 'Masculino'
                    } else {
                        SEXO = 'Feminino'
                    }

                    $('#child').append(`
                    <div class="card p-2 shadow mt-3">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-2 col-sm-1 col-md-1">
                                    <h1><i class="fa-solid fa-child-reaching"></i></h1>
                                </div>
                                <div class="col-10 col-sm-9 col-md-9">
                                    <strong>Nome:</strong> ${dado.NAME} <br>
                                    <strong>Nascimento: </strong> ${dado.NASCIMENTO} | <strong>${SEXO}</strong> <br>
                                    <strong>Última avaliação: </strong> <span id="avaliation${dado.ID}"></span>
                                </div>
                                <div class="col-12 col-sm-2 col-md-2">
                                    <button id="${dado.ID}" class="btn btn-primary btn-block d-none d-md-block d-dm-block btn-submit">
                                            <h1><i class="fa-solid fa-play"></i></h1>
                                    </button>
                                    <button id="${dado.ID}" class="btn btn-primary btn-block btn-sm d-block d-md-none d-sm-none btn-submit">
                                        <i class="fa-solid fa-play"></i> Selecionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `)
                    avaliation(dado.ID)
                }
                $('body').append(`<script src="src/child/controller/submit-child.js"></script>`)
            }
        })
    })
})