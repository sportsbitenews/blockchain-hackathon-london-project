(function(app) {
	app.controller('AcceptController', ['$scope', function($scope) {
		$scope.recipient = {
			address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
			balance: '20 USD'
		};
	}]);
})(smart_currency);
