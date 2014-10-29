angular.module('starter')

.factory('time',function(){
  localStorage.setItem('time', moment());
  return localStorage.setItem('time', moment());
});


