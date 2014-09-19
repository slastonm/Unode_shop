$(document).ready( function () {
    
    $('.__date').mask('99/99/9999');
    $('.__phone').mask('+7 (999) 999-9999');
    $('.__card').mask('9999999999999');
    $('.__week').mask('9?9');
    
    if($('#slides img').length>1)
    {
        $('#slides').slidesjs({
            width: 1050,
            height: 495,
            navigation: false,
            play: {
                active: true,
                auto: true,
                interval: 4000,
                swap: true
            }
        });
    }
    
    // Open & close feedback section
    $('#feedback-form').submit(function(e) {
        e.preventDefault();
        errors="";
        files="";
        $(".upload_file").each(function(){
            name=$(this).find("span").text();
            file=$(this).find(".delete_file").attr("href");
            if(file!="#")
            {
                files+=name+"|"+file+";";
            }
        });
    
        $("#feedback-form").find(".errors").hide();
        $("#feedback-form").find(".errors").html("");
        $("#feedback-form input,#feedback-form textarea").removeClass("error");
        params=$("#feedback-form").serialize()+"&files="+files+"&action=feedback_save";
        console.log(params);
        
        $.post("/ajax/action.php", params, function(data){
            var obj=jQuery.parseJSON(data);
            console.log(obj.errors_html);
            if(obj.errors===undefined || obj.errors=="")
            {
                $("#feedback-form").find(".errors").show();
                $("#feedback-form").find(".errors").html("<p class='mb-0 mt-10'>РЎРџРђРЎРР‘Рћ. Р’РђРЁР• РџРРЎР¬РњРћ РћРўРџР РђР’Р›Р•РќРћ. РњР« РЎР’РЇР–Р•РњРЎРЇ РЎ Р’РђРњР Р’ РЎРђРњРћР• Р‘Р›РР–РђР™РЁР•Р• Р’Р Р•РњРЇ.</p>");
                $("#feedback-form input[type=text],#feedback-form textarea").val("");
                $(".upload_file li").remove();
            }else{
                errors=obj.errors;
                $("#feedback-form").find(".errors").show();
                $("#feedback-form").find(".errors").html('<p class="mb-0 mt-10">'+obj.errors_html+"</p>");
                for (var i in errors) 
                {
                    $("#"+errors[i]).addClass("error");
                }
            }
        }); 
    });
    
    if($(".upload_image_ajax").length>0)
    {
        var button = $(".upload_image_ajax"), interval;
    	//РѕС‚РїСЂР°РІР»СЏРµРј С„РѕС‚РѕРіСЂР°С„РёСЋ 
    	$.ajax_upload(button, {
    		action : '/ajax/action.php?action=feedback_image',
    		name : 'myfile',
    		onSubmit : function(file, ext) {
                //Р’С‹РєР»СЋС‡Р°РµРј РєРЅРѕРїРєСѓ РЅР° РІСЂРµРјСЏ Р·Р°РіСЂСѓР·РєРё С„Р°Р№Р»Р°
                this.disable();
    		},
    		onComplete : function(file, response) {
                var obj=jQuery.parseJSON(response);
                console.log(obj);
                if(obj.error===undefined || obj.error==""){
                    $("#feedback-form").find(".errors").html("");
                    $(".upload_file").prepend('<li><span class="file">'+obj.name+'</span><a href="/upload/'+obj.uploaded+'" class="delete_file"></a></li>');
                }else{
                    $("#feedback-form").find(".errors").show();
                    $("#feedback-form").find(".errors").html("<p>"+obj.error+"</p>");
                }
                this.enable();
    		}
    	});
    }
    
    $(".upload_image_ajax").hide();
            
    $(document).on('click', '.delete_file', function(e) {
        li=$(this).closest("li");
        $.post('/ajax/action.php?action=feedback_image_delete', {path:$(this).attr("href")}, function(data){
            li.remove();
        });
        e.preventDefault(); 
    });
    
    $(document).on('submit', '.login-form', function(e) {
        params=$(this).serialize()+"&action=login";
        forma=$(this);
        forma.find(".errors").hide();
        forma.find(".errors").html("");
        console.log(params);
        $.post("/ajax/card_smile.php", params, function(obj){
            console.log(obj);
            if(obj.result=="success")
            {
                window.location.href="/profile/";
                forma.find(".errors").hide();
            }else{
                forma.find(".errors").show();
                errors=obj.errors;
                console.log(errors[0]);
                forma.find(".errors").html("<p>"+errors[0]["title"]+"</p>");
            }
        }, "json");
        e.preventDefault();
    })
    
    $(document).on('submit', '.forgot-form', function(e) {
        params=$(this).serialize()+"&action=forgotPassword";
        forma=$(this);
        
        forma.find(".errors").hide();
        forma.find(".errors").html("");
        console.log(params);
        if(!forma.hasClass("waiting_response"))
        {
            forma.addClass("waiting_response");
            $.post("/ajax/card_smile.php", params, function(obj){
                if(obj.result=="success")
                {
                    forma.find(".cols").hide();
                    forma.find(".errors").html("<p>РџРѕ СѓРєР°Р·Р°РЅРЅС‹Рј РІР°РјРё РєРѕРЅС‚Р°РєС‚Р°Рј РѕС‚РїСЂР°РІР»РµРЅР° СЃСЃС‹Р»РєР° РґР»СЏ СЃРјРµРЅС‹ РїР°СЂРѕР»СЏ.</p>");
                    forma.find(".errors").show();
                }else{
                    forma.find(".errors").show();
                    errors=obj.errors;
                    console.log(errors[0]);
                    forma.find(".errors").html("<p>"+errors[0]["title"]+"</p>");
                }
                forma.removeClass("waiting_response");
            }, "json");
        }
        e.preventDefault();
    })
    
    $(document).on('submit', '.password-form', function(e) {
        params=$(this).serialize()+"&action=setNewPassword";
        forma=$(this);
        forma.find(".errors").hide();
        forma.find(".errors").html("");
        console.log(params);
        $.post("/ajax/card_smile.php", params, function(obj){
            if(obj.result=="success")
            {
                forma.find(".errors").html("<p class='mb-20'>РџР°СЂРѕР»СЊ СѓСЃРїРµС€РЅРѕ РёР·РјРµРЅРµРЅ.</p>");
                forma.find(".errors").show();
            }else{
                forma.find(".errors").show();
                errors=obj.errors;
                console.log(errors[0]);
                forma.find(".errors").html("<p>"+errors[0]["title"]+"</p>");
            }
        }, "json");
        e.preventDefault();
    });
    
    $(document).on('submit', '.change-password-form', function(e) {
        params=$(this).serialize()+"&action=changePassword";
        forma=$(this);
        forma.find(".errors").hide();
        forma.find(".errors").html("");
        console.log(params);
        $.post("/ajax/card_smile.php", params, function(obj){
            if(obj.result=="success")
            {
                forma.find(".errors").html("<p>РџР°СЂРѕР»СЊ СѓСЃРїРµС€РЅРѕ РёР·РјРµРЅРµРЅ.</p>");
                forma.find(".errors").show();
            }else{
                forma.find(".errors").show();
                errors=obj.errors;
                console.log(errors[0]);
                forma.find(".errors").html("<p class='mb-0'>"+errors[0]["title"]+"</p>");
            }
        }, "json");
        e.preventDefault();
    });    
    
    $(document).on('click', '.logout', function(e) {
        params="action=logout";
        $.post("/ajax/card_smile.php", params, function(obj){
            window.location.href="/";
        }, "json");
        e.preventDefault();
    })
    
    $(document).on('submit', '.form-user-edit', function(e) {
        e.preventDefault();
        params=$(".form-user-edit").serialize()+"&action=edit";
        forma=$(".form-user-edit");
        forma.find(".errors").hide();
        forma.find(".errors").html("");
        console.log(params);
        $.post("/ajax/card_smile.php", params, function(obj){
            console.log(obj);
            if(obj.result=="success")
            {
                forma.find(".errors").show();
                forma.find(".errors").html("<p class='mb-10'>Р”РђРќРќР«Р• РЈРЎРџР•РЁРќРћ РЎРћРҐР РђРќР•РќР«!</p>");
            }else{
                forma.find(".errors").show();
                errors=obj.errors;
                console.log(errors[0]);
                error=errors[0]["title"];
                error=error.toUpperCase();
                if(error.indexOf("РЈРљРђР—РђРќ РўРРџ РЎРћРћР‘Р©Р•РќРР™")>-1)
                {
                    error='РЈРєР°Р·Р°РЅ С‚РёРї СЃРѕРѕР±С‰РµРЅРёР№ РїРѕ РїСЂРѕРіСЂР°РјРјРµ, РЅРµ СЃРѕРѕС‚РІРµС‚СЃС‚РІСѓСЋС‰РёР№ РІРІРµРґРµРЅРЅС‹Рј РґР°РЅРЅС‹Рј.<br /> Р”РѕРїРѕР»РЅРёС‚Рµ СЃРІРѕРё РґР°РЅРЅС‹Рµ РёР»Рё РІС‹Р±РµСЂРёС‚Рµ РґСЂСѓРіРѕР№ С‚РёРї СЃРѕРѕР±С‰РµРЅРёР№.';
                }
                error=error.toUpperCase();
                
                forma.find(".errors").html("<p class='mb-10'>"+error+"</p>");
            }
        }, "json");
    });
    
    $(document).on('click', '.form-user-editdop-button', function(e) {
        params=$(".form-childs").serialize()+"&"+$(".form-addFields").serialize()+"&action=updateAdditionalFields";
        forma=$(this).closest("form");
        forma.find(".errors").hide();
        forma.find(".errors").html("");
        console.log(params);
        $.post("/ajax/card_smile.php", params, function(obj){
            console.log(obj);
            if(obj.result=="success")
            {
                forma.find(".errors").show();
                forma.find(".errors").html("<p class='mb-10'>"+"Р”РђРќРќР«Р• РЈРЎРџР•РЁРќРћ РЎРћРҐР РђРќР•РќР«"+"</p>");
            }else{
                forma.find(".errors").show();
                errors=obj.errors;
                console.log(errors[0]);
                forma.find(".errors").html("<p class='mb-20'>"+errors[0]["title"]+"</p>");
            }
        }, "json");
        e.preventDefault();
    });
    
    $(".radio.active").each(function(){
        rname=$(this).data("name");
        $("input[name='"+rname+"']").val($(this).data("value"));
    });
    
    $(".sex.active").each(function(){
        rname=$(this).data("name");
        $("input[name='"+rname+"']").val($(this).data("value"));
    });
    
    $(document).on('click', '.radio', function(e) {
        rname=$(this).data("name");
        disabled=false;
        
        if(rname=="favorChannel_sms")
        {
            if($("[data-name='favorChannel_email'].checked.active").length==0 && $(this).hasClass("unchecked"))
            {
                disabled=true;
            }
        }
        if(rname=="favorChannel_email")
        {
            if($("[data-name='favorChannel_sms'].checked.active").length==0 && $(this).hasClass("unchecked"))
            {
                disabled=true;
            }
        }
        if(!disabled)
        {
            $("[data-name='"+rname+"']").removeClass("active");
            $(this).addClass("active"); 
            $("input[name='"+rname+"']").val($(this).data("value"));
            $(this).closest("form").find(".errors").html("");
        }else{
            $(this).closest("form").find(".errors").html("<p>Р”РѕР»Р¶РµРЅ Р±С‹С‚СЊ РІС‹Р±СЂР°РЅ С…РѕС‚СЏ Р±С‹ РѕРґРёРЅ СЃРїРѕСЃРѕР± РїРѕР»СѓС‡РµРЅРёСЏ СЃРѕРѕР±С‰РµРЅРёР№</p>");
        }
        
    });
    
    $(document).on('click', '.sex', function(e) {
        rname=$(this).data("name");
        console.log(rname);
        $("[data-name='"+rname+"']").removeClass("active");
        $(this).addClass("active"); 
        $("input[name='"+rname+"']").val($(this).data("value"));
    });     
    
    $("[data-dialog='new_password']").click(function(e){
        e.preventDefault();
        $('.hide-layout').fadeIn('fast'); 
        $('#login_form2').fadeIn('fast');
    });
    
    $(".day, .month, .year").change(function(){
        p=$(this).closest("p");
        d=p.find(".day").val()+"/"+p.find(".month").val()+"/"+p.find(".year").val();
        p.find("input[type=hidden]").val(d);
        //alert(p.find("input[type=hidden]").val());
    });
    
});