// Create submission
$(document).ready(function() {
    const $inputForm = $('#submission_create_form')

    $('#submission_create_form #pick-closure-date').flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });

    $('#submission_create_form #pick-final-closure-date').flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });

    methodValidation.empty('nameEmpty', messageVietnamese.ER001('Submission name'))
    methodValidation.twoBytes('nameTwoBytes', messageVietnamese.ER004)
    methodValidation.specialCharacters('nameCharacters', messageVietnamese.ER0012)
    methodValidation.maxLength('nameLength', 50, 'Submission name')

    methodValidation.empty('descriptionEmpty', messageVietnamese.ER001('Description'))
    methodValidation.maxLength('descriptionLength', 500, 'Description')

    methodValidation.empty('closureDateEmpty', messageVietnamese.ER001('Closure Date'))

    methodValidation.empty('finalClosureDateEmpty', messageVietnamese.ER001('Final Closure Date'))

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            name: {
                required: true,
                nameEmpty: true,
                nameTwoBytes: true,
                nameCharacters: true,
                nameLength: true
            },
            description: {
                required: true,
                descriptionEmpty: true,
                descriptionLength: true
            },
            closureDate: {
                required: true,
                closureDateEmpty: true
            },
            finalClosureDate: {
                required: true,
                finalClosureDateEmpty: true
            },
        },
        messages: {
            name: {
                required: messageVietnamese.ER001('Submission Name')
            },
            description: {
                required: messageVietnamese.ER001('Description')
            },
            closureDate: {
                required: messageVietnamese.ER001('Closure Date')
            },
            finalClosureDate: {
                required: messageVietnamese.ER001('Final Closure Date')
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


// Update submission
$(document).ready(function() {
    const $inputForm = $('#submission_update_form')

    let $submissionId

    $(document).on('click', '.update-submission', function() {
        $submissionId = $(this).data('id');
        $.ajax({
            url: `/api/submission/${$submissionId}`,
            method: 'GET',
            success: function(response) {
                $('#submission_update_form #name').attr('placeholder', response.data.name);
                $('#submission_update_form #description').attr('placeholder', response.data.description);
                $('#submission_update_form #pick-closure-date').attr('placeholder', response.data.closureDate);
                $('#submission_update_form #pick-final-closure-date').attr('placeholder', response.data.finalClosureDate);
            }
        });
    })

    $('#submission_update_form #pick-closure-date').flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });

    $('#submission_update_form #pick-final-closure-date').flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });

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
            },
            description: {
                descriptionEmpty: true,
                descriptionLength: true
            },
            closureDate: {
                closureDateEmpty: true
            },
            finalClosureDate: {
                finalClosureDateEmpty: true
            },
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
                url: `/api/submission/${$submissionId}`,
                method: 'PATCH',
                data: $(form).serialize(), 
                success: function(response) {
                    $(form)[0].reset();
                    alert('Update submission successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to update submission!');
                }
            });
        }
    })
})


// Delete submission
$(document).ready(function() {
    $(document).on('click', '.remove-submission', function() {
        const $submissionId = $(this).data('id');
        $(document).on('click', '#delete_data_form #confirm-delete', function() {
            $.ajax({
                url: `/api/submission/${$submissionId}`,
                method: 'DELETE',
                success: function(response) {
                    alert('Delete submission successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to delete submission!');
                }
            });
        })
    })
})