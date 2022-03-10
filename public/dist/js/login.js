jQuery.validator.addMethod("gmailvalidation", function (value, element) {
    return this.optional(element) || /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(value);
}, "invalid gmail");

$.validator.addMethod("pwcheck", function (value) {
    return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
        &&
        /[a-z]/.test(value) // has a lowercase letter
        &&
        /\d/.test(value) // has a digit
        &&
        /[A-Z]/.test(value) // uppercase check
}, "Invalid Password");

$.validator.setDefaults({
    ignore: [] // DON'T IGNORE PLUGIN HIDDEN SELECTS, CHECKBOXES AND RADIOS!!!
});

$().ready(function () {
    $("#login-form").validate({
        errorPlacement: function ($error, $element) {
            $error.appendTo($element.closest("div"));
        },
        rules: {
            username: {
                required: true,
                gmailvalidation: true
            },
            password: {
                required: true,
                pwcheck: true
            },
        },
        messages: {
            username: {
                required: "Please Enter your gmail",
            },
            password: {
                required: "please enter your password",
            },
        }
    })
});

const exampleForm = document.getElementById("login-form");
exampleForm.addEventListener("submit", handleFormSubmit);
async function postFormDataAsJson({
    url,
    formData
}) {
    const plainFormData = Object.fromEntries(formData.entries());
    if ($("#login-form").valid()) {
        const response = await axios.post(url, plainFormData);
        const data = JSON.parse(JSON.stringify(response))
        return data;
    }
    return false
}
async function handleFormSubmit(event) {
    try {
        event.preventDefault();
        if ($("#login-form").valid()) {
            const form = event.currentTarget;
            const url = form.action;
            const formData = new FormData(form);
            const responseData = await postFormDataAsJson({
                url,
                formData
            });
            if (responseData) {
                if (responseData.data.issuccess != false) {
                    if (responseData.data.data.userinfo.role == 'user') {
                        window.location.href = '/user';
                    }
                    if (responseData.data.data.userinfo.role == 'admin') {
                        window.location.href = '/admin/dashboard';
                    }
                } else {
                    let message = responseData.data.data.message
                    let alertmsg = document.getElementById('alertmsg')
                    alertmsg.innerHTML = message
                    let alert = document.getElementById('alert')
                    alert.classList.add('show')
                }
            }
        }
    } catch (error) {
        let alertmsg = document.getElementById('alertmsg')
        alertmsg.innerHTML = error
        let alert = document.getElementById('alert')
        alert.classList.add('show')
    }
}