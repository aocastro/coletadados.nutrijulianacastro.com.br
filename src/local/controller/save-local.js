$(document).ready(function() {

    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-local').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/local/model/save-local',
            success: function(dados) {
                Swal.fire({
                    title: 'Censo Antropométrico',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-local').modal('hide')
                $('#table-local').DataTable().ajax.reload()
            }
        })
    })

})