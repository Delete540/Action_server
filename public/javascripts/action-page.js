$(function(){
   //var actionBtnIcons=new SVGMorpheus('#icon'); 
   
   
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
        $('.action-mobile-side-search-page').addClass('action-active-msne').removeClass('action-active-msnd');
        $('body').css('overflow','hidden');
        $('.action-mobile-side-search-page').css('overflow','auto');
    });
    $('.action-mobile-side-search-page-header nav .nav-wrapper button.action-back-button').click(function(){
        $('.action-mobile-side-search-page').addClass('action-active-msnd').removeClass('action-active-msne');
        $('body').css('overflow','auto');
    });
    
    
}