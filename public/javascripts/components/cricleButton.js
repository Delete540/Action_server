

//
(function (window) {

  var createActionCircleButton = function () {
    var $doc = document,
      $body = $doc.body,
      buttonsCollection,
      backtopBtn,
      actionBtn,
      plusBtn,
      buttons = $doc.createElement('div'),
      backtop = $doc.createElement('button'),
      action = $doc.createElement('button'),
      plus = $doc.createElement('button'),
      backtopIcon = $doc.createElement('i'),
      actionIcon = $doc.createElement('i');
      plusIcon = $doc.createElement('i');

    plus.className = 'action-plus btn-min circle square bc-dark-blue2';
    backtop.className = 'action-backtop btn-min circle square bc-dark-blue2';
    action.className = 'action-create btn-min circle square bc-dark-pink1';

    plus.id = 'actionPlus',
    backtop.id = 'actionBacktop';
    action.id = 'actionDone';

    plusIcon.className = 'material-icons';
    backtopIcon.className = 'material-icons';
    actionIcon.className = 'material-icons';

    plusIcon.innerHTML = 'add';
    backtopIcon.innerHTML = 'expand_less';
    actionIcon.innerHTML = 'create';

    buttons.className = 'action-buttons-collection';

    plusBtn = $body.appendChild(plus);
    plusBtn.appendChild(plusIcon);
    backtopBtn = $body.appendChild(backtop);
    backtopBtn.appendChild(backtopIcon);
    actionBtn = $body.appendChild(action);
    actionBtn.appendChild(actionIcon);

    buttonsCollection=$body.appendChild(buttons);
    buttonsCollection.appendChild(plusBtn);
    buttonsCollection.appendChild(backtopBtn);
    buttonsCollection.appendChild(actionBtn);

    return {
      backtopButton: backtopBtn,
      actionButton: actionBtn,
      plusButton:plusBtn
    };

  },

    actionPlusButtonScorllEvent = function (e, scorllTop, buttons) {
      var backtopBtn = buttons.backtopButton,
        actionBtn = buttons.actionButton,
        header = Matcha.find('#actionHeader');

      if (scorllTop > header.elements[0].offsetHeight) {
        backtopBtn.classList.add('grow');
      } else {
        backtopBtn.classList.remove('grow');
      }
      if (document.body.offsetWidth < 601) {
          flag = true;
      }

      actionBtnGrowEvent();

      window.addEventListener('resize', function (e) {
         actionBtn.classList.add('grow');
      });


      function actionBtnGrowEvent() {
        var flag = false;

        if (scorllTop > header.elements[0].offsetHeight + (Matcha.find('#actionCreate').elements[0].offsetHeight * 2) + Matcha.find('#actionCreate').elements[0].offsetTop * 2) {
          flag = true;
        } else {
          if (document.body.offsetWidth < 601) {
            flag = true;
          } else {
            flag = false;
          }

        }


        if (flag) {
          actionBtn.classList.add('grow');
        } else {
          actionBtn.classList.remove('grow');
        }
      }
    };

  Matcha.initEvent(function () {
    var buttons = createActionCircleButton();
    window.addEventListener('scroll', function (e) {
      actionPlusButtonScorllEvent(e, document.body.scrollTop, buttons);
    });


  });

})(window);