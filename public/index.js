// var input = document.querySelector("#phone");
//    window.intlTelInput(input,({
//      // options here
//    }));
//
//    $(document).ready(function() {
//        $('.iti__flag-container').click(function() {
//          var countryCode = $('.iti__selected-flag').attr('title');
//          var countryCode = countryCode.replace(/[^0-9]/g,'')
//          $('#phone').val("");
//          $('#phone').val("+"+countryCode+" "+ $('#phone').val());
//       });
//    });
function SubmitForm()
{
    showResultDiv();
    document.forms['search'].action='/register';
    document.forms['search'].target='frame_result1';
    document.forms['search'].submit();

    document.forms['search'].action='/customer';
    document.forms['search'].target='frame_result2';
    document.forms['search'].submit();
    return false;
}
