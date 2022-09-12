$(document).ready(function() {
    $('#principal').load('local')

    $('.nav-link').click(function(e) {
        e.preventDefault()
        let url = $(this).attr('href')
        console.log(url)
        $('#principal').empty()
        $('#principal').load(url)
    })
})