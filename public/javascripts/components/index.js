/*!
 * Matcha test UI 
 * 
 * author Jun
 * Github https://github.com/Delete540 
 */

'use script';

var Matcha = {};

(function(window){

  var $doc;

  if(window.Package){
    Matcha = {};
  } else {
    window.Matcha = {};
  }

  
  if(window.document){
    $doc = window.document;
  }

  Matcha = {
    fn:function(elements,selector,callback){

      this.elements = elements;
      this.selector = selector;
      if(callback){
        this.callback = callback(this);
      }

      return this;
    },

    init: function(){

      var arg=[],
          props;
      
      if(arguments[0]===undefined || typeof arguments[0]!='object' || arguments[0].length<=0){
        return;
      }

      arg[0] = arguments[0];

      if(arguments[1] && typeof arguments[1] ==='string'){
        arg[1] = arguments[1];
      }

      if(arguments[2] && typeof arguments[2] ==='function'){
        arg[2] = arguments[2];
      }

      Matcha.fn.prototype = {
        eq: function(num){
          var object;
          object = (new Matcha.fn(arg[0][num],arg[1]));
          return object;
        },
        addClass: function(className){
          for(var i=0;i<this.elements.lenght;i++){
            this.elements[i].classList.add(className);
          }
          return this;
        },
        removeClass: function(className){
          for(var i=0;i<this.elements.lenght;i++){
            this.elements[i].classList.remove(className);
          }
        },
        attr: function(attr1,attr2){
          var object = new Matcha.fn(arg[0][0],arg[1]).elements;
          if(attr2){
            object.setAttribute(attr1,attr2);
          }
          return object.getAttribute(attr1);
        },
        css: function(object){
          
          if(object && typeof object == 'object'){
            for(var i=0;i<this.elements.length;i++){
              var style ='';
              for(var key in object){
                style =style+key+':'+object[key]+';';
              }
              this.elements[i].setAttribute('style',style);
            }
          }
          return this; 
        },
        click: function(callback){
          if(callback && typeof callback === 'function'){
            document.addEventListener('DOMContentLoaded', function(e){

              document.body.addEventListener('mousedown', function(e){
                callback();
              }, false);

            }, false);
            
          }
        }
      };

      props = new Matcha.fn(arg[0],arg[1]);

      return props;
    },

    find: function(selector){
      return Matcha.init($doc.querySelectorAll(selector),selector);
    }

  };

})(window);


