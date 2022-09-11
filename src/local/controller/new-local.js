$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo local de coleta')

        $('.modal-body').load('src/local/view/form-local', function() {
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

        $('#modal-local').modal('show')
    })
})