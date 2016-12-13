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

      for (var i = 0; i < cards.elements.length; i++) {
        var card = {};
        card.element = cards.elements[i];
        card.top = baseHeight + cards.elements[i].offsetTop;
        card.bottom = card.top + cards.elements[i].offsetHeight;
        elements.push(card);
      }
      if (elements && elements.length > 0) {
        for (var j = 0; j < elements.length;j++){
          if(document.body.offsetWidth >600 && $docScrollTop>baseHeight && $docScrollTop<=elements[j].bottom && $docScrollTop>=elements[j].top){

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