'use strict';

// ΪsimpleApp2����һ��ģ��
var app = angular.module('simpleApp2', ['simpleApp2.services']);

// ����·�ɹ��򣬽���URLs��ģ�壬������֮���ӳ���ϵ
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'ListController',
            resolve: {
                results: ["MultiResultsLoader", function(MultiResultsLoader) {
                    return MultiResultsLoader();
                }]
            },
            templateUrl: 'views/bookList.html'
        }).
        when('/edit/:category', {
        controller: 'EditStatisController',
        templateUrl: 'views/editStatis.html'
    });
}]);

app.controller('ListController', ['$scope', '$location', 'results',
    function($scope, $location, results) {
        $scope.results = results;

        $scope.add = function() {
            $location.path('/edit/');
        }

        $scope.remove = function(index) {
            $scope.results.splice(index,1);
            // TODO: ����server
        };

        $scope.edit = function(category) {
            console.log("category:" + category);
            $location.path('/edit/' + category);
        }
    }]);

app.controller('EditStatisController', ['$scope', '$routeParams', 'Result',
    function($scope, $routeParams, Result) {

        $scope.result = new Result();
        $scope.result.load($routeParams.category);

    }]);