$(function(){
   //var actionBtnIcons=new SVGMorpheus('#icon'); 
   
   
   $(window).bind('resize load', function() {
       actionScrollEvent();
       actionMobileSideNav();
       
       console.log($(window).scrollTop());
        $(window).scroll(function () {
            actionScrollEvent();
        });
        
        
        
        $('.action-mobile-side-search-page-header nav .nav-wrapper .action-mobile-search')
        .css('width',($('.action-mobile-side-search-page-header nav .nav-wrapper').width()-$('.action-mobile-side-search-page-header nav button').width()-36));
       
   });
   
})

function actionScrollEvent(){
    
    if ($(window).scrollTop() > ($('.action-header-nav').height()*.4)) {           
        $('.action-header-title').addClass('action-active-hte').removeClass('action-active-htd');
    }else{
        $('.action-header-title').addClass('action-active-htd').removeClass('action-active-hte');
    }
    
    
    if ($(window).scrollTop() > ($('.action-header').height()-$('.action-header-nav').height())) {
        $('.action-header-nav').addClass('action-box-shadow-default action-active-bcd').removeClass('action-box-shadow-none action-style-color-0');
        $('.action-header .action-header-nav .action-header-nav-right-menu  button.action-signin').show();
        $('.action-mobile-side-search-page-header nav').addClass('action-active-mnd');
    }else {
        $('.action-header-nav').addClass('action-box-shadow-none action-style-color-0').removeClass('action-box-shadow-default action-active-bcd');
        $('.action-header .action-header-nav .action-header-nav-right-menu  button.action-signin').hide();
        $('.action-mobile-side-search-page-header nav').removeClass('action-active-mnd');
    }
    
}

function actionMobileSideNav(){
    $(' .action-header-nav-right-menu .action-header-mobile-search-button').click(function(){
        $('.action-mobile-side-search-page').addClass('action-active-msne').removeClass('action-active-msnd');
        $('body').css('overflow','hidden');
    });
    $('.action-mobile-side-search-page-header nav .nav-wrapper button.action-back-button').click(function(){
        $('.action-mobile-side-search-page').addClass('action-active-msnd').removeClass('action-active-msne');
        $('body').css('overflow','auto');
    });
}