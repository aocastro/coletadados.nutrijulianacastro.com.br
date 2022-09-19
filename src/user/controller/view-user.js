$(document).ready(function() {

    $('#table-user').on('click', 'button.btn-view', function(e) {

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
            url: 'src/user/model/view-user',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/user/view/form-user', function() {
                        $('#NAME').val(dado.dados.NAME)
                        $('#NAME').attr('readonly', 'true')
                        $('#LOGIN').val(dado.dados.LOGIN)
                        $('#LOGIN').attr('readonly', 'true')
                        $('#PASS').val(dado.dados.PASS)
                        $('#PASS').attr('readonly', 'true')
                        let INSTITUTION = dado.dados.INSTITUICAO_ID
                        $('#INSTITUICAO_ID').empty()
                        $.ajax({
                            type: 'POST',
                            dataType: 'JSON',
                            assync: true,
                            url: 'src/institution/model/all-institution',
                            success: function(dados) {
                                for (const dado of dados) {
                                    if (dado.ID == INSTITUTION)
                                        $('#INSTITUICAO_ID').append(`<option value="${dado.ID}" selected disabled>${dado.NOME}</option>`)
                                }
                            }
                        })
                        $('#TYPE').empty()
                        if (dado.dados.TYPE == '1') {
                            $('#TYPE').append(`<option value="1">Administrador</option>`)
                        } else {
                            $('#TYPE').append(`<option value="2">Recenseador</option>`)
                        }
                        $('#TYPE').attr('readonly', 'true')
                    })
                    $('.btn-save').hide()
                    $('#modal-user').modal('show')
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