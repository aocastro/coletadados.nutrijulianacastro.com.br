$(document).ready(function() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        assync: true,
        url: 'src/local/model/select-local',
        success: function(dados) {
            for (const dado of dados) {
                $('#local').append(`
                    <div class="card p-2 shadow mt-3">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-2 col-sm-1 col-md-1">
                                    <h1><i class="fa-solid fa-location-dot text-primary"></i></h1>
                                </div>
                                <div class="col-10 col-sm-9 col-md-9">
                                    <strong>local:</strong> ${dado.NAME} <br>
                                    <strong>Quantidade de crianças: </strong> ??
                                </div>
                                <div class="col-12 col-sm-2 col-md-2">
                                    <button id="${dado.ID}" class="btn btn-success btn-block d-none d-md-block d-dm-block btn-child">
                                        <i class="fa-solid fa-square-caret-right"></i>
                                        <br>Coletar
                                    </button>
                                    <button id="${dado.ID}" class="btn btn-success btn-block btn-sm d-block d-md-none d-sm-none btn-child">
                                        <i class="fa-solid fa-square-caret-right"></i> Coletar dados
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `)
            }
            $('body').append(`<script src="src/child/controller/select-child.js"></script>`)
        }
    })


})