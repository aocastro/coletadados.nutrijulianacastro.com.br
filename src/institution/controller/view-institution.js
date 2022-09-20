$(document).ready(function() {

    $('#table-institution').on('click', 'button.btn-view', function(e) {

        e.preventDefault()

        // Alterar as informações do modal para apresentação dos dados

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Visualização de registro')

        let ID = `ID=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: ID,
            url: 'src/institution/model/view-institution',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/institution/view/form-institution', function() {
                        $('#NOME').val(dado.dados.NOME)
                        $('#NOME').attr('readonly', 'true')
                        $('#ARQUIVO').hide()
                        $('#view-image').append(`<img class="img-fluid" src="src/institution/files/${dado.dados.LOGO}"/>`)

                    })
                    $('.btn-save').hide()
                    $('#modal-institution').modal('show')
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

    })
})