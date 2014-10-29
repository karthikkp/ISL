angular.module('starter')

.controller('tableCtrl', function($scope, $http, time){
	
	$scope.table = [];
	if(localStorage.getItem('table')){
		if(true && (moment().diff(time, 'minutes') > 15 | moment().diff(time, 'minutes') < 1) ){
			console.log("hey im inside"+ moment().diff(time, 'minutes'));
			$http.get('./table.json')
			.success(function(data, status, headers, config){
				var newdata = angular.fromJson(data);
				var n = angular.fromJson(localStorage.getItem('table'));
				
				if(newdata[0].date != n[0].date){
					
					$scope.table = newdata;
					localStorage.setItem('table', JSON.stringify(data));
				}
				else{
					$scope.table = newdata;
				}
			})
			.error(function(data, status, headers, config){
				alert("Error occured..!!");
			});
		}
		else{
			$scope.table = angular.fromJson(localStorage.getItem('table'));
		}
	}
	else{
		if(true){
			console.log("hey");
			$http.get('./table.json')
			.success(function(data, status, headers, config){
				var newdata = angular.fromJson(data);
				localStorage.setItem('table', JSON.stringify(data));
				$scope.table = newdata;
			})
			.error(function(data, status, headers, config){
				alert("Error occured..!!");
			});
		}
		else{
			alert("PLease connect to the internet");
		}
	}
	
})

.controller('newsCtrl', function($scope, $http, time){

$scope.news = [];
var n = angular.fromJson(localStorage.getItem('news'));
	if(localStorage.getItem('news')){
		if(true && (moment().diff(time, 'minutes') > 15 | moment().diff(time, 'minutes') < 1) ){
			$http.get('./news.json')
			.success(function(data, status, headers, config){
				var newdata = angular.fromJson(data);
				
				
				if(newdata[0].date != n[0].date){
					
					$scope.news = newdata;
					localStorage.setItem('news', JSON.stringify(data));
				}
				else{
					$scope.news = newdata;
				}
			})
			.error(function(data, status, headers, config){
				alert("Error occured..!!");
			});
		}
		else{
			$scope.table = n;
		}
	}
	else{
		if(true){
			$http.get('./news.json')
			.success(function(data, status, headers, config){
				var newdata = angular.fromJson(data);
				localStorage.setItem('news', JSON.stringify(data));
				$scope.news = newdata;
			})
			.error(function(data, status, headers, config){
				alert("Error occured..!!");
			});
		}
		else{
			alert("PLease connect to the internet");
		}
	}
	

})

.controller('fixturesCtrl', function($scope, $http){
	$scope.fixtures = [];
	var fixtures = [];
	$http.get('./fixtures.json')
	.success(function(data, status, headers, config){
		fixtures = angular.fromJson(data);
		fixtures.forEach(function(e,i){
			e.display = moment(e.date, "DD-MM-YYYY HH:mm").calendar();

		});
		fixtures.sort(function(d1,d2){
			if(moment(d1).isAfter(d2))
				return -1;
			else
				return 1;
		});
		$scope.fixtures = fixtures.slice(0,10);
		
	})
	.error(function(data, status, headers, config){
		alert("error");
	});
	
	$scope.loadMore = function(e){
		$scope.fixtures.concat(fixtures.slice($scope.fixtures.length,$scope.fixtures.length+10));
	}
})

.controller('detailCtrl', function($scope, $stateParams){
	var info = angular.fromJson(localStorage.getItem('news'));
	$scope.info = info[$stateParams.id];

	$scope.fb = function(e){
		window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(e.target.dataset.head, null, null, 'Your message', function(){
			window.plugins.toast.show('share OK','short','bottom');},
			function(error){
				window.plugins.toast.show('Error !','short','bottom');
			
		});
	}
	$scope.twitter = function(e){
		console.log(e);
		window.plugins.socialsharing.shareViaTwitter(e.target.dataset.head, null, null, function(){
			window.plugins.toast.show('share OK','short','bottom');
		}, function(err){
			window.plugins.toast.show('Error! Tweet failed', 'short', 'bottom')
			});
	}
	$scope.whatsapp = function(e){
		window.plugins.socialsharing.shareViaWhatsapp(e.target.dataset.head,  null, null, function(){
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
        dialogTitle : e.target.dataset.head,         
        url : "http://is.gd/DikVaQ",          
        text : e.target.dataset.head
                                                
    }
);

	}

});
