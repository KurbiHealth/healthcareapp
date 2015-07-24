var kurbiApp = angular.module('kurbiPatient', ['ui.router', 'postDirectives']);

// LOAD CONFIGURATION FILE (ALLOW FOR DEV OVERRIDE)
angular.element(document).ready(
  function() {
    var initInjector = angular.injector(['ng']);
    var $http = initInjector.get('$http');

    $http.get('configDev.json')
    .success(function(data, status) {
        kurbiApp.constant('config', data);
        angular.bootstrap(document, ['kurbiPatient']);
    })
    .error(function(data, status, headers, config){
      $http.get('configTest.json')
      .success(function(data, status){
          kurbiApp.constant('config', data);
          angular.bootstrap(document, ['kurbiPatient']);
      })
      .error(function(data, status, headers, config){
        $http.get('config.json')
        .success(function(data){
            kurbiApp.constant('config', data);
            angular.bootstrap(document, ['kurbiPatient']);
        })
        .error(function(data, status, headers, config){
          var temp = {
            apiUrl: 'http://api.gokurbi.com/v1/',
            hdaApiUrl: 'http://hdaapi.gokurbi.com/v1/',
            environment: 'prod'
          }
          kurbiApp.constant('config', temp);
          angular.bootstrap(document, ['kurbiPatient']);
        }); // end of 3rd .error
      }); // end of 2nd .error
    }); // end of 1st .error
  }
);

kurbiApp.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/home');
	$stateProvider
        
  .state('home', {
      url: '/home',
      templateUrl: 'modules/feed/templates/index.html'
  })
  
  .state('journal', {
  	url: '/journal',
  	templateUrl: 'app/templates/journal_index.html'
  })
  
  .state('care-plan', {
  	url: '/care-plan',
  	templateUrl: 'app/templates/care-plan_index.html'
  })
  
  .state('progress-chart', {
  	url: '/progress-chart',
  	templateUrl: 'app/templates/progress-chart_index.html'
  })
  
  ;
        
});

kurbiApp.run(['$rootScope', 'posts', 'api', 'user', '$q', 
function ($rootScope, posts, api, user, $q){

  api.postsInit(user,$rootScope); // sets $scope.posts

  api.careTeamInit(user,$rootScope); // sets $scope.careTeamList

}]);