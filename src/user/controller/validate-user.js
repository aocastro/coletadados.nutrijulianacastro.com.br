$(document).ready(function() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        assync: true,
        url: 'src/user/model/validate-user.php',
        success: function(dados) {
            Swal.fire({
                title: 'Censo Antropométrico',
                text: dados.mensagem,
                icon: dados.tipo,
                confirmButtonText: 'OK'
            })

            if (dados.tipo === 'error') {
                $(location).attr('href', 'index');
            } else {
                $('#logo').attr('src', 'src/institution/files/' + dados.logo)
            }
        }
    })
})