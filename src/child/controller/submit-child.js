$(document).ready(function() {

    $('.btn-submit').click(function() {

        let dados = `ID=${$(this).attr('id')}`

        $('#principal').empty()

        $('#principal').load('submit')

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/child/model/view-child',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('#NAME').val(dado.dados.NAME)
                    $('#NASCIMENTO').val(dado.dados.NASCIMENTO)
                    $('#SEXO').empty()
                    if (dado.dados.SEXO == 'Male') {
                        $('#SEXO').val('Masculino')
                    } else {
                        $('#SEXO').val('Femino')
                    }

                    if (dado.dados.PREMATURO === 'true') {
                        $('#TRUE').attr('checked', 'true')
                        $('#IDADE_GEST').val(dado.dados.IDADE_GEST)
                        $('#idade').show()
                    }

                    $('#CHILD_ID').val(dado.dados.ID)
                } else {
                    Swal.fire({ // Inicialização do SweetAlert
                        title: 'Gerenciador Etec Cafelândia', // Título da janela SweetAler
                        text: dado.mensagem, // Mensagem retornada do microserviço
                        type: dado.tipo, // Tipo de retorno [success, info ou error]
                        confirmButtonText: 'OK'
                    })
                }
                // $('body').append(`<script src="src/child/controller/submit-child.js"></script>`)
            }
        })
    })
})