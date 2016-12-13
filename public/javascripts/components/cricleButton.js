

//
(function (window) {

  var createActionCircleButton = function () {
    var $doc = document,
      $body = $doc.body,
      buttonsCollection,
      backtopBtn,
      actionBtn,
      plusBtn,

      backtop = $doc.createElement('button'),
      action = $doc.createElement('button'),
      plus = $doc.createElement('button'),
      backtopIcon = $doc.createElement('i'),
      actionIcon = $doc.createElement('i'),
      plusIcon = $doc.createElement('i'),

      buttons = $doc.createElement('div');

    plus.className = 'action-plus btn-min circle square bc-dark-blue2';
    backtop.className = 'action-backtop btn-min circle square bc-dark-blue2';
    action.className = 'action-create-circle btn-min circle square bc-dark-pink1';

    plus.id = 'actionPlus';
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

    buttonsCollection = $body.appendChild(buttons);
    buttonsCollection.setAttribute('style', 'width: 48px;position: fixed;right: 5%;bottom: 64px;');

    buttonsCollection.appendChild(backtopBtn);
    buttonsCollection.appendChild(actionBtn);
    buttonsCollection.appendChild(plusBtn);

    return {
      backtopButton: backtopBtn,
      actionButton: actionBtn,
      plusButton: plusBtn
    };

  },

    actionPlusButtonScorllEvent = function (scorllTop, buttons, e) {
      var plusBtn = buttons.plusButton,
        backtopBtn = buttons.backtopButton,
        actionBtn = buttons.actionButton,
        header = Matcha.find('#actionHeader');
      plusBtn.onclick = function () {
        if (backtopBtn.className.indexOf('grow') != -1 && actionBtn.className.indexOf('grow') != -1) {
          backtopBtn.classList.remove('grow');
          actionBtn.classList.remove('grow');
        } else {
          backtopBtn.classList.add('grow');
          actionBtn.classList.add('grow');
        }
      };

      if (scorllTop > header.elements[0].offsetHeight) {
        plusBtn.classList.add('grow');
      } else {
        plusBtn.classList.remove('grow');
        backtopBtn.classList.remove('grow');
        actionBtn.classList.remove('grow');
      }
      if (document.body.offsetWidth < 601) {
        flag = true;
      }

      plusBtnGrowEvent();

      

      window.addEventListener('resize', function (e) {
        plusBtn.classList.add('grow');
      });


      function plusBtnGrowEvent() {
        var flag = false;
 
        if (scorllTop > header.elements[0].offsetHeight) {
          flag = true;
        } else {
          if (document.body.offsetWidth < 601) {
            flag = true;
          } else {
            flag = false;
          }

        }


        if (flag) {
          plusBtn.classList.add('grow');
        } else {
          plusBtn.classList.remove('grow');
        }
      }
    },
    backtopButtonEvent = function (buttons) {
      var backtopBtn = buttons.backtopButton;
      
      timer = null;
      backtopBtn.onclick = function () {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      };
    };

  Matcha.initEvent(function () {
    var buttons = createActionCircleButton();

    backtopButtonEvent(buttons);

    actionPlusButtonScorllEvent(document.body.scrollTop, buttons);

    window.addEventListener('scroll', function (e) {

      

      actionPlusButtonScorllEvent(document.body.scrollTop, buttons, e);
    });


  });

})(window);