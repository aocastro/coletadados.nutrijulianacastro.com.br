$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo child de coleta')

        $('.modal-body').load('src/child/view/form-child', function() {
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                assync: true,
                url: 'src/local/model/all-local',
                success: function(dados) {
                    for (const dado of dados) {
                        $('#LOCAL_ID').append(`<option value="${dado.ID}">${dado.NAME}</option>`)
                    }
                }
            })
        })

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-child').modal('show')
    })
})