'use strict';

var services = angular.module('simpleApp2.services', ['ngResource']);

services.factory('MultiResultsLoader', ['$http', '$q',
    function($http, $q) {
        return function() {
            var results = {};
            var myUrl = "http://localhost:8081/statistic";
            var delay = $q.defer();

            $http.get(myUrl)
                .success(function (data, status) {
                    results = data;
                    console.log(status + ": http get success");
                    console.log(results);
                    delay.resolve(results);
                })
                .error(function (data, status) {
                    console.log(status + ': Unable to fetch books');
                    delay.reject(status);
                });
            return delay.promise;
        }
    }
]);

// 获取单条记录
services.factory('ResultLoader', ['$http', '$q', '$route', '$routeParams',
    function($http, $q, $route, $routeParams) {
        return function() {
            console.log("in service:" + $route.current.params.category);
            //console.log("in server:" + $routeParams.category);

            var result = {};
            var myUrl = "http://localhost:8081/statistic";
            var delay = $q.defer();

            $http({
                method: 'GET',
                url: myUrl,
                params: {category: $route.current.params.category}
            })
                .success(function (data, status) {
                    console.log("http get success");
                    result = data;
                    console.log(status);
                    console.log(result);
                    delay.resolve(result);
                })
                .error(function (data, status) {
                    console.log(status);
                    delay.reject('Unable to fetch recipes');
                });
            return delay.promise;
        }
    }
]);

services.factory('Result', ['$http', '$q',
    function($http) {
        function Result(resultData) {
            // Some other initializations related to result
            if (resultData) {
                this.setData(resultData);
            }
        };
        var myUrl = "http://localhost:8081/statistic";

        Result.prototype = {
            setData: function(bookData) {
                angular.extend(this, bookData);
            },
            load: function(category) {
                var scope = this;
                $http({
                    method: 'GET',
                    url: myUrl,
                    params: {category: category}
                }).success(function(data) {
                    console.log(status);
                    scope.setData(data);
                });
            }
        };
        return Result;
    }]);
/*

services.factory('Book', ['$http',
    function($http) {
        function Book(bookData) {
            if (bookData) {
                this.setData(bookData);
            }
            // Some other initializations related to book
        };

        Book.prototype = {
            setData: function(bookData) {
                angular.extend(this, bookData);
            },
            load: function(id) {
                var scope = this;
                $http.get('ourserver/books/' + bookId).success(function(bookData) {
                    scope.setData(bookData);
                });
            },
            delete: function() {
                $http.delete('ourserver/books/' + bookId);
            },
            update: function() {
                $http.put('ourserver/books/' + bookId, this);
            },
            getImageUrl: function(width, height) {
                return 'our/image/service/' + this.book.id + '/width/height';
            },
            isAvailable: function() {
                if (!this.book.stores || this.book.stores.length === 0) {
                    return false;
                }
                return this.book.stores.some(function(store) {
                    return store.quantity > 0;
                });
            }
        };
        return Book;
}]);
*/
