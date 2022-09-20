$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo usuário para o sistema')

        $('.modal-body').load('src/user/view/form-user', function() {
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                assync: true,
                url: 'src/institution/model/all-institution',
                success: function(dados) {
                    for (const dado of dados) {
                        $('#INSTITUICAO_ID').append(`<option value="${dado.ID}">${dado.NOME}</option>`)
                    }
                }
            })
        })

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-user').modal('show')
    })
})