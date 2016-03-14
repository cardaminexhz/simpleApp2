'use strict';

// 为simpleApp2创建一个模块
var app = angular.module('simpleApp2', ['simpleApp2.services']);

// 定义路由规则，建立URLs，模板，控制器之间的映射关系
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
            // TODO: 传给server
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