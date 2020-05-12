$(document).ready(function(){
    
    // $(function(){
    //     $(".owl-carousel").owlCarousel();
    // });

    // $(".conteudo").on("submit","form[name='reg-email']",function(e){
    //     e.preventDefault();
    //     var form = $(this).serialize();
    //     var sucesso = '<div class="alert alert-success" role="alert"><center>E-mail cadastrado com sucesso!!</center></div>';
    //     var atencao = '<div class="alert alert-warning" role="alert"><center>E-mail já encontra-se cadastrado.</center></div>';
    //     var erro    = '<div class="alert alert-danger" role="alert"><center>E-mail inválido.</center></div>';
    //     var mail = $(".conteudo").find("#email").val();
        
    //     if(isEmail(mail)){
    //         $.ajax({
    //             type:"POST",
    //             url:"/gazin/enviaEmail",
    //             data:form,
    //             success:function(r){
    //                 console.log(r);
    //                 if(r.retorno == "existe"){
    //                     $(".conteudo").find("#alerta-retorno").html(atencao);
    //                     setTimeout(function(){
    //                         $(".conteudo").find("#alerta-retorno").html("");
    //                     },5000);
    //                 }else{
    //                     $("form[name='reg-email']")[0].reset();
    //                     $(".conteudo").find("#alerta-retorno").html(sucesso);
    //                     setTimeout(function(){
    //                         $(".conteudo").find("#alerta-retorno").html("");
    //                     },3000);
    //                 }
    //             },
    //             error:function(e){
    //                 console.log(e);
    //             }
    //         });
    //     }else{
    //         $(".conteudo").find("#alerta-retorno").html(erro);
    //         setTimeout(function(){
    //             $(".conteudo").find("#alerta-retorno").html("");
    //         },5000);
    //     }
    // });
    // function isEmail(email) {
    //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    // }

   
    
    // function login(dados){
    //     $.ajax({
    //         type:"POST",
    //         url:"/gazin/loginSite",
    //         data:dados,
    //         success:function(r){
    //             window.location.href = "./gazin";
    //         }
    //     })
    // }

    // $(".conteudo").on("submit","form[name='login-form']",function(e){
    //     e.preventDefault();
    //     var dados = $(this).serialize();
    //     login(dados);
    // });

    // var values = {};
    // $.each($("form[name='cadastro-form']").serializeArray(), function (i, field) {
    //     values[field.name] = field.value;
    // });
    // function getValue(valueName) {
    //     return values[valueName];
    // };

    // $(".conteudo").on("submit","form[name='cadastro-form']",function(e){
    //     e.preventDefault();
    //     var dados = $(this).serialize();
    //     if (getValue("senha") === getValue("confirm")){
    //         $.ajax({
    //             type:"POST",
    //             url:"/gazin/cadastroSite",
    //             dataType:"json",
    //             data:dados,
    //             success:function(r){
    //                 if(r.status == "sucesso"){
    //                     alert("Cadastro realizado com sucesso!");
    //                     setTimeout(function(){
    //                         login(dados);
    //                     },500);
    //                 }else{
    //                     alert(r.msg);
    //                 }
    //             }
    //         });
    //     }else{
    //         alert("Senhas não batem.");
    //     }
    // });




});