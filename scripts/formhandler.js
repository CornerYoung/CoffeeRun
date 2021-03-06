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

  FormHandler.prototype.addSubmitHandler = function(fn){
    console.log('Setting submit handler for form');
    this.$formElement.on('submit',function(event){
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item){  //遍历数组并复制每个元素的值
        data[item.name] = item.value;
        console.log(item.name + 'is' + item.value);
      });
      console.log(data);
      fn(data);
      this.reset(); //调用表单的reset重置方法,提交表单后，旧数据在页面被删除
      this.elements[0].focus();  //重新聚焦
    });
  };

  FormHandler.prototype.addInputHandler = function(fn){
    console.log('Setting input handler for form');
    this.$formElement.on('input','[name="emailAddress"]',function(event){
      var emailAddress = event.target.value;
      var message = '';
      if(fn(emailAddress)){
        event.target.setCustomValidity('');
      }else{
        message = emailAddress + ' 不是一个合法的邮箱地址!'
        event.target.setCustomValidity(message);
      };
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
