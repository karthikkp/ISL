angular.module('starter')

.factory('time',function(){
  localStorage.setItem('time', moment().zone("+05:30"));
  return localStorage.getItem('time');
});