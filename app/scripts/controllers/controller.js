'use strict';

// 为simpleApp2创建一个模块
var app = angular.module('simpleApp2', ['simpleApp2.services', 'simpleApp2.directives']);

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

/**
 * [factory] step2. 控制器变得非常简单。
 * 它创建一个Result实例，指派给scope，并从后台加载。
 * 当Result被加载成功时，它的属性会被改变，模板也随着被更新。
 * 记住其他的控制器想要使用Result功能，只要简单地注入Result服务即可
 */
app.controller('EditStatisController', ['$scope', '$routeParams', 'Result',
    function($scope, $routeParams, Result) {

        $scope.result = new Result();
        $scope.result.load($routeParams.category);

    }]);