define(function(require) {

    require('lib/jquery.min');
    require('lib/jquery.cookie');

    var login = {

        init: function() {

            this.controls = {};
            this.bind();
        },
        bind: function() {

            var login = $('#Login');

            this.controls.username = login.find('input.username');
            this.controls.password = login.find('input.password');


        },
        getLoginData: function() {

            var username = this.controls.username.val();
            var password = this.controls.password.val();
            var ipAddress = '127.0.0.1';
            var timestamp = Date.now();

            var data = {

                username: username,
                password: password,
                ipAddress: ipAddress,
                timestamp: timestamp
            };

            return data;
        },
        login: function() {

            var data = this.getLoginData();

            $.post('user/login', data)
            .done(this.loginSuccess)
            .fail(this.loginError);
        },
        loginSuccess: function(data, textStatus, jqXHR) {

            console.log('loginSuccess()');

            //set auth cookie using data
            //https://github.com/carhartl/jquery-cookie

            //auth - https://github.com/bnoguchi/everyauth

            //redirect to /game
        },
        loginError: function(xhr, textStatus, errorThrown) {

            console.log('loginError()');

            //show error
        }
    };

    return login;
});