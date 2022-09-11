$(document).ready(function() {

    $('#table-child').on('click', 'button.btn-view', function(e) {

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
            url: 'src/child/model/view-child',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/child/view/form-child', function() {
                        $('#NAME').val(dado.dados.NAME)
                        $('#NAME').attr('readonly', 'true')
                        $('#NASCIMENTO').val(dado.dados.NASCIMENTO)
                        $('#NASCIMENTO').attr('readonly', 'true')
                        $('#SEXO').empty()
                        if (dado.dados.SEXO == 'Male') {
                            $('#SEXO').append(`<option value="Male" selected>Masculino</option>`)
                            $('#SEXO').append(`<option value="Female">Feminino</option>`)
                        } else {
                            $('#SEXO').append(`<option value="Male">Masculino</option>`)
                            $('#SEXO').append(`<option value="Female" selected>Feminino</option>`)
                        }
                        $('#SEXO').attr('readonly', 'true')
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
                        $('#LOCAL_ID').attr('readonly', 'true')
                    })
                    $('.btn-save').hide()
                    $('#modal-child').modal('show')
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