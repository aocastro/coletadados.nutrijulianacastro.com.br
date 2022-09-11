$(document).ready(function() {

    $('.btn-child').click(function() {

        let dados = `LOCAL_ID=${$(this).attr('id')}`

        $('#principal').empty()

        $('#principal').load('children')

        $('a').removeClass('active')

        $('.breadcrumb').append(`<li class="breadcrumb-item active"><a href="children">Crianças</a></li>`)

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
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
                                    <strong>Nascimento: </strong> ${dado.NASCIMENTO} | <strong>${SEXO}</strong>
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
    })
})