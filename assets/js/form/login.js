// Create department
$(document).ready(function() {
    const $inputForm = $('#login')

    methodValidation.empty('usernameEmpty', messageVietnamese.ER001('Username'))
    methodValidation.empty('passwordEmpty', messageVietnamese.ER001('Password'))

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            username: {
                required: true,
                usernameEmpty: true,
            },
            password: {
                required: true,
                passwordEmpty: true,
            }
        },
        messages: {
            username: {
                required: messageVietnamese.ER001('Username')
            },
            password: {
                required: messageVietnamese.ER001('Password')
            }
        },
        highlight: function(element) {
            $(element).addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).removeClass('has-error');
        },
        errorClass: 'validation-error-message',
        submitHandler: function(form) {
            form.action = "/auth/login",
            form.method = "post"
            form.submit()
        }
    })
})