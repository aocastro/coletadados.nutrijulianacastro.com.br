$(document).ready(function() {

    $('#table-local').on('click', 'button.btn-edit', function(e) {

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
            url: 'src/local/model/view-local',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/local/view/form-local', function() {
                        $('#NAME').val(dado.dados.NAME)
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
                    $('#modal-local').modal('show')
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