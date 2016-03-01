angular.module('controllers', [])

  .controller('globalController', ['$scope', function($scope) {
    		$scope.mochaCollapsed = true;
	   }
  ])

  .controller('welcomeController', ['$scope', '$injector',
    function($scope, $injector) {
	      require(['controllers/welcomeController'], function(ctrl) {
          			$injector.invoke(ctrl, this, {'$scope': $scope});
      	});
    }
  ])

  .controller('loginController', ['$scope', '$injector',
    function($scope, $injector) {
	      require(['controllers/loginController'], function(ctrl) {
          			$injector.invoke(ctrl, this, {'$scope': $scope});
      	});
    }
  ]);
