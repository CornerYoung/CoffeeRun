(function(window){
  'use strict';
  // 对象能将任意数据和键名关联到一起。用一个对象来作为CoffeeRun的命名空间，这个命名空间是各个模块注册的地方。
  // 利用IIFE来建立命名空间需要三步：
  // 1.如果命名空间已经存在，获取它的引用。
  // 2.创建模块代码。
  // 3.将模块代码绑定到命名空间上。
  var App = window.App || {};

  function DataStore(){
    this.data = {};
    // this.add = function(key,val){
    //   this.data[key] = val;
    // };
  };

  DataStore.prototype.add = function(key,val){
    this.data[key] = val;
  };

  DataStore.prototype.get = function(key){
    return this.data[key];
  };

  DataStore.prototype.getAll = function(){
    return this.data;
  };

  DataStore.prototype.remove = function(key){
    delete this.data[key];
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
