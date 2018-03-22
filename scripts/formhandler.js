(function(window){
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector){

    if(!selector){
      throw new Error('No selector provided');//未传入selector则抛出异常
    }

    this.$formElement = $(selector);
    if(this.$formElement.length === 0){
      throw new Error('Could not find element with selector: '+selector);
    };

  };

  FormHandler.prototype.addSubmitHandler = function(){
    console.log('Setting submit handler for form');
    this.$formElement.on('submit',function(event){
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item){  //遍历数组并复制每个元素的值
        data[item.name] = item.value;
        console.log(item.name + 'is' + item.value);
      });
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
