


$(document).ready(function () {

    let paraOdd = $('p:odd');


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

    // $("p:even").classList.add("white-blur");

    paraOdd.css("color", "#437C90");
    // paraOdd.classList.add('blue-blur');


    $("#sidebar-toggle-button").click(function () {
        let effect = 'slide';
        let duration = 'slow';
        $('#sidebar-div').toggle(effect, duration);
        setFileInputSize();
    });


    $(".btn.form-control.login").click(function () {
        let effect = 'fade';
        let duration = 1000;
        $('#username-field').toggle(effect, duration);
        $('#password-field').toggle(effect, duration);
        $('#submit-btn').toggle(effect, duration);
        $('#login-btn').toggle(effect, duration);
        $('.g-signin2').toggle(effect, duration);
    });


    $(".dropdown-menu .dropdown-item.opt").on('click', function () {
        let postType = $(this).attr("name");
        $(".btn.dropdown-toggle").html(postType);
        getPostForm(postType);
    });


    $('#url-check-w').change(function () {
        $('#url-input-outer-div-w').toggle();
    });


    $('#file-check-w').change(function () {
        $('#file-input-outer-div-w').toggle();
        setFileInputSize()
    });


    $(window).on('resize', function () {
        setFileInputSize();
        });


    // $('.form-control.login').focusin(function() {
    //     $('#body * ').css({
    //         opacity: 0.8
    //         // "-webkit-filter": 'blur(2px)',
    //         // "-moz-filter": "blur(2px)",
    //         // "-o-filter": "blur(2px)",
    //         // "filter": "blur(2px)",
    //         // "color": "transparent",
    //         // "text-shadow": "0 0 8px #FFF"
    //     })
    // });
    // $('.form-control.login').focusout(function() {
    //     $('#body * ').css({
    //         opacity: 1.0
    //     })
    // });
});


function setFileInputSize() {

    let prependWidth;
    let inputInnerDivWidth;
    let newWidth;

    prependWidth = ($('#file-prepend-div-w').width());
    inputInnerDivWidth = ($('#file-input-inner-div-w').width());
    newWidth = (inputInnerDivWidth - prependWidth - 25);

    $('#file-input-label-w').width(newWidth);
}


function getPostForm(postType) {

    switch (postType) {

        case 'Learned':
            hideFormVars();
            showFormVar('form-type-l');
            break;

        case 'Thought':
            hideFormVars();
            showFormVar('form-type-t');
            break;

        case 'Heard':
            hideFormVars();
            showFormVar('form-type-h');
            break;

        case 'Watched':
            hideFormVars();
            showFormVar('form-type-w');
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
