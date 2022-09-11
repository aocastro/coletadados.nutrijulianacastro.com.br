$(document).ready(function() {

    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-user').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/user/model/save-user',
            success: function(dados) {
                Swal.fire({
                    title: 'Censo Antropométrico',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-user').modal('hide')
                $('#table-user').DataTable().ajax.reload()
            }
        })
    })

})