angular.module('starter')

.controller('tableCtrl', function($scope, $http, time){
	$scope.loading = false;
	var n = angular.fromJson(localStorage.getItem('table'));
	
	$scope.table = [];
	var localtime = (moment().zone("+05:30").hour() > 16 && moment().zone('+05:30').hour() < 23);
	var execute = function(){
	if(n){
		
		$scope.table = n;
		if(navigator.connection && navigator.connection.type != 'none' && localtime ){
			$scope.loading = true;
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
			$http.get('https://dl.dropboxusercontent.com/u/55791376/isl/table.json')
			.success(function(data, status, headers, config){
				var newdata = angular.fromJson(data);
				localStorage.setItem('table', JSON.stringify(data));
				$scope.loading = false;
				$scope.table = newdata;
			})
			.error(function(data, status, headers, config){
				$scope.loading = false;
				
				window.plugins.toast.show('Error Loading data','short','bottom');
			});
		}
		else{
			$scope.loading = false;
			
			window.plugins.toast.show('PLease connect to the internet','short','bottom');
		}
	}
	}

	$scope.refresht = function(e){
	localtime = true;
	execute();
	localtime = (moment().zone("+05:30").hour() > 16 && moment().zone('+05:30').hour() < 23);
	
	
}
	ionic.Platform.ready(execute());

})

/* ------------ CONTTROLLER FOR NEWS TAB  ---------  */

.controller('newsCtrl', function($scope, $http, time){
	
	$scope.refresh = false;
$scope.loading = false;

$scope.news = [];
var n = angular.fromJson(localStorage.getItem('news'));
var execute = function(){
	if(n){
		
		$scope.news = n;
		if(navigator.connection && navigator.connection.type != 'none' && (moment().diff(time, 'minutes') > 15 || moment().diff(time, 'minutes') < 1) ){
			$scope.loading = true;
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
			
			window.plugins.toast.show('PLease connect to the internet','short','bottom');
		}
	}}
$scope.refreshm = function(e){
	execute();
}
execute();
})

/* ---------- CONTROLLER FOR FIXTURES ----------------  */

.controller('fixturesCtrl', function($scope, $http, time){
	 
	$scope.loading = false;
	
	$scope.loadMore = !$scope.loading;
	$scope.fixtures = [];
	var fixtures = [];
	var localtime = (moment().zone("+05:30").hour() > 16 && moment().zone('+05:30').hour() < 23);
	var n = localStorage.getItem('fixtures');
	var execute = function(){
		
		if(n){
			fixtures = angular.fromJson(n);
			$scope.fixtures = fixtures.slice(0,9);
		
		if(true && localtime){
			$scope.loading = true;
			$http.get('https://dl.dropboxusercontent.com/u/55791376/isl/fixtures.json')
			.success(function(data, status, headers, config){
				fixtures = angular.fromJson(data);
				fixtures.forEach(function(e,i){
					e.display = moment(e.date, "DD-MM-YYYY HH:mm").calendar();
					
				});
				$scope.loading = false;

			$scope.fixtures = fixtures.slice(0,9);
			localStorage.setItem('fixtures', JSON.stringify(fixtures));
			
		})
		.error(function(data, status, headers, config){
			$scope.loading = false;
			
		});
	}
	else{
		
		$scope.loading = false;
		
	}
}
	else{
		if(true){
			$scope.loading = true;
					$http.get('https://dl.dropboxusercontent.com/u/55791376/isl/fixtures.json')
			.success(function(data, status, headers, config){
				fixtures = angular.fromJson(data);
				fixtures.forEach(function(e,i){
					e.display = moment(e.date, "DD-MM-YYYY HH:mm").calendar();
					
				});
				$scope.loading = false;

			$scope.fixtures = fixtures.slice(0,10);
			localStorage.setItem('fixtures', JSON.stringify(fixtures));
			
		})
		.error(function(data, status, headers, config){
			$scope.loading = false;
			 
			window.plugins.toast.show('Error loading','short','bottom');
		});
				}
		else{
				$scope.loading = false;
				 
				window.plugins.toast.show('PLease connect to the internet','short','bottom');}
	}
		}
	$scope.loadMore = function(e){
		$scope.fixtures = $scope.fixtures.concat(fixtures.slice($scope.fixtures.length,$scope.fixtures.length+9));
	}
	$scope.refreshf = function(e){
		localtime = true;
		execute();
		localtime = (moment().zone("+05:30").hour() > 16 && moment().zone('+05:30').hour() < 23);
	}
	execute();

})
.controller('resultsCtrl', function($scope,$http, time){
	
	$scope.loading = false;
	 
	$scope.loadMore = !$scope.loading;
	$scope.results = [];
	var results = [];
	var localtime = (moment().zone("+05:30").hour() > 16 && moment().zone('+05:30').hour() < 23);
	var n = localStorage.getItem('results');
	var execute = function(){
		if(n){
			results = angular.fromJson(n);
		$scope.results = results.slice(0,9);
				if(navigator.connection && navigator.connection.type != 'none' && localtime){
					console.log("hey")
					$scope.loading  = true;
					$http.get('https://dl.dropboxusercontent.com/u/55791376/isl/results.json')
					.success(function(data, status, headers, config){
						localStorage.setItem('results',JSON.stringify(data));
						results = angular.fromJson(data);
						results.forEach(function(e,i){
							e.display = moment(e.date, "DD-MM-YYYY HH:mm").calendar();
				
						});
						$scope.loading = false;
					$scope.results = results.slice(0,9);
					localStorage.setItem('results',JSON.stringify(results));
					
				})
				.error(function(data, status, headers, config){
					$scope.loading = false;
					$scope.results = results.slice(0,9);
					
				});
			}
			else{
				$scope.loading = false;
			}
		}
	else{
		if(navigator.connection && navigator.connection.type != 'none'){
			$scope.loading = true; 
			$http.get('https://dl.dropboxusercontent.com/u/55791376/isl/results.json')
					.success(function(data, status, headers, config){
						localStorage.setItem('results',JSON.stringify(data));
						results = angular.fromJson(data);
						results.forEach(function(e,i){
							e.display = moment(e.date, "DD-MM-YYYY HH:mm").calendar();
				
						});
						$scope.loading = false;
					$scope.results = results.slice(0,10);
					localStorage.setItem('results',JSON.stringify(results));
					
				})
				.error(function(data, status, headers, config){
					$scope.loading = false;
					window.plugins.toast.show('error loading','short','bottom');
				});
		}
		else{
				
				$scope.loading = false;
				window.plugins.toast.show('PLease connect to the internet','short','bottom');}
	}
		}
	$scope.loadMore = function(e){
		$scope.results = $scope.results.concat(results.slice($scope.results.length,$scope.results.length+9));
	}
	$scope.refreshr = function(e){
		localtime = true;
		execute();
		localtime = (moment().zone("+05:30").hour() > 16 && moment().zone('+05:30').hour() < 23);
		
		
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
