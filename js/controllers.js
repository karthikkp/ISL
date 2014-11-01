angular.module('starter')

.controller('tableCtrl', function($scope, $http, time){
	var n = angular.fromJson(localStorage.getItem('table'));
	$scope.refresh = false;
	$scope.table = [];
	
	var execute = function(){
	if(localStorage.getItem('table')){
		$scope.loading = true;
		$scope.table = n;
		if(navigator.connection && navigator.connection.type != 'none' && (moment().diff(time, 'minutes') > 15 | moment().diff(time, 'minutes') < 1) ){
			
			$http.get("https://dl.dropboxusercontent.com/u/55791376/isl/table.json")
			.success(function(data, status, headers, config){
				var newdata = angular.fromJson(data);
				if(newdata[0].count != n[0].count){
					
					$scope.table = newdata;
					localStorage.setItem('table', JSON.stringify(data));
					$scope.loading = false;
				}
				else{
					$scope.loading = false;
					$scope.table = newdata;
				}
			})
			.error(function(data, status, headers, config){
				$scope.loading = false;
				window.plugins.toast.show('error loading','short' , 'bottom');
				$scope.table = n;
			});
		}
		else{
			$scope.loading = false;
			$scope.table = n;
		}
	}
	else{
		if(navigator.connection && navigator.connection.type != 'none'){
			$scope.loading = true;
			$http.get('http://dl.dropboxusercontent.com/u/55791376/isl/table.json')
			.success(function(data, status, headers, config){
				var newdata = angular.fromJson(data);
				localStorage.setItem('table', JSON.stringify(data));
				$scope.loading = false;
				$scope.table = newdata;
			})
			.error(function(data, status, headers, config){
				$scope.loading = false;
				$scope.refresh = true;
				window.plugins.toast.show('Error Loading data','short','bottom');
			});
		}
		else{
			$scope.loading = false;
			$scope.refresh = true;
			window.plugins.toast.show('PLease connect to the internet','short','bottom');
		}
	}
	}
	ionic.Platform.ready(execute);
$scope.refresht = function(e){
	execute();
	
	
}
})

/* ------------ CONTTROLLER FOR NEWS TAB  ---------  */

.controller('newsCtrl', function($scope, $http, time){
	
	$scope.refresh = false;
$scope.loading = true;

$scope.news = [];
var n = angular.fromJson(localStorage.getItem('news'));
var execute = function(){
	if(n){
		$scope.loading = true;
		if(navigator.connection && navigator.connection.type != 'none' && (moment().diff(time, 'minutes') > 15 | moment().diff(time, 'minutes') < 1) ){
			$http.get('http://dl.dropboxusercontent.com/u/55791376/isl/news.json')
			.success(function(data, status, headers, config){
				var newdata = angular.fromJson(data);
				if(newdata[0].count != n[0].count){
					$scope.loading = false;
					$scope.news = newdata;
					localStorage.setItem('news', JSON.stringify(data));
				}
				else{
					$scope.loading = false;
					$scope.news = newdata;
				}
			})
			.error(function(data, status, headers, config){
				$scope.loading = false;
				$scope.news = n;
				window.plugins.toast.show('Error Loading','short','bottom');
			});
		}
		else{
			$scope.loading = false;
			$scope.news = n;
		}
	}
	else{
		if(navigator.connection && navigator.connection.type != 'none'){
			$scope.loading = true;
			$http.get('https://dl.dropboxusercontent.com/u/55791376/isl/news.json')
			.success(function(data, status, headers, config){
				var newdata = angular.fromJson(data);
				localStorage.setItem('news', JSON.stringify(data));
				$scope.loading = false;
				$scope.news = newdata;
			})
			.error(function(data, status, headers, config){
				$scope.loading = false;
				$scope.refresh = true;
				window.plugins.toast.show('Error Loading','short','bottom');
			});
		}
		else{
			$scope.loading = false;
			$scope.refresh = true;
			window.plugins.toast.show('PLease connect to the internet','short','bottom');
		}
	}}
$scope.refreshm = function(e){
	execute();
}
execute();
})

/* ---------- CONTROLLER FOR FIXTURES ----------------  */

