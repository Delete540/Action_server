

//
(function (window) {

  var createActionCircleButton = function () {
    var $doc = document,
        $body = $doc.body,
        backtopBtn,
        actionBtn,
        backtop = $doc.createElement('button'),
        action = $doc.createElement('button'),
        backtopIcon = $doc.createElement('i'),
        actionIcon = $doc.createElement('i');

    backtop.className = 'action-backtop btn-min circle square bc-dark-blue2';
    action.className = 'action-create btn-min circle square bc-dark-pink1';

    backtop.id = 'actionBacktop';
    action.id = 'actionDone';

    backtopIcon.className = 'material-icons';
    actionIcon.className = 'material-icons';

    backtopIcon.innerHTML = 'expand_less';
    actionIcon.innerHTML = 'create';

    backtopBtn = $body.appendChild(backtop);
    backtopBtn.appendChild(backtopIcon);
    actionBtn = $body.appendChild(action);
    actionBtn.appendChild(actionIcon);


    return {
      backtopButton: backtopBtn,
      actionButton: actionBtn
    };

  },

  actionCircleButtonScorllEvent = function (e, scorllTop, buttons) {
      var backtopBtn = buttons.backtopButton,
          actionBtn = buttons.actionButton,
          header = Matcha.find('#actionHeader');

      if (scorllTop > header.elements[0].offsetHeight) {
        backtopBtn.classList.add('grow');
        actionBtn.classList.add('grow');
      } else {
        backtopBtn.classList.remove('grow');
        actionBtn.classList.remove('grow');
      }
    };

  Matcha.initEvent(function () {
    var buttons = createActionCircleButton();
    window.addEventListener('scroll', function (e) {
      actionCircleButtonScorllEvent(e, document.body.scrollTop, buttons);
    });
  });

})(window);