//
(function (window) {
  var element,targetSidenav;
  document.addEventListener('DOMContentLoaded', function(){
    element=Matcha.find('#actionHeaderNav .action-hamburg');
    element.click(function(e){
      console.log('a');
    });
  }, false);


})(window);