var app = angular.module('orderApp', []);

app.controller('mainController', ['$scope', '$http', 'getAddresses', function($scope, $http, getAddresses){
    $scope.users = [];
    var allAddressArray = [];
    $scope.displayAddresses = [];
    $scope.getUserAddresses = getAddresses.getUserAddresses;
    $scope.data = getAddresses.data;

    angular.element(document).ready(function () {
        $http.get('/users').then(function(response){
            $scope.users = response.data;
            console.log($scope.users);
            getAddresses.createAddressesObject();
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
            //console.log("Working");
        }
        console.log(thisUserAddresses);
        data.results = thisUserAddresses;
    }

    return {
        createAddressesObject: createAddressesObject,
        getUserAddresses: getUserAddresses,
        data: data
    }

}]);