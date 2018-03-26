(function(window){
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url){
    if(!url){
      throw new Error('没有提供远程URL!')
    };

    this.serverUrl = url;
  };

  RemoteDataStore.prototype.add = function(key,val){
    $.post(this.serverUrl,val,function(serverResponse){
      console.log(serverResponse);
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;

})(window);
