
import { languageSet } from '../../../assets/js/language'
class slideToUnlock {
    constructor(el, options){
        this.$el = el;
        this.$drag;
        this.start = false;
        this.leftEdge;
        this.rightEdge;            
        this.mouseX ;
        this.settings = {
            // unlockText    : "Slide To Unlock",
            useData : false,
            unlockfn: function(){console.log("unlock")},
            lockfn  : function(){},
            allowLocking : true,
            status: false
        }

        // Establish our default settings
        this.settings =  Object.assign(this.settings, options);	
        if(this.settings.useData){
            if(!("unlockText" in this.settings) && this.$el.data("unlock-text")){
                this.settings.unlockText = this.$el.data("unlock-text");         
            }
            if(!("lockText" in this.settings && this.$el.data("lock-text"))){
                this.settings.lockText = this.$el.data("lock-text");
            }

            this.settings.status = this.$el.data("status");
        }
        
        if(!("lockText" in this.settings)){
            this.settings.lockText = languageSet['SWIPE_RIGHT'];
        }
        
        if(!("unlockText" in this.settings)){
            this.settings.unlockText = languageSet['SWIPE_RIGHT'];
        }

        this.init();
        return this;
    };

    init() {
        this.$el.addClass('slideToUnlock');
        this.leftEdge  = this.$el.offset().left;
        this.rightEdge = this.leftEdge + this.$el.outerWidth();
        
        this.$el.addClass("locked");
        this.$el.append("<div class='progressBar unlocked'></div>");
        this.$el.append("<div class='text'>" + this.settings.lockText + "</div>");
        this.$el.append("<div class='drag locked_handle '>  </div>");
        
        this.$text = this.$el.find('.text');
        this.$drag = this.$el.find('.drag');
        this.$progressBar = this.$el.find(".progressBar");
        

        this.$drag.on("mousedown touchstart",  this.touchStart.bind(this));    
        
        if(this.settings.status){
            this.$drag.css({left: "auto", right: 0 });               
            this.$progressBar.css({width: "100%"});
        }
    }

    touchStart(event = window.event){  
        this.start = true;
        this.leftEdge  = Math.trunc(this.$el.offset().left);
        this.rightEdge = Math.trunc(this.leftEdge + this.$el.outerWidth());
        
        $(document).on("mousemove touchmove",  this.touchMove.bind(this));
        $(document).on("mouseup touchend",     this.touchEnd.bind(this));
        this.mouseX = (event.type == 'mousedown' )? event.pageX : event.originalEvent.touches[0].pageX;
      
        event.preventDefault();
    }

    touchMove(event = window.event){ 
        if(!this.start) return;             
            var X = (event.type == 'mousemove' )? event.pageX : event.originalEvent.touches[0].pageX;
            var changeX = ( X - this.mouseX );
            var edge = Math.trunc(this.$drag.offset().left) + changeX;
            this.mouseX = X; 
            
            if(edge < this.leftEdge ){                
                if(this.settings.status)
                    this.settings.lockfn(this.$el);
                this.$text.text(this.settings.lockText);
                this.$drag.removeClass('unlocked_handle').addClass('locked_handle');
                this.start = false;
                this.settings.status = false;  
                this.touchEnd();                  
                return;
            }
            
            if(edge > this.rightEdge - this.$drag.outerWidth() ){                                                   
                if(!this.settings.status){
                    this.settings.unlockfn(this.$el);   
                }
                this.$text.text(this.settings.unlockText);
                this.$drag.removeClass('locked_handle').addClass('unlocked_handle');
                if(!this.settings.allowLocking){
                    this.$el.off("mousedown touchstart");
                }
                this.settings.status = true;
                this.start = false;   
                this.touchEnd();             
                return;
            }

            this.$drag.offset({left : edge });           
            this.$progressBar.css({"width": edge - this.$el.offset().left + this.$drag.outerWidth() });

            event.stopImmediatePropagation();
    }

    touchEnd(event = window.event){  
        this.start  = false;
        this.mouseX = 0;       
        if(!this.settings.status){
            this.$drag.animate({left : 0, "margin-left": 0 });
            if(this.$progressBar.width() > this.$drag.width()){
                this.$progressBar.animate({width : this.$drag.width()}, function(){
                    this.$progressBar.css({width:0 });                                     
                }.bind(this));
            }
        }

        if(this.settings.status){
            this.$drag.animate({"left": "100%", "margin-left": "-50px"});
            this.$progressBar.animate({width: "100%" });
        }

        $(document).off("mousemove touchmove");
        $(document).off("mouseup touchend");
        event.stopImmediatePropagation();
    }
};
/*
* Add it to Jquery
*/
(function ( $ ) {
    $.fn.slideToUnlock = function(options){
        $.each(this, function(i, el) {            
            new slideToUnlock($(el), options);
        });
        return this;
    }
}( jQuery ));