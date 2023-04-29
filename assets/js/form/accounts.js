// Create coordinator account
$(document).ready(function() {
    const $inputForm = $('#manager_account_create_form')

    // Reset validation and value
    $('.modal_cancel').click(function() {
        $('.has-error').removeClass('has-error')
        $('.validation-error-message').remove()
        $($inputForm)[0].reset()
    })

    methodValidation.empty('usernameEmpty', messageVietnamese.ER001('Username'))
    methodValidation.twoBytes('usernameTwoBytes', messageVietnamese.ER004)
    methodValidation.specialCharacters('usernameCharacters', messageVietnamese.ER0012)
    methodValidation.maxLength('usernameLength', 15, 'Username')

    methodValidation.empty('fullnameEmpty', messageVietnamese.ER001('Fullname'))
    methodValidation.twoBytes('fullnameTwoBytes', messageVietnamese.ER004)
    methodValidation.specialCharacters('fullnameCharacters', messageVietnamese.ER0012)
    methodValidation.maxLength('fullnameLength', 50, 'Fullname')

    methodValidation.email('emailFormat', messageVietnamese.ER003)
    methodValidation.maxLength('emailLength', 100, 'Email')

    methodValidation.empty('passwordEmpty', messageVietnamese.ER001('Password'))
    methodValidation.twoBytes('passwordTwoBytes', messageVietnamese.ER004)
    methodValidation.minLength('passwordMinLength', 8, 'Password')
    methodValidation.maxLength('passwordMaxLength', 20, 'Password')

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            username: {
                required: true,
                usernameEmpty: true,
                usernameTwoBytes: true,
                usernameCharacters: true,
                usernameLength: true,
                remote: {
                    url: '/api/check-account-email',
                    type: 'post',
                    data: {
                        username: function() {
                            return $('#coordinator_account_create_form #username').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            fullname: {
                required: true,
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                fullnameCharacters: true,
                fullnameLength: true
            },
            email: {
                required: true,
                emailFormat: true,
                emailLength: true ,
                remote: {
                    url: '/api/check-account-email',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#coordinator_account_create_form #email').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            password: {
                required: true,
                passwordEmpty: true,
                passwordTwoBytes: true,
                passwordMinLength: true,
                passwordMaxLength: true
            },
            confirmPassword: {
                required: true,
                equalTo: '#password'
            },
        },
        messages: {
            username: {
                required: messageVietnamese.ER001('Username'),
                remote: messageVietnamese.ER007('Username')
            },
            fullname: {
                required: messageVietnamese.ER001('Fullname')
            },
            email: {
                required: messageVietnamese.ER001('Email'),
                remote: messageVietnamese.ER007('Email')
            },
            password: {
                required: messageVietnamese.ER001('Password'),
            },
            confirmPassword: {
                required: messageVietnamese.ER001('Confirm Password'),
                equalTo: messageVietnamese.ER006
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
                url: '/api/user/coordinator',
                method: 'POST',
                data: $(form).serialize(), 
                success: function(response) {
                    $(form)[0].reset();
                    alert('Create coordinator account successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to create coordinator account!');
                }
            });
        }
    })
})


// Update coordinator account
$(document).ready(function() {
    const $inputForm = $('#manager_account_update_form')

    let $coordinatorAccountId

    $(document).on('click', '.update-manager-account', function() {
        $coordinatorAccountId = $(this).data('id');
        $.ajax({
            url: `/api/user/${$coordinatorAccountId}`,
            method: 'GET',
            success: function(response) {
                $('#manager_account_update_form #username').attr('placeholder', response.data.username);
                $('#manager_account_update_form #fullname').attr('placeholder', response.data.fullname);
                $('#manager_account_update_form #email').attr('placeholder', response.data.email);
            }
        });
    })

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            username: {
                usernameEmpty: true,
                usernameTwoBytes: true,
                usernameCharacters: true,
                usernameLength: true,
                remote: {
                    url: '/api/check-account-email',
                    type: 'post',
                    data: {
                        username: function() {
                            return $('#coordinator_account_create_form #username').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            fullname: {
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                fullnameCharacters: true,
                fullnameLength: true
            },
            email: {
                emailFormat: true,
                emailLength: true ,
                remote: {
                    url: '/api/check-account-email',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#coordinator_account_create_form #email').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            password: {
                passwordEmpty: true,
                passwordTwoBytes: true,
                passwordMinLength: true,
                passwordMaxLength: true
            },
            confirmPassword: {
                equalTo: '#password'
            },
        },
        messages: {
            username: {
                remote: messageVietnamese.ER007('Username')
            },
            email: {
                remote: messageVietnamese.ER007('Email')
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
                url: `/api/user/${$coordinatorAccountId}`,
                method: 'PATCH',
                data: $(form).serialize(), 
                success: function(response) {
                    $(form)[0].reset();
                    alert('Update coordinator account successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to update coordinator account!');
                }
            });
        }
    })
})


// Delete category
$(document).ready(function() {
    $(document).on('click', '.remove-manager-account', function() {
        const $managerId = $(this).data('id');
        $(document).on('click', '#delete_data_form #confirm-delete', function() {
            $.ajax({
                url: `/api/user/${$managerId}`,
                method: 'DELETE',
                success: function(response) {
                    alert('Delete coordinator account successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to delete coordinator account!');
                }
            });
        })
    })
})


// Create staff account
$(document).ready(function() {
    const $inputForm = $('#coordinator_account_create_form')

    // Reset validation and value
    $('.modal_cancel').click(function() {
        $('.has-error').removeClass('has-error')
        $('.validation-error-message').remove()
        $($inputForm)[0].reset()
    })

    methodValidation.empty('usernameEmpty', messageVietnamese.ER001('Username'))
    methodValidation.twoBytes('usernameTwoBytes', messageVietnamese.ER004)
    methodValidation.specialCharacters('usernameCharacters', messageVietnamese.ER0012)
    methodValidation.maxLength('usernameLength', 15, 'Username')

    methodValidation.empty('fullnameEmpty', messageVietnamese.ER001('Fullname'))
    methodValidation.twoBytes('fullnameTwoBytes', messageVietnamese.ER004)
    methodValidation.specialCharacters('fullnameCharacters', messageVietnamese.ER0012)
    methodValidation.maxLength('fullnameLength', 50, 'Fullname')

    methodValidation.email('emailFormat', messageVietnamese.ER003)
    methodValidation.maxLength('emailLength', 100, 'Email')

    methodValidation.empty('passwordEmpty', messageVietnamese.ER001('Password'))
    methodValidation.twoBytes('passwordTwoBytes', messageVietnamese.ER004)
    methodValidation.minLength('passwordMinLength', 8, 'Password')
    methodValidation.maxLength('passwordMaxLength', 20, 'Password')

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            username: {
                required: true,
                usernameEmpty: true,
                usernameTwoBytes: true,
                usernameCharacters: true,
                usernameLength: true,
                remote: {
                    url: '/api/check-account-email',
                    type: 'post',
                    data: {
                        username: function() {
                            return $('#coordinator_account_create_form #username').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            fullname: {
                required: true,
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                fullnameCharacters: true,
                fullnameLength: true
            },
            email: {
                required: true,
                emailFormat: true,
                emailLength: true ,
                remote: {
                    url: '/api/check-account-email',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#coordinator_account_create_form #email').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            password: {
                required: true,
                passwordEmpty: true,
                passwordTwoBytes: true,
                passwordMinLength: true,
                passwordMaxLength: true
            },
            confirmPassword: {
                required: true,
                equalTo: '#password'
            },
            deaprtment: {
                required: true
            }
        },
        messages: {
            username: {
                required: messageVietnamese.ER001('Username'),
                remote: messageVietnamese.ER007('Email')
            },
            fullname: {
                required: messageVietnamese.ER001('Full Name')
            },
            email: {
                required: messageVietnamese.ER001('Email'),
                remote: messageVietnamese.ER007('Email')
            },
            password: {
                required: messageVietnamese.ER001('Password'),
            },
            confirmPassword: {
                required: messageVietnamese.ER001('Confirm Password'),
                equalTo: messageVietnamese.ER006
            },
            department: {
                required: messageVietnamese.ER001('Department')
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
                url: '/api/user/staff',
                method: 'POST',
                data: $(form).serialize(), 
                success: function(response) {
                    $(form)[0].reset();
                    alert('Create staff account successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to create staff account!');
                }
            });
        }
    })
})


// Update staff account
$(document).ready(function() {
    const $inputForm = $('#coordinator_account_update_form')

    let $staffAccountId

    $(document).on('click', '.update-coordinator-account', function() {
        $staffAccountId = $(this).data('id');
        $.ajax({
            url: `/api/user/${$staffAccountId}`,
            method: 'GET',
            success: function(response) {
                $('#coordinator_account_update_form #username').attr('placeholder', response.data.username);
                $('#coordinator_account_update_form #fullname').attr('placeholder', response.data.fullname);
                $('#coordinator_account_update_form #email').attr('placeholder', response.data.email);
            }
        });
    })

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            fullname: {
                required: true,
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                fullnameCharacters: true,
                fullnameLength: true
            },
            email: {
                required: true,
                emailFormat: true,
                emailLength: true ,
                remote: {
                    url: '/api/check-account-email',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#accountPDPForm #email').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            campus: {
                required: true,
                remote: {
                    url: '/api/valid-campus',
                    type: 'post',
                    data: {
                        campus: function() {
                            return $('#accountPDPForm #campus').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            role: {
                required: true,
                checkRole: true 
            }
        },
        messages: {
            fullname: {
                required: messageVietnamese.ER001('họ và tên')
            },
            email: {
                required: messageVietnamese.ER001('email'),
                remote: messageVietnamese.ER007('Email')
            },
            campus: {
                required: messageVietnamese.ER001('cở sở làm việc'),
                remote: messageVietnamese.ER001('cở sở làm việc')
            },
            role: {
                required: messageVietnamese.ER001('loại tài khoản')
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
                url: `/api/user/${$staffAccountId}`,
                method: 'PATCH',
                data: $(form).serialize(), 
                success: function(response) {
                    $(form)[0].reset();
                    alert('Update staff account successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to update staff account!');
                }
            });
        }
    })
})


// Delete category
$(document).ready(function() {
    $(document).on('click', '.remove-coordinator-account', function() {
        const $coordinatorId = $(this).data('id');
        $(document).on('click', '#delete_data_form #confirm-delete', function() {
            $.ajax({
                url: `/api/user/${$coordinatorId}`,
                method: 'DELETE',
                success: function(response) {
                    alert('Delete staff account successfully.');
                    window.location.reload()
                },
                error: function(xhr, status, error) {
                    alert('Failed to delete staff account!');
                }
            });
        })
    })
})
