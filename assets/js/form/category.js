// Create category
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
                required: true,
                nameEmpty: true,
                nameTwoBytes: true,
                nameCharacters: true,
                nameLength: true
            }
        },
        messages: {
            name: {
                required: messageVietnamese.ER001('Category name')
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


// Update category
$(document).ready(function() {
    const $inputForm = $('#category_update_form')

    let $categoryId

    $(document).on('click', '.update-category', function() {
        $categoryId = $(this).data('id');
        $.ajax({
            url: `/api/category/${$categoryId}`,
            method: 'GET',
            success: function(response) {
                $('#category_update_form #name').attr('placeholder', response.data.name);
            }
        });
    })

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
                url: `/api/category/${$categoryId}`,
                method: 'PATCH',
                data: $(form).serialize(), 
                success: function(response) {
                    $(form)[0].reset();
                    alert('Update category successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to update category!');
                }
            });
        }
    })
})

// Delete category
$(document).ready(function() {
    $(document).on('click', '.remove-category', function() {
        const $categoryId = $(this).data('id');
        $(document).on('click', '#delete_data_form #confirm-delete', function() {
            $.ajax({
                url: `/api/category/${$categoryId}`,
                method: 'DELETE',
                success: function(response) {
                    alert('Delete category successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to delete category!');
                }
            });
        })
    })
})