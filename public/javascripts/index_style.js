// let app = require('../../app.js');

$(document).ready(function () {


    // $('.typecast'.on('click', function() {
    //     app.locals.postType = $(this).id;
    //
    // }));

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


    $('#url-check-w').change(function () {
        $('#url-input-div-w').toggle();
    });


    $('#file-check-w').change(function () {
        $('#file-input-outer-div-w').toggle();
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
    inputInnerDivWidth = ($('#file-input-inner-div-w').width());
    newWidth = (inputInnerDivWidth - prependWidth - 25);

    $('#file-input-label-w').width(newWidth);
}



function getPostForm(postType) {

    // let flash = require('express-flash');
    // flash(postType.toString());
    // console.log(postType.toString());

    switch (postType) {

        case 'Learned':
            hideFormVars();
            showFormVar('form-type-l');
            // console.log(postType.toString());
            break;

        case 'Thought':
            hideFormVars();
            showFormVar('form-type-t');
            console.log(postType.toString());
            break;

        case 'Heard':
            hideFormVars();
            showFormVar('form-type-h');
            console.log(postType.toString());
            break;

        case 'Watched':
            hideFormVars();
            showFormVar('form-type-w');
            console.log(postType.toString());
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
//
// let ddm = $('#ddm');
// let dds = $('#dds');
//
// $(ddm.children.forEach(on('click', function() {
//     dds.classList = '';
//     dds.addClass(($(this.id)));
// })));
//
//
// $('#ddm > .dropdown-item.opt').on('click', function() {
//     // $('#dropdown-selection').text($(this).id);
//     $('dropdown-selection').attr = ($(this).id);
// });
