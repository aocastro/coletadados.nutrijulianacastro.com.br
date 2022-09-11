$(document).ready(function() {
    $('.btn-login').click(function(e) {
        e.preventDefault()

        let dados = $('#login').serialize()

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/user/model/login-user',
            success: function(dados) {
                if (dados.tipo === 'success') {
                    $(location).attr('href', 'controller');
                } else {
                    Swal.fire({
                        title: 'Censo Antropométrico',
                        text: dados.mensagem,
                        icon: dados.tipo,
                        confirmButtonText: 'OK'
                    })
                }
            }
        })

    })

})