$(document).ready(function() {

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        url: 'src/child/model/count-child',
        success: function(dado) {
            $('#TOTALCHILD').empty()
            $('#TOTALCHILD').append(dado.dados.TOTAL)
        }
    })

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        url: 'src/local/model/count-local',
        success: function(dado) {
            $('#TOTALLOCAL').empty()
            $('#TOTALLOCAL').append(dado.dados.TOTAL)
        }
    })

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        url: 'src/census/model/count-census',
        success: function(dado) {
            $('#TOTALCENSUS').empty()
            $('#TOTALCENSUS').append(dado.dados.TOTAL)
        }
    })

})