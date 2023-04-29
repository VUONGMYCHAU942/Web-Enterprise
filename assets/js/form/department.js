// Create department
$(document).ready(function() {
    const $inputForm = $('#department_create_form')

    methodValidation.empty('nameEmpty', messageVietnamese.ER001('Department name'))
    methodValidation.twoBytes('nameTwoBytes', messageVietnamese.ER004)
    methodValidation.specialCharacters('nameCharacters', messageVietnamese.ER0012)
    methodValidation.maxLength('nameLength', 20, 'Department name')

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
            }
        },
        messages: {
            name: {
                required: messageVietnamese.ER001('Department name')
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
                url: '/api/department',
                method: 'POST',
                data: $(form).serialize(), 
                success: function(response) {
                    $(form)[0].reset();
                    alert('Create department successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to create department!');
                }
            });
        }
    })
})

// Update department
$(document).ready(function() {
    const $inputForm = $('#department_update_form')

    let $departmentId

    $(document).on('click', '.update-department', function() {
        $departmentId = $(this).data('id');
        $.ajax({
            url: `/api/department/${$departmentId}`,
            method: 'GET',
            success: function(response) {
                $('#department_update_form #name').attr('placeholder', response.data.name);
            }
        });
    })

    methodValidation.empty('nameEmpty', messageVietnamese.ER001('Department name'))
    methodValidation.twoBytes('nameTwoBytes', messageVietnamese.ER004)
    methodValidation.specialCharacters('nameCharacters', messageVietnamese.ER0012)
    methodValidation.maxLength('nameLength', 20, 'Department name')

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
                url: `/api/department/${$departmentId}`,
                method: 'PATCH',
                data: $(form).serialize(), 
                success: function(response) {
                    $(form)[0].reset();
                    alert('Update department successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to update department!');
                }
            });
        }
    })
})


// Delete department
$(document).ready(function() {
    $(document).on('click', '.remove-department', function() {
        const $departmentId = $(this).data('id');
        $(document).on('click', '#delete_data_form #confirm-delete', function() {
            $.ajax({
                url: `/api/department/${$departmentId}`,
                method: 'DELETE',
                success: function(response) {
                    alert('Delete department successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to delete department!');
                }
            });
        })
    })
})