.controller('fixturesCtrl', function($scope, $http){
	$scope.refresh = false;
	$scope.loading = true;
	$scope.loadMore = !$scope.loading && !$scope.refresh;
	$scope.fixtures = [];
	var fixtures = [];
	var n = localStorage.getItem('fixtures');
	var execute = function(){
		$scope.loading = true;
		if(navigator.connection && navigator.connection.type != 'none'){
			$http.get('http://dl.dropboxusercontent.com/u/55791376/isl/fixtures.json')
			.success(function(data, status, headers, config){
				fixtures = angular.fromJson(data);
				fixtures.forEach(function(e,i){
					e.display = moment(e.date, "DD-MM-YYYY HH:mm").calendar();
					
				});
				$scope.loading = false;

			$scope.fixtures = fixtures.slice(0,10);
			localStorage.setItem('fixtures', JSON.stringify(data));
			
		})
		.error(function(data, status, headers, config){
			$scope.loading = false;
			$scope.refresh = true;
			window.plugins.toast.show('Error loading','short','bottom');
		});
	}
	else if(n){
		fixtures = angular.fromJson(n);
		$scope.loading = false;
		$scope.fixtures = fixtures.slice(0,10);
	}
	else{
		$scope.loading = false;
		$scope.refresh = true;
		window.plugins.toast.show('PLease connect to the internet','short','bottom');
	}
		}
	$scope.loadMore = function(e){
		$scope.fixtures = $scope.fixtures.concat(fixtures.slice($scope.fixtures.length-1,$scope.fixtures.length+10));
	}
	$scope.refreshf = function(e){
		execute();
	}
	execute();

})
.controller('resultsCtrl', function($scope,$http){
	$scope.refresh = false;
	$scope.loading = true;
	$scope.loadMore = !$scope.loading && !$scope.refresh;
	$scope.results = [];
	var results = [];
	var n = localStorage.getItem('results');
	var execute = function(){
		$scope.loading  = true;
		if(navigator.connection && navigator.connection.type != 'none'){
			$http.get('./results.json')
			.success(function(data, status, headers, config){
				localStorage.setItem('results',JSON.stringify(data));
				results = angular.fromJson(data);
				results.forEach(function(e,i){
					e.display = moment(e.date, "DD-MM-YYYY HH:mm").calendar();
		
				});
				$scope.loading = false;
			$scope.results = results.slice(0,10);
			
		})
		.error(function(data, status, headers, config){
			$scope.loading = false;
			
			window.plugins.toast.show('error loading','short','bottom');
		});
	}
	else if(n){
		results = angular.fromJson(n);
		$scope.loading = false;
		$scope.results = results.slice(0,10);
	}
	else{
		$scope.refresh = true;
		$scope.loading = false;
		window.plugins.toast.show('PLease connect to the internet','short','bottom');
	}
		}
	$scope.loadMore = function(e){
		$scope.results = $scope.results.concat(fixtures.slice($scope.results.length-1,$scope.results.length+10));
	}
	$scope.refreshr = function(e){
		execute();
		
		
	}
execute();
})	

/* -----------  CONTROLLER FOR DETAILS OF NEWS TAB -------------*/

.controller('detailCtrl', function($scope, $stateParams){

	var info = angular.fromJson(localStorage.getItem('news'));
	$scope.info = info[$stateParams.id-1];

	$scope.fb = function(e){
		window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(e.target.dataset.head + " " + e.target.dataset.url,null, "www.google.com", 'Your message', function(){
			window.plugins.toast.show('share OK','short','bottom');},
			function(error){
				window.plugins.toast.show('Error !','short','bottom');
			
		});
	}

	$scope.twitter = function(e){
		window.plugins.toast.show(e);
		window.plugins.socialsharing.shareViaTwitter(e.target.dataset.head + " " + e.target.dataset.url, null, "www.google.com", function(){
			window.plugins.toast.show('share OK','short','bottom');
		}, function(err){
			window.plugins.toast.show('Error! Tweet failed', 'short', 'bottom')
			});
	}

	$scope.whatsapp = function(e){
		window.plugins.socialsharing.shareViaWhatsApp(e.target.dataset.head + " " + e.target.dataset.url,null, "www.google.co.in", function(){
			window.plugins.toast.show('share OK','short','bottom');
		}, function(err){
				window.plugins.toast.show('Error !','short','bottom');
			});
	}

	$scope.other = function(e){
		window.plugins.SocialShare.share(
    function(){},
    function(){},
    {
        dialogTitle : e.target.dataset.head + " " + e.target.dataset.url,         
        url : "http://is.gd/DikVaQ",          
        text : e.target.dataset.head + " " + e.target.dataset.url
                                                
    }
);

	}

});
