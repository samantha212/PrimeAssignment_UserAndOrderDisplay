var app = angular.module('orderApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/addresses', {
            templateUrl: 'views/addresses.html',
            controller: 'AddressesController'
        })
        .when('/orders', {
            templateUrl: 'views/orders.html',
            controller: 'OrdersController'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

app.controller('AddressesController', ['$scope','getAddresses', function($scope, getAddresses){

}]);

app.controller('OrdersController', ['$scope', 'getOrders', function($scope, getOrders){

}]);

app.controller('mainController', ['$scope', '$http', 'getAddresses', 'getOrders', function($scope, $http, getAddresses, getOrders){
    $scope.users = [];
    var allOrdersArray = [];
    $scope.displayAddresses = [];
    $scope.getUserAddresses = getAddresses.getUserAddresses;
    $scope.data = getAddresses.data;
    $scope.orderData = getOrders.orderData;

    $scope.getSpecificOrders = getOrders.getSpecificOrders;

    angular.element(document).ready(function () {
        $http.get('/users').then(function(response){
            $scope.users = response.data;
            console.log($scope.users);
            getAddresses.createAddressesObject();
            getOrders.getOrders();
        });
    });


}]);



//Service to 1) get addresses from server and 2) process address request from user.
app.factory('getAddresses', ['$http', function($http){
    var data = {
        allAddressArray: [],
        results: []
    };

    var createAddressesObject = function(){
        $http.get('/getuseraddresses').then(function(response){
            data.allAddressArray = response.data;

        });
    };

    var getUserAddresses = function(selectedId) {
        var id = selectedId;
        var thisUserAddresses = [];
        var addresses = data.allAddressArray;

        for(var it=0; it<addresses.length; it++){
            var temp = addresses[it];
            if (temp.user_id == id){
                thisUserAddresses.push(temp);
            }
        }
        //console.log(thisUserAddresses);
        data.results = thisUserAddresses;
    };

    return {
        createAddressesObject: createAddressesObject,
        getUserAddresses: getUserAddresses,
        data: data
    }

}]);

//Service to 1) get order information from the database and 2) process order info request from user.
app.factory('getOrders', ['$http', function($http){

    var orderData = {
        allOrdersArray: [],
        results: [],
        dollarTotal: 0
    };

    var getOrders = function(){
        $http.get('/getuserorders').then(function(response){
            orderData.allOrdersArray = response.data;
            console.log(allOrdersArray);
        });
    };

    var getSpecificOrders = function(selectedUserId, start, end) {
        var userId = selectedUserId;
        var userOrders = [];
        var orders = orderData.allOrdersArray;

        var startDate = updateEnteredDateFormat(start);
        var endDate = updateEnteredDateFormat(end);

        for(var it=0; it<orders.length; it++){
            var temp = orders[it];
            if (temp.user_id == userId){
                var orderDate = updateDataDateFormat(temp.order_date);
                if (orderDate > startDate && orderDate < endDate){
                    thisOrderTotal = temp.amount;
                    orderCost = parseFloat(temp.amount);
                    orderData.dollarTotal += orderCost;
                    userOrders.push(temp);
                }
            }
        }

        orderData.results = userOrders;
    };

    function updateDataDateFormat(date){
        var year = date.slice(0,4);
        var month = date.slice(5,7);
        var day = date.slice(8,10);
        return year + "-" + month + "-" + day;

    }

    function updateEnteredDateFormat(date){
        var tempDate = date;
        var month = tempDate.slice(0,2);
        var day = date.slice(3,5);
        var year = date.slice(6,10);

        return (year + "-" + month + "-" + day);
    }


    return {
        getOrders: getOrders,
        getSpecificOrders: getSpecificOrders,
        orderData: orderData
    }

}]);