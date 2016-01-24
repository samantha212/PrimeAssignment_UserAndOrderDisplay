var app = angular.module('orderApp', []);

app.controller('mainController', ['$scope', '$http', 'getAddresses', 'getOrders', function($scope, $http, getAddresses, getOrders){
    $scope.users = [];
    var allAddressArray = [];
    var allOrdersArray = [];
    $scope.displayAddresses = [];
    $scope.getUserAddresses = getAddresses.getUserAddresses;
    $scope.data = getAddresses.data;
    $scope.orderData = getOrders.orderData;

    $scope.getSpecificOrders = getOrders.getSpecificOrders;
    //$scope.orderData = getOrders.data;

    angular.element(document).ready(function () {
        $http.get('/users').then(function(response){
            $scope.users = response.data;
            console.log($scope.users);
            getAddresses.createAddressesObject();
            getOrders.getOrders();
        });
    });


}]);

//Service to get addresses from server.
app.factory('getAddresses', ['$http', function($http){
    var data = {
        results: []
    };

    var createAddressesObject = function(){
        $http.get('/getuseraddresses').then(function(response){
            allAddressArray = response.data;

        });
    };

    var getUserAddresses = function(selectedId) {
        var id = selectedId;
        var thisUserAddresses = [];
        var addresses = allAddressArray;

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

app.factory('getOrders', ['$http', function($http){

    var orderData = {
        results: [],
        dollarTotal: 0
    };

    var getOrders = function(){
        $http.get('/getuserorders').then(function(response){
            allOrdersArray = response.data;
            console.log(allOrdersArray);
        });
    };

    var getSpecificOrders = function(selectedUserId, start, end) {
        var userId = selectedUserId;
        var userOrders = [];
        var orders = allOrdersArray;

        var startDate = updateDateFormat(start);
        var endDate = updateDateFormat(end);

        function updateDateFormat(date){
            var tempDate = date;
            var month = tempDate.slice(0,2);
            var day = date.slice(3,5);
            var year = date.slice(6,10);

            var updatedDate = year + "-" + month + "-" + day;

            return updatedDate;
        }



        console.log("start date", startDate);
        console.log("end date", endDate);
        //

        for(var it=0; it<orders.length; it++){
            var temp = orders[it];
            if (temp.user_id == userId){
                var date = temp.order_date;
                var year = date.slice(0,4);
                var month = date.slice(5,7);
                var day = date.slice(8,10);
                var shortDate = year + "-" + month + "-" + day;
                if (shortDate > startDate && shortDate < endDate){
                    console.log("short date", shortDate);
                    thisOrderTotal = temp.amount;
                    orderCost = parseFloat(temp.amount);
                    orderData.dollarTotal += orderCost;
                    console.log(orderData.dollarTotal);
                    //formattedCost =
                    userOrders.push(temp);
                }
            }
            //console.log(userOrders);
        }
        //console.log(dollarTotal);

        orderData.results = userOrders;

        //var dateOne = "04-15-2014";
        //var dateTwo = "04-15-2014";
        //if(dateOne >= dateTwo) {
        //    console.log("one is bigger");
        //} else {
        //    console.log("two is bigger");
        //}
    };

    return {
        getOrders: getOrders,
        getSpecificOrders: getSpecificOrders,
        orderData: orderData
    }








    //var data = {
    //    results: []
    //};
    //
    //var getUserOrders = function(){
    //    //$http.get('/getuserorders', {params: {name: name}}).then(function(response){
    //    $http.get('/getuserorders').then(function(response){
    //        //data.results = response;
    //        console.log = (response);
    //    });
    //    //console.log(name);
    //};
    //
    //return {
    //    data: data,
    //    getUserOrders: getUserOrders
    //}


}]);