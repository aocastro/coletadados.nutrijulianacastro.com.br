$(document).ready(function() {
    $('.btn-save').click(function(e) {
        e.preventDefault()

        var formData = new FormData(document.getElementById("form-institution"))

        $.ajax({
            url: 'src/institution/model/save-institution',
            type: "POST",
            data: formData,
            mimeType: "multipart/form-data",
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            success: function(dados) {
                Swal.fire({
                    title: 'Censo Antropométrico',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-institution').modal('hide')
                $('#table-institution').DataTable().ajax.reload()
            }
        })
    })
})