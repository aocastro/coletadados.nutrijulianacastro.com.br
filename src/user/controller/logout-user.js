$(document).ready(function() {

    $('.logout').click(function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            url: 'src/user/model/logout-user',
            success: function(dados) {
                Swal.fire({
                    title: 'Censo Antropométrico',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                if (dados.tipo === 'success') {
                    $(location).attr('href', 'index');
                }
            }
        })
    })
})