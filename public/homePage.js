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


const getStocks = () => ApiConnector.getStocks((responseBody) => {
    
    if (responseBody.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(responseBody.data);
    }
})
getStocks();
setInterval(getStocks, 60000);

const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = function(data) {
    const moneyCallback = (responseBody) => {
        if (responseBody.success) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, 'Пополнение успешно');
        } else {
            moneyManager.setMessage(false, responseBody.error);
        }
    }
    
    ApiConnector.addMoney(data, moneyCallback);
}

moneyManager.conversionMoneyCallback = function(data) {
    const convertCallback = (responseBody) => {
        console.log(responseBody);
        if (responseBody.success) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, 'Конвертирование успешно');
        } else {
            moneyManager.setMessage(false, responseBody.error);
        }
    }
    
    ApiConnector.convertMoney(data, convertCallback);
}

moneyManager.sendMoneyCallback = function(data) {
    const sendCallback = (responseBody) => {
        console.log(responseBody);
        if (responseBody.success) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, 'Перевод выполнен');
        } else {
            moneyManager.setMessage(false, responseBody.error);
        }
    }
    
    ApiConnector.transferMoney(data, sendCallback);
}

const favorites = new FavoritesWidget;

const getFavoritesCallback = (responseBody) => {
        
    if (responseBody.success) {
        favorites.clearTable();
        favorites.fillTable(responseBody.data);
        moneyManager.updateUsersList(responseBody.data);
    }
    console.log(responseBody)
}
    
ApiConnector.getFavorites(getFavoritesCallback);


favorites.addUserCallback = function (data) {
    const userCallback = (responseBody) => {
        
        if (responseBody.success) {
            favorites.clearTable();
            favorites.getData(data);
            favorites.fillTable(responseBody.data);
            moneyManager.updateUsersList(responseBody.data);
            favorites.setMessage(true, 'Пользователь добавлен');
        } else {
            favorites.setMessage(false, responseBody.error)
        }
        console.log(responseBody);
    }

    ApiConnector.addUserToFavorites(data, userCallback);
}

favorites.removeUserCallback = function (data) {
    const removeUser = (responseBody) => {
        
        if (responseBody.success) {
            favorites.clearTable();
            favorites.getData(data);
            favorites.fillTable(responseBody.data);
            moneyManager.updateUsersList(responseBody.data);
            favorites.setMessage(true, 'Пользователь удалён');
        } else {
            favorites.setMessage(false, responseBody.error)
        }
        
    }

    ApiConnector.removeUserFromFavorites(data, removeUser);
}
