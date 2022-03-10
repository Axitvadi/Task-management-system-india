jQuery.validator.addMethod("alphanumeric", function (value, element) {
    return this.optional(element) || /(?!^\d+$)^.+$/i.test(value);
}, "Do Not Use Only Number in UserName");

jQuery.validator.addMethod("gmailvalidation", function (value, element) {
    return this.optional(element) || /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(value);
}, "Use Your valid Gmail address");

$.validator.setDefaults({
    ignore: [] // DON'T IGNORE PLUGIN HIDDEN SELECTS, CHECKBOXES AND RADIOS!!!
});

$.validator.addMethod("pwcheck", function (value) {
    return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
        &&
        /[a-z]/.test(value) // has a lowercase letter
        &&
        /\d/.test(value) // has a digit
        &&
        /[A-Z]/.test(value) // uppercase check
}, "Use Strong Password including minimum One Lowercase, One Uppercase and One digits");

$().ready(function () {
    $("#register-form").validate({
        errorPlacement: function ($error, $element) {
            $error.appendTo($element.closest("div"));
        },
        rules: {
            username: {
                required: true,
                minlength: 2,
                alphanumeric: true
            },
            email: {
                required: true,
                email: true,
                gmailvalidation: true
            },
            password: {
                required: true,
                pwcheck: true,
                minlength: 6
            },
            confirmpassword: {
                required: true,
                equalTo: '#pass'
            },
            checkbox: {
                required: true,
                minlength: 1
            }
        },
        messages: {
            username: {
                required: "Please Enter your Username",
                minlength: "You need to use at least 2 characters for your Username.",
            },
            email: {
                required: "please enter your email",
                email: "Only valid emails Are Allowed"
            },
            password: {
                required: "please enter your password",
                minlength: "You need to use at least 6 characters long password.",
            },
            confirmpassword: {
                required: "please choose your confirm password",
                equalto: 'confirm password should be equal to password'
            },
            checkbox: {
                required: 'please agree our terms and condition',
                minlength: 'please agree our terms and condition'
            }
        }
    })
});

$( "#close" ).click(function() {
    $( "#alertmodel" ).removeClass("show")
  });