(function(window){
  'use strict';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var myTruck = new Truck('ncc-1701',new DataStore());

  // 在main.js中将Truck暴露到全局命名空间
  window.myTruck = myTruck;
})(window);
