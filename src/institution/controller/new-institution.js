$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar nova instituição')

        $('.modal-body').load('src/institution/view/form-institution')

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-institution').modal('show')
    })
})