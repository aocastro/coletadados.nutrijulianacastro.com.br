$(document).ready(function() {

    $('#idade').hide()

    $('input[name=PREMATURO]').on('change', function() {
        let option = $(this).val()
        if (option == 'true') {
            $('#idade').show()
        } else {
            $('#idade').hide()
        }
    })
})