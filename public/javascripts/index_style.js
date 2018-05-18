

$(document).ready(function () {


    setInterval(function () {
        let dateTime;
        let dateA;
        let dateB;
        let d = new Date();
        dateA = d.toLocaleDateString();
        dateB = d.toLocaleTimeString();
        dateTime = `${dateA} @ ${dateB}`;
        document.getElementById("date-time-span").textContent = dateTime;
    }, 1000);


    $("p:odd").css("color", "#437C90");


    $("#sidebar-toggle-button").click(function () {
        let effect = 'slide';
        let duration = 'slow';
        $('#sidebar-div').toggle(effect, duration);
        setFileInputSize()
    });


    $(".btn.form-control.login").click(function () {
        let effect = 'fade';
        let duration = 1000;
        $('#username-field').toggle(effect, duration);
        $('#password-field').toggle(effect, duration);
        $('#submit-btn').toggle(effect, duration);
        $('#login-btn').toggle(effect, duration);
    });


    $(".dropdown-menu .dropdown-item.opt").on('click', function () {
        let postType = $(this).attr("name");
        $(".btn.dropdown-toggle").html(postType);
        getPostForm(postType);
    });


    $('#watched-check-url').change(function () {
        $('#watched-url-input-div').toggle();
    });


    $('#watched-check-file').change(function () {
        $('#watched-file-input-outer-div').toggle();
        setFileInputSize()
    });


    $(window).on('resize', function () {
        setFileInputSize()
        });

});




function setFileInputSize() {

    let prependWidth;
    let inputInnerDivWidth;
    let newWidth;

    prependWidth = ($('#file-prepend').width());
    inputInnerDivWidth = ($('#watched-file-input-inner-div').width());
    newWidth = (inputInnerDivWidth - prependWidth - 25);

    $('#file-input-label').width(newWidth);
}



function getPostForm(postType) {

    switch (postType) {

        case 'Today I Learned ':
            hideFormVars();
            showFormVar('form-type-learned');
            break;
        case 'Today I Thought ':
            hideFormVars();
            showFormVar('form-type-thought');
            break;
        case 'Today I Heard ':
            hideFormVars();
            showFormVar('form-type-heard');
            break;
        case 'Today I Watched ':
            hideFormVars();
            showFormVar('form-type-watched');
            break;
        default:
            alert('Unexpected Error Rendering Form')
    }
}


function hideFormVars() {
    $('.form-var').each(function () {
        $(this).hide();
    });
}


function showFormVar(formId) {
    $('#' + formId).show();
}


$('.dropdown-menu .dropdown-item.opt').on('click', function() {
    $('#dropdown-selection').text($(this).id);
});
