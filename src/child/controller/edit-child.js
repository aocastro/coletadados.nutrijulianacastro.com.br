$(document).ready(function() {

    $('#table-child').on('click', 'button.btn-edit', function(e) {

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
            url: 'src/child/model/view-child',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/child/view/form-child', function() {
                        $('#NAME').val(dado.dados.NAME)
                        $('#MOTHER').val(dado.dados.MOTHER)
                        $('#NASCIMENTO').val(dado.dados.NASCIMENTO)
                        $('#SEXO').empty()
                        if (dado.dados.SEXO == 'Male') {
                            $('#SEXO').append(`<option value="Male" selected>Masculino</option>`)
                            $('#SEXO').append(`<option value="Female">Feminino</option>`)
                        } else {
                            $('#SEXO').append(`<option value="Male">Masculino</option>`)
                            $('#SEXO').append(`<option value="Female" selected>Feminino</option>`)
                        }
                        $('#ID').val(dado.dados.ID)
                        $('#LOCAL_ID').empty()
                        var LOCAL_ID = dado.dados.LOCAL_ID
                        $.ajax({
                            type: 'POST',
                            dataType: 'JSON',
                            assync: true,
                            url: 'src/local/model/all-local',
                            success: function(dados) {
                                for (const dado of dados) {
                                    if (dado.ID == LOCAL_ID) {
                                        $('#LOCAL_ID').append(`<option value="${dado.ID}" selected>${dado.NAME}</option>`)
                                    } else {
                                        $('#LOCAL_ID').append(`<option value="${dado.ID}">${dado.NAME}</option>`)
                                    }
                                }
                            }
                        })
                    })
                    $('.btn-save').show()
                    $('.btn-save').removeAttr('data-operation')
                    $('#modal-child').modal('show')
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