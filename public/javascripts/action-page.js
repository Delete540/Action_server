$(function(){
   //var actionBtnIcons=new SVGMorpheus('#icon'); 
   
   
   $(window).bind('resize load', function() {
       actionScrollEvent();
   });
   
})

function actionScrollEvent(){
    $(window).scroll(function () {
        if ($(window).scrollTop() > ($('.action-header-nav').height()/2)) {
            $('.action-header-title').addClass('action-active-hte').removeClass('action-active-htd');
        }else{
            $('.action-header-title').addClass('action-active-htd').removeClass('action-active-hte');
        }
        
        
        if ($(window).scrollTop() > ($('.action-header').height()-$('.action-header-nav').height())) {
            $('.action-header-nav').addClass('action-box-shadow-default action-active-bcd').removeClass('action-box-shadow-none action-style-color-0');
            
        }else {
            $('.action-header-nav').addClass('action-box-shadow-none action-style-color-0').removeClass('action-box-shadow-default action-active-bcd');
            
        }
        
    });
    
}