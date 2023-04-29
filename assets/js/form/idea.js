// Create idea
$(document).ready(function() {
    const $inputForm = $('#submit_idea_form')

    methodValidation.empty('titleEmpty', messageVietnamese.ER001('Title'))
    methodValidation.twoBytes('titleTwoBytes', messageVietnamese.ER004)
    methodValidation.specialCharacters('titleCharacters', messageVietnamese.ER0012)
    methodValidation.maxLength('titleLength', 20, 'Title')

    methodValidation.empty('descriptionEmpty', messageVietnamese.ER001('Title'))
    methodValidation.twoBytes('descriptionTwoBytes', messageVietnamese.ER004)
    methodValidation.specialCharacters('descriptionCharacters', messageVietnamese.ER0012)
    methodValidation.maxLength('descriptionLength', 200, 'Title')

    methodValidation.empty('contentEmpty', messageVietnamese.ER001('Content'))
    methodValidation.twoBytes('contentTwoBytes', messageVietnamese.ER004)
    methodValidation.specialCharacters('contentCharacters', messageVietnamese.ER0012)
    methodValidation.maxLength('contentLength', 500, 'Content')

    methodValidation.array('categoriesArray', messageVietnamese.ER001('Categories'))

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            title: {
                required: true,
                titleEmpty: true,
                titleTwoBytes: true,
                titleCharacters: true,
                titleLength: true
            }, 
            description: {
                required: true,
                descriptionEmpty: true,
                descriptionTwoBytes: true,
                descriptionCharacters: true,
                descriptionLength: true
            },
            content: {
                required: true,
                contentEmpty: true,
                contentTwoBytes: true,
                contentCharacters: true,
                contentLength: true
            },
            'categories[]': {
                categoriesArray: true
            }
        },
        messages: {
            title: {
                required: messageVietnamese.ER001('Title')
            },
            description: {
                required: messageVietnamese.ER001('Description')
            },
            content: {
                required: messageVietnamese.ER001('Content')
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
            $.ajax({
                url: '/api/category',
                method: 'POST',
                data: $(form).serialize(), 
                success: function(response) {
                    $(form)[0].reset();
                    alert('Create category successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to create category!');
                }
            });
        }
    })
})


// Update idea
$(document).ready(function() {
    const $inputForm = $('#category_create_form')

    methodValidation.empty('nameEmpty', messageVietnamese.ER001('Category name'))
    methodValidation.twoBytes('nameTwoBytes', messageVietnamese.ER004)
    methodValidation.specialCharacters('nameCharacters', messageVietnamese.ER0012)
    methodValidation.maxLength('nameLength', 20, 'Category name')

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            name: {
                nameEmpty: true,
                nameTwoBytes: true,
                nameCharacters: true,
                nameLength: true
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
            $.ajax({
                url: '/api/submission',
                method: 'POST',
                data: $(form).serialize(), 
                success: function(response) {
                    $(form)[0].reset();
                    alert('Create submission successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to create submission!');
                }
            });
        }
    })
})