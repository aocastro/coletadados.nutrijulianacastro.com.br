$(document).ready(function() {

    $('#table-user').on('click', 'button.btn-edit', function(e) {

        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Edição de registro')

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
                        $('#LOGIN').val(dado.dados.LOGIN)
                        $('#PASS').val(dado.dados.PASS)
                        $('#ID').val(dado.dados.ID)
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
                    })
                    $('.btn-save').show()
                    $('.btn-save').removeAttr('data-operation')
                    $('#modal-user').modal('show')
                } else {
                    Swal.fire({ // Inicialização do SweetAlert
                        title: 'Censo Antropométrico', // Título da janela SweetAler
                        text: dado.mensagem, // Mensagem retornada do microserviço
                        type: dado.tipo, // Tipo de retorno [success, info ou error]
                        confirmButtonText: 'OK'
                    })
                }
            }
        })

    })
})