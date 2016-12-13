//

(function (window) {
    var actionLeftSideNavEvent = function () {

        var hamburg = Matcha.find('#actionHeaderNav .action-hamburg'),
            targetSidenav = Matcha.find('div.action-left-side'),
            mask = Matcha.find('.action-mask.mask'),
            body = Matcha.find('body');

        hamburg.click(function () {
            targetSidenav.removeClass('hide');
            mask.addClass('show');
            body.addClass('hide-scroll');

        });
        targetSidenav.click(function (e) {
            Matcha.stopEventBubbling(e);
        });

        mask.click(function (e) {
            if (targetSidenav.elements[0].className.indexOf('hide') < 0) {
                targetSidenav.addClass('hide');
                mask.removeClass('show');
                body.removeClass('hide-scroll');
            }
        });


    };
    Matcha.initEvent(function () {
        //actionLeftSideNavInit();
        actionLeftSideNavEvent();
    });

})(window);

