/*
 * angular-currenct v0.0.1
 * (c) 2015-2016 Brandon Krueger <brandon.c.krueger@gmail.com>
 * License: MIT
 */

angular.module('angular-currency', [])
.directive('angularCurrency', [function () {
	'use strict';
	
	return {
		'require': '?ngModel',
		'restrict': 'A',
		'scope': {
			angularCurrency: '=',
			variableOptions: '='
		},
		'compile': compile
	};
	
	function compile(tElem, tAttrs) {
		var isInputText = tElem.is('input:text');

		return function(scope, elem, attrs, controller) {
			var updateElement = function (newVal) {
				if ($.isNumeric(newVal)) {
					elem.autoNumeric('set', newVal);
				}
			};
			
			elem.autoNumeric('init', scope.angularCurrency);
			if (scope.variableOptions === true) {
				scope.$watch('angularCurrency', function(newValue) {
					elem.autoNumeric('update', newValue);
				});
			}

			if (controller && isInputText) {
				scope.$watch(tAttrs.ngModel, function () {
					controller.$render();
				});

				controller.$render = function () {
					updateElement(controller.$viewValue);
				};

				elem.on('keypress', function () {
					scope.$apply(function () {
						controller.$setViewValue(elem.autoNumeric('get'));
					});
				});
			} else {
				if (isInputText) {
					attrs.$observe('value', function (val) {
						updateElement(val);
					});
				}
			}
		};
	}
}]);