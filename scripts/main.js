(function(window){
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  //var myTruck = new Truck('ncc-1701',new DataStore());
  var myTruck = new Truck('ncc-1701',remoteDS);

  // 在main.js中将Truck暴露到全局命名空间
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);

  // 我们希望每次发生submit事件时都调用 createOrder，但是我们不能只传递一个 createOrder 的引用到 formHandler.addSubmitHandler，
  // 因为 createOrder 在事件处理回调中被调用时，他的所有者会有所变化。
  // 此时， createOrder 内部的this将不再是 Trunk 实例，这导致了 createOrder 运行时报错。
  // 应该把 myTrunk.createOrder 的所有者绑定为myTrunk，然后再把这个函数传给 ormHandler.addSubmitHandler。
  formHandler.addSubmitHandler(function(data){
    myTruck.createOrder.call(myTruck,data);  //当 createOrder 和 addRow 被调用时，传递了正确的this值和表单中的数据
    checkList.addRow.call(checkList,data);
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);


})(window);
