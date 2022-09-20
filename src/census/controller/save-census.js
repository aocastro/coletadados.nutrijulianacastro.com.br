function loadLocal() {

    $('#principal').empty()

    $('#principal').load('children')

    $.ajax({
        type: 'POST',
        dataType: 'json',
        assync: true,
        data: localStorage.getItem('local'),
        url: 'src/child/model/select-child',
        success: function(dados) {
            for (const dado of dados) {
                let SEXO
                if (dado.SEXO == 'Male') {
                    SEXO = 'Masculino'
                } else {
                    SEXO = 'Feminino'
                }
                $('#child').append(`
                <div class="card p-2 shadow mt-3">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-2 col-sm-1 col-md-1">
                                <h1><i class="fa-solid fa-child-reaching"></i></h1>
                            </div>
                            <div class="col-10 col-sm-9 col-md-9">
                                <strong>Nome:</strong> ${dado.NAME} <br>
                                <strong>Nascimento: </strong> ${dado.NASCIMENTO} | <strong>${SEXO}</strong> <br>
                                <strong>Última avaliação: </strong> ${dado.AVALIACAO}
                            </div>
                            <div class="col-12 col-sm-2 col-md-2">
                                <button id="${dado.ID}" class="btn btn-primary btn-block d-none d-md-block d-dm-block btn-submit">
                                        <h1><i class="fa-solid fa-play"></i></h1>
                                </button>
                                <button id="${dado.ID}" class="btn btn-primary btn-block btn-sm d-block d-md-none d-sm-none btn-submit">
                                    <i class="fa-solid fa-play"></i> Selecionar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `)
            }
            $('body').append(`<script src="src/child/controller/submit-child.js"></script>`)
        }
    })
}

$(document).ready(function() {

    $('#loading').modal('hide')

    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-census').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        var child_id = $('#CHILD_ID').val()

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/census/model/save-census',
            success: function(dados) {
                Swal.fire({
                    title: 'Censo Antropométrico',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                loadLocal()
            }
        })
    })

})