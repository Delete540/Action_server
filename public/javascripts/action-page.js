$(function(){
   //var actionBtnIcons=new SVGMorpheus('#icon'); 
   
   
   $(window).bind('resize load', function() {
       actionScrollEvent();
       console.log($(window).scrollTop());
        $(window).scroll(function () {
            actionScrollEvent();
        });
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
    }else {
        $('.action-header-nav').addClass('action-box-shadow-none action-style-color-0').removeClass('action-box-shadow-default action-active-bcd');
        
    }
    
}