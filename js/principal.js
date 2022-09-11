$(document).ready(function() {
    $('#principal').load('local')

    $('.breadcrumb-item').click(function(e) {
        e.preventDefault()
        let url = $(this).attr('href')
        $('a').removeClass('active')
        $(this).addClass('active')
        $('#principal').load(url)
    })
})