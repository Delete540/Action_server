$(function(){
   //var actionBtnIcons=new SVGMorpheus('#icon'); 
    
   actionDesktopButtonHoverEvent();
   actionHeaderButtonEvent();
   
   $(window).bind('resize load', function() {
       actionScrollEvent();
       
       actionMobileEvent();
       
        $(window).scroll(function () {
            actionScrollEvent();
        });
        
   });
   
})


function actionHeaderButtonEvent(){
    
    $(' .action-hamburger-button').actionSideNav({
        'width':'240px',
        'position':'left',
        'bodyHidden':true,
        'mask':true,
        'maskType':'black'

    });
    
    
    
    $('.action-header-mobile-add-button').click(function(){
        $('.action-mobile-nav-dropdown').css({
            'margin-right':'-32px'
        });
    });
    
    $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
    //   ready: function() { alert('Ready'); }, // Callback for Modal open
    //   complete: function() { alert('Closed'); } // Callback for Modal close
    }
  );
    $(' .action-place').actionSideNav({
        'width':'324px',
        'position':'right',
        'closeButton':$('.action-side-nav#action-side-nav-place .action-back-button'),
        'ready':function(){
            $('.action-header-nav .nav-wrapper .action-search').hide();
        },
        'complete':function(){
            $('.action-header-nav .nav-wrapper .action-search').show();
        }
    });
   
}

function actionScrollEvent(){
    
    if ($(window).scrollTop() > ($('.action-header-nav').height()*.4)) {           
        $('.action-header-title').addClass('action-active-hte').removeClass('action-active-htd');
    }else{
        $('.action-header-title').addClass('action-active-htd').removeClass('action-active-hte');
    }
    
    
    if ($(window).scrollTop() > ($('.action-header').height()-$('.action-header-nav').height())) {
        $('.action-header-nav').addClass('action-box-shadow-default action-active-bcd').removeClass('action-box-shadow-none transparent');
        $('.action-header .action-header-nav .action-header-nav-right-menu  button.action-signin').show();
        
    }else {
        $('.action-header-nav').addClass('action-box-shadow-none transparent').removeClass('action-box-shadow-default action-active-bcd');
        $('.action-header .action-header-nav .action-header-nav-right-menu  button.action-signin').hide();
        
    }
    
    
}



function actionMobileEvent(){
    
    
    $(' .action-header-nav-right-menu .action-header-mobile-search-button').actionSideNav({
        'width':'100%',
        'position':'right',
        'bodyHidden':true,
        'closeButton':$('.action-side-nav#action-side-nav-mobile-search .action-back-button'),
        
    });
}

function actionDesktopButtonHoverEvent(){
    $('.action-header-nav-right-menu.action-d-down-hide a').hover(function(){
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





(function($){
    
    var sideNavmethod = {
        
        init:function(opts,callback){
            
            var defaults ={
                'width':240,
                'animation':'easy',
                'event':'click',
                'time':.6,
                'mask':false,
                'maskType':'black',
                'position':'left',
                'bodyHidden':false,
                'closeButton':null,
                'ready':null,
                'complete':null
            };
            
            var options =  $.extend(defaults,opts || {});
            
            
            
            var setObj={
                'width':options.width,
                'left':null,
                'right':null,
                'overflow-y': 'auto'
            };
            
            var setSideNavObj = function(obj){

                    $('#'+obj.attr('action-data')).css(setObj)
                                   .find('.action-side-nav-header').css('width',options.width);
                 
            };
            
            var setDragTarget = {
                'width':0
            };
            
            var setMask = {
                
                // if(options.maskType=='black'){
                //     'background-color':'rgba(0, 0, 0, 0.5)'
                // }else{
                //     'background-color':options.maskType,
                // }
                'backgroundColor':options.maskType
                
            };
            
            return this.each(function () {
                var $this=$(this);
                      
                try {
                   
                    options.position=='left'?setObj.left='-105%':setObj.right='-105%';
                   
                    setSideNavObj($this); 
                        
                    $this.on(options.event,function(){
                   
                        setObj.left=='-105%'?setObj.left=0:setObj.right=0;
                        
                        setSideNavObj($this); 
                        
                        if(options.bodyHidden==true){
                            $('body').css('overflow','hidden');
                        }else{
                            $('body').removeAttr('style');
                        }
                        
                        if(options.mask==true){
                            $('body').append('<div class="action-mask action-mask-black"></div>');
                            
                            setDragTarget.width="100%";
                            $('.action-drag-target').css(setDragTarget);
                            
                            if(options.maskType=='black'){
                                setMask.backgroundColor='rgba(0, 0, 0, 0.5)';
                            }
                            $('.action-mask').css(setMask);
                            
                        }else{
                            $('.action-mask').remove();
                        }
                        
                        if($.isFunction(options.ready)){
                           options.ready.apply(this);
                        }
                    
                    });
                    
                    if(options.closeButton!=null){
                        options.closeButton.on('click',function(){
                          
                            setObj.left==0?setObj.left='-105%':setObj.right='-105%';
                            
                            setSideNavObj($this); 
                            
                            if(options.bodyHidden==true){
                                $('body').removeAttr('style');
                            }
                            
                            if(options.mask==true){
                                setDragTarget.width=0;
                                $('.action-drag-target').css(setDragTarget);
                                $('.action-mask').remove();
                            }
                            
                            if($.isFunction(options.complete)){
                            options.complete.apply(this);
                            }

                        });
                    }                                          
                    
                    $('.action-drag-target').on('click',function(){
                        
                    
                        setDragTarget.width=0;
                        $('.action-drag-target').css(setDragTarget);
                    
                        $('.action-mask').remove();
                    
                        if(options.bodyHidden==true){
                            $('body').removeAttr('style');
                        }
                        
                        setObj.left==0?setObj.left='-105%':setObj.right='-105%';
                        
                        setSideNavObj($this); 
                        
                    });
                        

                } catch (e) {
                    console.log(e.message);
                }    
                               
            });
            
        },
        
        top:function(){
            
        },
        
        bottom:function(){
            
        },
        
        left:function(){
            
        },
        
        right:function(){
            
        },
         show:function(){
             
         },
         
         hide:function(){
             
         },
        
    };
    
    var scrollEventMethod = {
        
    }
    
    
    
    $.fn.actionSideNav = function(method){
        
         // 方法调用
        if (sideNavmethod[method]) {
            return sideNavmethod[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return sideNavmethod.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.actionEvent');
        }
        
    };
    
    $.fn.actionScrollEvent = function(method){
        
         // 方法调用
        if (scrollEventMethod[method]) {
            return scrollEventMethod[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return scrollEventMethod.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.actionEvent');
        }
        
    };
    
    var sideInit
    
    
    
})(jQuery);
