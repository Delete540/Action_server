$(function(){
   //var actionBtnIcons=new SVGMorpheus('#icon'); 
    
   actionDesktopButtonHoverEvent();
   
   $(window).bind('resize load', function() {
       actionScrollEvent();
       
       actionMobileSideNavEvent();
       
       actionHeaderButtonEvent();
       
       console.log($('.action-mobile-side-search-page').scrollTop());
        $(window).scroll(function () {
            actionScrollEvent();
        });
        
        
        
        
       
   });
   
})


function actionHeaderButtonEvent(){
    
    $('.action-hamburger-button').click(function(){
        //event.stopPropagation();
        $('body').css('overflow','hidden').append('<div class="action-mask action-mask-black"></div>');
        $('.action-drag-target').addClass('action-active-width-full').removeClass('action-active-width-0');
        $('.action-side-nav').addClass('action-active-x-0').removeClass('action-active-x-left').css('overflow','auto');
        //$('.action-mask-black').addClass('action-active-opacity-1').removeClass('action-active-opacity-0');
    });
    
    $('.action-drag-target').click(function(){
        $('body').removeAttr('style');
        $('.action-drag-target').addClass('action-active-width-0').removeClass('action-active-width-full');
        $('.action-side-nav').addClass('action-active-x-left').removeClass('action-active-x-0');
        //$('.action-mask-black').addClass('action-active-opacity-0').removeClass('action-active-opacity-1');
        $('.action-mask-black').remove();
    });
    
    $('.action-header-mobile-add-button').click(function(){
        $('.action-mobile-nav-dropdown').css({
            'margin-right':'-32px'
        });
    });
    
}

function actionScrollEvent(){
    
    if ($(window).scrollTop() > ($('.action-header-nav').height()*.4)) {           
        $('.action-header-title').addClass('action-active-hte').removeClass('action-active-htd');
    }else{
        $('.action-header-title').addClass('action-active-htd').removeClass('action-active-hte');
    }
    
    
    if ($(window).scrollTop() > ($('.action-header').height()-$('.action-header-nav').height())) {
        $('.action-header-nav').addClass('action-box-shadow-default action-active-bcd').removeClass('action-box-shadow-none action-style-color-0');
        $('.action-header .action-header-nav .action-header-nav-right-menu  button.action-signin').show();
        
    }else {
        $('.action-header-nav').addClass('action-box-shadow-none action-style-color-0').removeClass('action-box-shadow-default action-active-bcd');
        $('.action-header .action-header-nav .action-header-nav-right-menu  button.action-signin').hide();
        
    }
    
    
}

function actionMobileSideNavEvent(){
    $('.action-mobile-side-search-page-header nav .nav-wrapper .action-mobile-search')
        .css('width',($('.action-mobile-side-search-page-header nav .nav-wrapper').width()-$('.action-mobile-side-search-page-header nav button').width()-36));
    
    $(' .action-header-nav-right-menu .action-header-mobile-search-button').click(function(){
        $('.action-mobile-side-search-page').addClass('action-active-x-0').removeClass('action-active-x-right');
        $('body').css('overflow','hidden');
        $('.action-mobile-side-search-page').css('overflow','auto');
    });
    $('.action-mobile-side-search-page-header nav .nav-wrapper button.action-back-button').click(function(){
        $('.action-mobile-side-search-page').addClass('action-active-x-right').removeClass('action-active-x-0');
        $('body').removeAttr('style');
    });
    
    
}

function actionDesktopButtonHoverEvent(){
    $('.action-header-nav-right-menu.action-d-down-hide button').hover(function(){
         $('.action-header-nav-right-menu').append('<div class="action-tooltip black "><span class="material-icons">arrow_drop_up</span><span></span></div>')
        $('.action-tooltip').show().css('right',($(window).width()-$(this).offset().left-$('.action-tooltip').width()-6));
        $('.action-tooltip span:eq(1)').text($(this).attr('action-tooltip'));
        //console.log($(window).width()-$(this).offset().left);
    },function(){
        
        $('.action-tooltip').hide();
        $('.action-tooltip span:eq(1)').text('');
        $('.action-tooltip').remove();
        
    });
}