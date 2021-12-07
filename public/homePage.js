const logoutButton = new LogoutButton;

logoutButton.action = function() {
    const callback = (responseBody) => {
        if (responseBody.success) {
            location.reload();
        }
    }

    ApiConnector.logout(callback);
}

ApiConnector.current((responseBody) => {
    if (responseBody.success) {
        ProfileWidget.showProfile(responseBody.data);
    }
});

const ratesBoard = new RatesBoard;

setInterval(() => ApiConnector.getStocks((responseBody) => {
    
    if (responseBody.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(responseBody.data);
    }
}), 60000);

const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = function(data) {
    const moneyCallback = (responseBody) => {
        if (responseBody.success) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, 'Пополнение успешно');
        } else {
            moneyManager.setMessage(false, 'Пополнение неудачно');
        }
    }
    
    ApiConnector.addMoney(data, moneyCallback);
}

moneyManager.conversionMoneyCallback = function(data) {
    const convertCallback = (responseBody) => {
        if (responseBody.success) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, 'Конвертирование успешно');
        } else {
            moneyManager.setMessage(false, 'Конвертирование неудалось');
        }
    }
    
    ApiConnector.convertMoney(data, convertCallback);
}

moneyManager.sendMoneyCallback = function(data) {
    const sendCallback = (responseBody) => {
        if (responseBody.success) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, 'Перевод выполнене');
        } else {
            moneyManager.setMessage(false, 'Перевести деньги не удалось');
        }
    }
    
    ApiConnector.transferMoney(data, sendCallback);
}

const favorites = new FavoritesWidget;

favorites.getFavorites = function(data) {
    
    const getFavoritesCallback = (responseBody) => {
        
        if (responseBody.success) {
            favorites.clearTable();
            favorites.fillTable(responseBody.data);
            moneyManager.updateUsersList(responseBody.data);
        }
        console.log(responseBody)
    }
    
    ApiConnector.getFavorites(getFavoritesCallback);
}

favorites.addUserCallback = function (data) {
    const userCallback = (responseBody) => {
        console.log(responseBody);
        if (responseBody.success) {
            favorites.clearTable();
            favorites.getData(data);
            
            favorites.setMessage(true, 'Пользователь добавлен');
        } else {
            favorites.setMessage(false, 'Пользователь не добавлен')
        }
    }

    ApiConnector.addUserToFavorites(data, userCallback);
}