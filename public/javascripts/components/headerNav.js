//
(function (window) {

  var $doc = document,

    headNavScrollEvent = function () {
      var elements = [],
        baseHeight = Matcha.find('#actionHeader').elements[0].offsetHeight -64,
      cards = Matcha.find('#actionContent .container .col.col-8 .card'),
      $docScrollTop = $doc.body.scrollTop,
      navTitle = Matcha.find('#actionNavCenterTitle').elements[0];
      userPhoto = Matcha.find('#actionNavCreateUserPhoto img').elements[0];
      /*var card0 = {};
      card0.element = cards.elements[0];
      card0.top = baseHeight + cards.elements[0].offsetTop;
      card0.bottom = card0.top + cards.elements[0].offsetHeight;
      elements.push(card0);*/
      for (var i = 0; i < cards.elements.length; i++) {
        var card = {};
        card.element = cards.elements[i];
        card.top = baseHeight + cards.elements[i].offsetTop;
        card.bottom = card.top + cards.elements[i].offsetHeight;
        elements.push(card);
      }
      if (elements && elements.length > 0) {
        for (var j = 0; j < elements.length;j++){
          console.log($docScrollTop);
          if($docScrollTop>baseHeight && $docScrollTop<=elements[j].bottom && $docScrollTop>=elements[j].top){
            //console.log(Matcha.find('#actionHeaderNav container h5'));
            navTitle.innerHTML = elements[j].element.getAttribute('data-action-title');
            userPhoto.src = elements[j].element.getAttribute('data-photo');
            userPhoto.parentNode.classList.add('grow');
            break;
          }else{
            navTitle.innerHTML = '';
            userPhoto.parentNode.classList.remove('grow');
          }
        }
      }
    };

  Matcha.initEvent(function () {
    headNavScrollEvent();
    window.addEventListener('scroll', function (e) {
      headNavScrollEvent();
    });
  });

})(window);