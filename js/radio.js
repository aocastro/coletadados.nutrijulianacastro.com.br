$(document).ready(function() {

    if ($('#TRUE').prop('checked') == true) {
        $('#idade').show()
    } else {
        $('#idade').hide()
    }

    $('input[name=PREMATURO]').on('change', function() {
        let option = $(this).val()
        if (option == 'true') {
            $('#idade').show()
        } else {
            $('#idade').hide()
        }
    })
})