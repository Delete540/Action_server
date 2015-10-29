$(function(){
   //var actionBtnIcons=new SVGMorpheus('#icon'); 
    
   actionDesktopButtonHoverEvent();
   actionHeaderButtonEvent();
   
   $(window).bind('resize load', function() {
       actionScrollEvent();
       
       actionMobileSideNavEvent();
       
        $(window).scroll(function () {
            actionScrollEvent();
        });
        
   });
   
})


function actionHeaderButtonEvent(){
    
    $('.action-hamburger-button').click(function(){
        //event.stopPropagation();
        
        
        $('#action-side-nav-left').addClass('action-active-xl-0').removeClass('action-active-xl-left').css('overflow','auto');
        $('body').css('overflow','hidden').append('<div class="action-mask action-mask-black"></div>');
        $('.action-drag-target').addClass('action-active-width-full').removeClass('action-active-width-0');
        //$('.action-mask-black').addClass('action-active-opacity-1').removeClass('action-active-opacity-0');
    });
    
    $('.action-drag-target').click(function(){
        $('body').removeAttr('style');
        $('.action-drag-target').addClass('action-active-width-0').removeClass('action-active-width-full');
        $('#action-side-nav-left').addClass('action-active-xl-left').removeClass('action-active-xl-0');
        //$('.action-mask-black').addClass('action-active-opacity-0').removeClass('action-active-opacity-1');
        $('.action-mask-black').remove();
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
        'closeButton':$('.action-side-nav#action-side-nav-place .action-side-nav-header nav .nav-wrapper .action-back-button'),
        'before':function(){
            $('.action-header-nav .nav-wrapper .action-search').hide();
        },
        'after':function(){
            $('.action-header-nav .nav-wrapper .action-search').show();
        }
    });
   
    //'callback':function(){
           // $('.action-header-nav .nav-wrapper .action-search').hide();
           //console.log($('.action-side-nav#action-side-nav-place').attr('style'));
           //$('.action-header-nav .nav-wrapper .action-search').show();
        //    if($('.action-side-nav#action-side-nav-place').attr('style')==0){
        //        $('.action-header-nav .nav-wrapper .action-search').hide();
        //    }else{
        //        $('.action-header-nav .nav-wrapper .action-search').show();
        //    }
        //}
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

function actionSideNavEvent(){
    $(' .action-header-nav-right-menu .action-header-mobile-search-button').actionClickEvent()
}

function actionMobileSideNavEvent(){
    // $('.action-mobile-side-search-page-header nav .nav-wrapper .action-mobile-search')
    //     .css('width',($('.action-mobile-side-search-page-header nav .nav-wrapper').width()-$('.action-mobile-side-search-page-header nav button').width()-36));
    
    $(' .action-header-nav-right-menu .action-header-mobile-search-button').click(function(){
        $('.action-mobile-side-search-page').addClass('action-active-xr-0').removeClass('action-active-xr-right');
        $('body').css('overflow','hidden');
        $('.action-mobile-side-search-page').css('overflow','auto');
    });
    $('.action-mobile-side-search-page .action-side-nav-header nav .nav-wrapper button.action-back-button').click(function(){
        $('.action-mobile-side-search-page').addClass('action-active-xr-right').removeClass('action-active-xr-0');
        $('body').removeAttr('style');
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
                'dragTarget':true,
                'mask':true,
                'maskType':'black',
                'position':'left',
                'bodyHidden':false,
                'closeButton':null,
                'before':null,
                'after':null
            };
            
            var options =  $.extend(defaults,opts || {});
            
            var setObj={
                'width':options.width,
                [options.position]: '-105%',
                'overflow-y': 'auto'
            }
            
            var setSideNavObj = function(obj){
                //console.log(obj.attr('action-data'));
               
                //$('#'+obj.attr('action-data'))
               
                    

                    $('#'+obj.attr('action-data')).css(setObj)
                                   .find('.action-side-nav-header').css('width',options.width);
                 
            }
            
            return this.each(function () {
                var $this=$(this);
                      
                try {
                   
                   
                   
                    setSideNavObj($this); 
                        
                    $this.on(options.event,function(){
                    //console.log(setObj.left?setObj.left:setObj.right);
                    //setSideNavObj($this); 
                   
                        setObj.left?setObj.left=0:setObj.right=0;
                        
                        setSideNavObj($this); 
                        
                        if(options.bodyHidden==true){
                            $('body').css('overflow','hidden');
                        }else{
                            $('body').removeAttr('style');
                        }
                        
                        if($.isFunction(options.before)){
                           options.before.apply(this);
                        }
                    
                    });
                    options.closeButton.on('click',function(){
                        setObj.left?setObj.left='-105%':setObj.right='-105%';
                        setSideNavObj($this); 
                        //console.log($this);
                        //$('#'+$this.attr('action-data')).css(setObj);
                        
                        if($.isFunction(options.after)){
                           options.after.apply(this);
                        }
                       
                    });    
                    //console.log(flag);    
                   
                    
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
