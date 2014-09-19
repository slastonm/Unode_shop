/*   $(document).ready(function() {
    $("a.topLink").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 900
        });
        return false;
		$(section)
    });
}); */

$(document).ready(function() {
    enableSelectBoxes();
});

function enableSelectBoxes(){
    $('div.selectBox').each(function(){
        //$(this).children('strong.selected').html($(this).children('div.selectOptions').children('strong.selectOption:first').html());
        
        if($(this).find("input").val()!="")
        {
            $(this).children('strong.selected').html($(this).find("input").val());
        }else{
            $(this).children('strong.selected').html($(this).children('div.selectOptions').children('strong.selectOption:first').html());
            $(this).attr('value', $(this).find("input").val());
        }
        
        $(this).children('strong.selected,strong.selectArrow').click(function(){
            if($(this).parent().children('div.selectOptions').css('display') == 'none'){
                $(this).parent().children('div.selectOptions').css('display','block');
            }
            else
            {
                $(this).parent().children('div.selectOptions').css('display','none');
            }
        });

        $(this).find('strong.selectOption').click(function(){
            $(this).parent().css('display','none');
            $(this).closest('div.selectBox').attr('value',$(this).attr('value'));
            $(this).parent().siblings('strong.selected').html($(this).html());
			$(this).parent().siblings('input.chosen').val($(this).html());
        });
    });
}
$(document).ready( function () {

	$(".open").click(function(){
		$(this).next(".wrap_main").slideToggle("fast");
		$(this).slideToggle("fast");
	});

	$(".close").click(function(){
        if(!$(this).parent().hasClass("oferta"))
        {
            $(this).closest("section").slideToggle("fast");
    		$(this).closest("section").parent().find(".open").slideToggle("fast");
            
            target=$(this).closest("section").parent();
            $('html, body').stop().animate({
    			'scrollTop': target.offset().top
    		}, 600, 'swing', function () {});
        }
	});
	
	
	$(".osnovnii_pravila").click(function(){
		$(this).next(".hide").slideToggle("fast");
	});
	
	$(".oferta .close").click(function(){
		$(this).parent().parent().slideToggle("fast");
        target=$(this).closest("section").parent();
        $('html, body').stop().animate({
			'scrollTop': target.offset().top
		}, 600, 'swing', function () {});
	});	
	
	alignCenter($('#login_form'));
	alignCenter($('#login_form2'));
	  
	$("#login").click(function(){
        $(".errors").html("");

		$('.hide-layout').fadeIn('fast'); 
		$('#login_form').fadeIn('fast'); 
		
		$('#login_form2').fadeOut('fast');
	});


	$("#forgot").click(function(){
        $(".errors").html("");
		$('#login_form2').fadeIn('fast');
		$('#login_form').fadeOut('fast'); 
	});	

	$(".hide-layout").click(function(e) {
        $(".errors").html("");
		$(this).fadeOut('fast');
	    $("#login_form").fadeOut('fast');
	    $("#login_form2").fadeOut('fast');
	});
	
	$(".phone_mask").mask("+7(999) 999 99 99");
	$(".card_mask").mask("9999999999999");
	$(".pregnancy_mask").mask("99");
	$(".day").mask("99");
	$(".month").mask("99");
	$(".year").mask("9999");
	$('.cl_birthday').mask('99/99/9999');


	$('a[href^="#"]').bind('click.smoothscroll',function (e) {
		e.preventDefault();
		
		var target = this.hash,
		$target = $(target);
        
        console.log(target);
		
        if(target=="#brand")
        {
            if(!$(target).find('.wrap_main').is(':visible'))
            {
                $(target).find(".open").slideToggle("fast");
                $(target).find('.wrap_main').slideToggle('fast');
            }
        }
	 
        if($target.length>0)
        {
            $('html, body').stop().animate({
    			'scrollTop': $target.offset().top
    		}, 900, 'swing', function () {
    			window.location.hash = target;
    		});
        }
	});
	
	
    
}); 

function alignCenter(elem) {
    elem.css({
      left: ($(window).width() - elem.width()) / 2 + 'px', // получаем координату центра по ширине
      top: ($(window).height() - elem.height()) / 2 +50+ 'px' // получаем координату центра по высоте
    })
}