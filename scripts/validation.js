(function(window){
  'use strict';
  var App = window.App || {};

  var Validation = {  //Validation 只用于组织函数，所以它不需要写构造函数
    isCompanyEmail: function(email){
      return /.+@bignerdranch\.com$/.test(email);
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
