const user = new UserForm;

user.loginFormCallback = function (data) {
    const loginCallback = (responseBody) => {

        console.log(responseBody);
        if (responseBody.success) {
            location.reload();
        } else {
            this.setLoginErrorMessage(responseBody.error)
        }
    }

    ApiConnector.login(data, loginCallback);
}

user.registerFormCallback = function (data) {
    const registerCallback = (responseBody) => {
        if (responseBody.success) {
            location.reload();
        } else {
            this.setRegisterErrorMessage(responseBody.error);
        }
    }

    ApiConnector.register(data, registerCallback);
}