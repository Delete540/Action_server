//

(function(window) {
    
        actionLeftSideNavEvent = function() {
          
          var hamburg = Matcha.find('#actionHeaderNav .action-hamburg'),
            targetSidenav = Matcha.find('div.action-left-side'),
            mask = Matcha.find('.action-mask.mask'),
            body = Matcha.find('body');

            hamburg.click(function() {
                targetSidenav.removeClass('hide');
                mask.addClass('show');
                body.addClass('hide-scroll');

            });
            targetSidenav.click(function(e) {
                Matcha.stopEventBubbling(e);
            });
            mask.click(function(e) {
                targetSidenav.addClass('hide');
                mask.removeClass('show');
                body.removeClass('hide-scroll');

            });
        };
    Matcha.initEvent(function() {
        actionLeftSideNavEvent();
    });

})(window);

