(function(window){
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector){
    if(!selector){
      throw new Error('没有提供选择器!');
    };

    this.$element = $(selector);
    if(this.$element.length === 0){
      throw new Error('无法找到该选择器的元素!')
    };
  };

  CheckList.prototype.addClickHandler = function(fn){
    //CheckList.prototype.addClickHandler 与 FormHandler.prototype.addSubmitHandler 工作方式相同
    // 1.接受一个函数参数；
    // 2.注册事件处理程序回调；
    // 3.在事件处理程序回调中调用第一步中的函数参数。
    //CheckList.prototype.addClickHandler 与 FormHandler.prototype.addSubmitHandler 不同的地方是：
    //它将监听一个点击事件并将回调绑定在 CheckList 实例上。

    this.$element.on('click','input',function(event){  //当且仅当点击事件是由 input 元素触发时才执行回调函数
      var email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));

  };

  CheckList.prototype.addRow = function(coffeeOrder){  //将每个Row实例的$element添加到页面的活动DOM上
    //移除匹配相应邮箱地址的已有行
    this.removeRow(coffeeOrder.emailAddress);

    //使用咖啡订单信息创建一个新的Row实例
    var rowElement = new Row(coffeeOrder);

    //把新的Row实例的$element属性添加到清单中
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function(email){
    this.$element
    .find('[value="'+ email +'"]')
    .closest('[data-coffee-order="checkbox"]')
    .remove();
  };

  function Row(coffeeOrder){
    var $div = $('<div></div>',{  //$div并不是一个实例变量，即：$div 不是 this.$div
      'data-coffee-order':'checkbox',
      'class':'checkbox'
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>',{
      type:'checkbox',
      value:coffeeOrder.emailAddress
    });

    var description = coffeeOrder.size + ' ';
    if(coffeeOrder.flavor){
      description += coffeeOrder.flavor + ' ';
    };
    description += coffeeOrder.coffee + ', ';
    description += ' ('+ coffeeOrder.emailAddress + ')';
    description += ' [' + coffeeOrder.strength + 'x]';

    // 1.把$checkbox追加到$label中；
    // 2.把description追加到$label中；
    // 3.把$label追加到$div中.
    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  };


  App.CheckList = CheckList;
  window.App = App;
})(window);
