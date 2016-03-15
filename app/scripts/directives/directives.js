'use strict';

var app = angular.module('simpleApp2.directives', []);

app.directive('hello', function() {
    return {
        restrict: "E",
        replace: true,
        template: "<div>Hello readers, thank you for coming</div>"
    }
});