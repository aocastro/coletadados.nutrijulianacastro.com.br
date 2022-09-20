$(document).ready(function() {

    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-child').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/child/model/save-child',
            success: function(dados) {
                Swal.fire({
                    title: 'Censo Antropométrico',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-child').modal('hide')
                $('#table-child').DataTable().ajax.reload()
            }
        })
    })

})