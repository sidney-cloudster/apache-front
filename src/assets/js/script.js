// $(document).ready(function () {
//   // ao clicar no "adicionar ao carrinho"
//   $('.add-to-cart').click(function () {
//     $(this).toggleClass('is-added').find('path').eq(0).animate({
//       // desenha o ícone de verificação adicionando a classe is-added
//       'stroke-dashoffset': 0
//     }, 300, function () {
//       setTimeout(function () {
//         $(this).removeClass('is-added').find('em').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
//           //aguarda o final da transição para redefinir o ícone de verificação
//           $(this).find('path').eq(0).css('stroke-dashoffset', '19.79');
//           animating = false;
//         });
//         if ($('.no-csstransitions').length > 0) {
//           // verifique se o navegador não suporta transições de css
//           $(this).find('path').eq(0).css('stroke-dashoffset', '19.79');
//           animating = false;
//         }
//       }, 600);
//     });
//   });
//   $('#chat-start').click(function () {
//     $('.ch-start-chat').fadeOut();
//   });
//   $('.tipo-cadastro input[type="radio"]').change(function (event) {
//     var tipoCadastro = $(this).val();
//     $('#cadastro-' + tipoCadastro).show().siblings().hide();
//   });
//   $(".btn-chat-enviar").click(function () {
//     var data = $("#chat-input").val();    
//     $('.ch-wrapper').append('<div class="ch-bubble right"><span class="ch-name">Marco - 26/08/2019 18:23</span><div class="ch-box"><span class="ch-message">' + data + '</span></div></div><div class="ch-bubble left"><span class="ch-name">Marco - 26/08/2019 18:23</span><div class="ch-box"><span class="ch-message">' + data + '</span></div></div>');
//     clearInput();
//     $(".ch-wrapper-p").stop().animate({
//       scrollTop: $(".ch-wrapper-p")[0].scrollHeight
//     }, 1000);
//   });

//   function clearInput() {
//     $(".form-chat :input").each(function () {
//       $(this).val(''); //hide form values
//     });
//   }
//   $(".form-chat").submit(function () {
//     return false; //to prevent redirection to save.php
//   });
//   $("[data-toggle=popover]").popover();
//   /* Pedidos tamanho */
//   $('.mc-box-pedido').each(function () {
//     var tamanhoDiv = $(this).children('.mc-info-wrapper').height();
//     $(this).height(tamanhoDiv);
//   });
//   /*  Cartão de crédito  */
//   $('#cep').mask('00000-000');
//   $('#quantidade').mask('9');
//   $('.btn-pagamento').click(function () {
//     $(this).toggleClass('active');
//   });
//   /* Dropdown 3 tips menu */
//   $('.treetabs-menu').click(function () {
//     $(this).siblings('ul').toggleClass('active');
//   });
//   $('.dropdown-tabs-link').click(function () {
//     $(this).parent('ul').removeClass('active');
//   });
//   /*-----------*/
//   $('#mc-mobile').click(function () {
//     $('#sidebar-minhaconta').toggleClass('active');
//     $('.overlay-mobile').toggleClass('active');
//   });
//   $('.overlay-mobile').click(function () {
//     $('#sidebar-minhaconta').removeClass('active');
//     $('.overlay-mobile').removeClass('active');
//     $('.ct-sidebar').removeClass('active');
//     $('#sidebar').removeClass('active-mobile');
//     $('.hamburger').removeClass('is-active');
//   });
//   $("[data-overlay='true']").click(function () {
//     $(this).toggleClass('overlayed');
//   })
//   $('.mc-close-mobile').click(function () {
//     $('#sidebar-minhaconta').removeClass('active');
//     $('.overlay-mobile').removeClass('active');
//   });
//   $('.sdm-item').click(function () {
//     var dataTarget = $(this).attr('data-target');
//     $(this).toggleClass('active');
//     $("ul[data-show='" + dataTarget + "']").toggleClass('active');;
//     if ($('#sidebar-minhaconta').hasClass('expand')) {
//       $('#sidebar-minhaconta').removeClass('expand');
//       $('.sdm-item').removeClass('hidden');
//     } else {
//       $('#sidebar-minhaconta').removeClass('expand');
//     }
//   });
//   $('#sdm-expand').click(function () {
//     $('#sidebar-minhaconta').toggleClass('expand')
//     $(this).toggleClass('is-active');
//     if ($('.sdm-item').hasClass('hidden')) {
//       $('.sdm-item').removeClass('hidden');
//     } else {
//       $('.sdm-item').addClass('hidden');
//     }
//     $('.sdm-list').removeClass('active');
//   });
//   $(".mc-box-pedido").click(function () {
//     $(this).toggleClass('active');
//   });
//   $('.pd-imagem .colors').hide();
//   // Setar value no input
//   // Setar classes do boostrap no validator jquery
//   jQuery.validator.setDefaults({
//     errorElement: 'span',
//     errorPlacement: function (error, element) {
//       error.addClass('invalid-feedback');
//       element.closest('.form-group').append(error);
//     },
//     highlight: function (element, errorClass, validClass) {
//       $(element).addClass('is-invalid');
//     },
//     unhighlight: function (element, errorClass, validClass) {
//       $(element).removeClass('is-invalid');
//     }
//   });
//   $.validator.addMethod("birthday_date", function (value) {
//     // var pattern = /\d{2}\/\d{2}\/\d{4}/;
//     // var pattern = /1?[0-9]\/[1-3]?[0-9]\/[0-9][0-9][0-9][0-9]/;
//     var pattern = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
//     return pattern.test(value);
//   }, "Insira no formato de DD/MM/AAAA.");
//   $('#avaliar-produto').validate({
//     rules: {
//       rating: {
//         required: true
//       },
//       recomendar: {
//         required: true
//       },
//       titulo_avaliacao: {
//         required: true,
//       },
//       avaliacao: {
//         required: true,
//         minlength: 50
//       },
//       termos: {
//         required: true
//       }
//     }
//   });

//   // $(".submit-comprar").click(function() {
//   //   var voltagemDiv = $('.voltagem-wrapper');
//   //   var corDiv = $('#cor-produto');
//   //   var boxDiv = $('input[name="seller_box"]:checked');
//   //   var quantidadeDiv = $('.pd-quantidade');
//   //   var quantidadeVal = $('#quantidade').val();  
//   //   var corValue = $('#cor-produto').val();
//   //   var voltagemValue = $('.voltagem-wrapper input[type="radio"]:checked').val();
//   //   var verificar = false;
//   //   if (quantidadeDiv.length) {
//   //     if (quantidadeVal === '0' || quantidadeVal == undefined || quantidadeVal == "") {
//   //       $(quantidadeDiv).children('.invalid-feedback').show();
//   //       $(quantidadeDiv).css('border', '1px solid red');
//   //       $('#quantidade').attr({
//   //         "max": 9,
//   //         "min": 1,
//   //         "value": 1
//   //       });
//   //       return false;
//   //     }
//   //   }
//   //   if (corDiv.length) {
//   //     if (corValue === "" || corValue === undefined) {
//   //       $('.drop-down').children('.invalid-feedback').show();
//   //       $('.drop-down').css('border', '1px solid red');
//   //       return false;
//   //     }
//   //   }
//   //   if (voltagemDiv.length) {
//   //     if (voltagemValue === "" || voltagemValue === undefined) {
//   //       $('.voltagem-input').children('.invalid-feedback').show();
//   //       $('.voltagem-wrapper').css('border', '1px solid red');
//   //       return false;
//   //     } else {
//   //       verificar = true;
//   //     }
//   //   }
//   //   if (verificar == true) {
//   // var item = $(`
//   //     <div class="modal-trigger">
//   //       <div class="modal-box">
//   //           <span class="modal-title">O produto escolhido tem: 
//   //             <span class="voltagem-borda">` + voltagemValue + ` volts</span>
//   //           </span>
//   //           <div class="modal-body">
//   //             <span>Deseja continuar?</span>
//   //           </div>
//   //           <div class="modal-buttons">
//   //             <span id="modal-fechar" class="btn voltar" data-ripple>não, voltar</span>
//   //             <button id="modal-continuar" type="submit" class="btn continuar" data-ripple>continuar</button>
//   //           </div>
//   //         </div>
//   //       </div>`)
//   //   .hide()
//   //   .fadeIn(300);
//   // $('#comprar-form').append(item);
//   //     $('#modal-fechar').click(function() {
//   //       $(".modal-trigger").fadeOut(300, function() {
//   //         $(this).remove();
//   //       });
//   //       return false;
//   //     });
//   //     $('#modal-continuar').click(function() {
//   //       return true;
//   //     });
//   //     return false;
//   //   } else {
//   //     alert('aaaa')
//   //     $("#div1").load("demo_test.txt");
//   //   }
//   // });
//   $('#form-cartao').validate({
//     rules: {
//       cartao: {
//         required: true
//       },
//       nome: {
//         required: true
//       },
//       validade: {
//         required: true,
//       },
//       cvv: {
//         required: true,
//         number: true
//       },
//       parcelas: {
//         required: true
//       }
//     }
//   });
//   $('#esqueci-senha').validate({
//     rules: {
//       email: {
//         required: true,
//         email: true
//       }
//     }
//   });
//   $('#esqueci-email').validate({
//     rules: {
//       cpf_cnpj: {
//         required: true
//       }
//     }
//   });
//   $('#adicionar-endereco').validate({
//     rules: {
//       nome_destinatario: {
//         required: true
//       },
//       cep: {
//         required: true
//       },
//       endereco: {
//         required: true,
//       },
//       numero: {
//         required: true,
//         number: true
//       },
//       bairro: {
//         required: true
//       },
//       cidade: {
//         required: true
//       },
//       estado: {
//         required: true
//       }
//     }
//   });
//   $('#editar-endereco').validate({
//     rules: {
//       nome_destinatario: {
//         required: true
//       },
//       cep: {
//         required: true
//       },
//       endereco: {
//         required: true,
//       },
//       numero: {
//         required: true,
//         number: true
//       },
//       bairro: {
//         required: true
//       },
//       cidade: {
//         required: true
//       },
//       estado: {
//         required: true
//       }
//     }
//   });
//   $('#atendimento-form').validate({
//     rules: {
//       tipo: {
//         required: true
//       },
//       email: {
//         required: true,
//         email: true
//       },
//       celular: {
//         required: true,
//         email: true
//       },
//       mensagem: {
//         required: true,
//         lettersonly: true
//       },
//       assunto: {
//         required: true
//       },
//       celular: {
//         required: true
//       }
//     }
//   });
//   $('#cadastro-form').validate({
//     rules: {
//       nome: {
//         required: true
//       },
//       email: {
//         required: true,
//         email: true
//       },
//       nascimento: {
//         required: true,
//         birthday_date: true
//       },
//       celular: {
//         required: true
//       },
//       razao_social: {
//         required: true
//       },
//       nome_fantasia: {
//         required: true
//       },
//       cnpj: {
//         required: true,
//         cnpj: true
//       },
//       cpf: {
//         required: true,
//         cpf: true
//       },
//       senha: {
//         required: true,
//         minlength: 6
//       },
//       confirm: {
//         required: true,
//         equalTo: "#senha"
//       },
//       inscricao_estadual: {
//         required: true
//       },
//       nascimento: {
//         required: true,
//         birthday_date: true
//       },
//       celular_juridico: {
//         required: true
//       }
//     },
//     messages: {
//       cpf: {
//         cpf: 'CPF inválido'
//       },
//       cnpj: {
//         cnpj: 'CNPJ inválido'
//       },
//     }
//   });
//   // Validações para o login
//   $('#login-form').validate({
//     rules: {
//       senha: {
//         minlength: 6,
//         required: true
//       },
//       email: {
//         required: true,
//         email: true
//       }
//     }
//   });
//   // Verificador de força da senha
//   var password = document.getElementById('senha');
//   var meter = document.getElementById('password-strength-meter');
//   var text = document.getElementById('password-strength-text');
//   $('#senha').on("input", function (event) {
//     var val = password.value;
//     var result = zxcvbn(val);
//     // Atualiza o meter
//     meter.value = result.score;
//     if (val !== "") {
//       text.innerHTML = strength[result.score];
//     } else {
//       text.innerHTML = "";
//     }
//   });
//   var strength = {
//     0: "Péssima",
//     1: "Ruim",
//     2: "Fraca",
//     3: "Boa",
//     4: "Forte!"
//   }
//   ////////////////////////////
//   $('#cep').mask('00000-000');
//   $('#cvv').mask('999');
//   // Validações para o cadastro
//   $(".isento-inscricao").click(function () {
//     $('#inscricao_estadual').attr('disabled', function (index, attr) {
//       return attr == 'disabled' ? null : '';
//     });
//   });
//   $('#nascimento').mask('00/00/0000');
//   $('#cpf').mask('000.000.000-00');
//   $('#cnpj').mask('00.000.000/0000-00');
//   $('#telefone_juridico').mask('(00) 0000-0000');
//   $('#celular_juridico').mask('(00) 0 0000-0000');
//   $('#telefone').mask('(00) 0000-0000');
//   $('#celular').mask('(00) 0 0000-0000');
//   $('#inscricao_estadual').mask('000.00000-00');
//   var ativoCPF = false;
//   $('.change-cnpj').on("click", function () {
//     var cpf = '<div id="cpf-active"><label for="cpf">CPF</label><span class="required-form">*</span><input type="text"  class="form-control" value="" id="cpf" name="cpf" placeholder="123.456.789-12"></div>'
//     var cnpj = '<div id="cnpj-active"><label for="cnpj">CNPJ</label><span class="required-form">*</span><input type="text"  class="form-control" value="" id="cnpj" name="cnpj" placeholder="12.345.678/1234-56"></div>'
//     if (ativoCPF === false) {
//       $(".cpf-input").append(cnpj);
//       $('#cnpj').mask('00.000.000/0000-00');
//       $('#cpf-active').remove();
//       ativoCPF = true;
//       console.log(ativoCPF)
//     } else if (ativoCPF === true) {
//       $(".cpf-input").append(cpf);
//       $('#cnpj-active').remove();
//       $('#cpf').mask('000.000.000-00');
//       ativoCPF = false;
//     }
//   });
//   ///////////////////////////
//   jQuery.validator.addMethod("cpf", function (value, element) {
//     value = jQuery.trim(value);
//     value = value.replace('.', '');
//     value = value.replace('.', '');
//     cpf = value.replace('-', '');
//     while (cpf.length < 11) cpf = "0" + cpf;
//     var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
//     var a = [];
//     var b = new Number;
//     var c = 11;
//     for (i = 0; i < 11; i++) {
//       a[i] = cpf.charAt(i);
//       if (i < 9) b += (a[i] * --c);
//     }
//     if ((x = b % 11) < 2) {
//       a[9] = 0
//     } else {
//       a[9] = 11 - x
//     }
//     b = 0;
//     c = 11;
//     for (y = 0; y < 10; y++) b += (a[y] * c--);
//     if ((x = b % 11) < 2) {
//       a[10] = 0;
//     } else {
//       a[10] = 11 - x;
//     }
//     var retorno = true;
//     if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;
//     return this.optional(element) || retorno;
//   }, "Informe um CPF válido");
//   jQuery.validator.addMethod("cnpj", function (value, element) {
//     value = jQuery.trim(value);
//     value = value.replace(/[^\d]+/g, '');
//     var cnpj = value;
//     if (cnpj == '') {
//       return false;
//     }
//     if (cnpj.length != 14) {
//       return false;
//     }
//     // Elimina CNPJs invalidos conhecidos
//     if (cnpj == "00000000000000" ||
//       cnpj == "11111111111111" ||
//       cnpj == "22222222222222" ||
//       cnpj == "33333333333333" ||
//       cnpj == "44444444444444" ||
//       cnpj == "55555555555555" ||
//       cnpj == "66666666666666" ||
//       cnpj == "77777777777777" ||
//       cnpj == "88888888888888" ||
//       cnpj == "99999999999999") {
//       return false;
//     }
//     // Valida DVs
//     tamanho = cnpj.length - 2
//     numeros = cnpj.substring(0, tamanho);
//     digitos = cnpj.substring(tamanho);
//     soma = 0;
//     pos = tamanho - 7;
//     for (i = tamanho; i >= 1; i--) {
//       soma += numeros.charAt(tamanho - i) * pos--;
//       if (pos < 2)
//         pos = 9;
//     }
//     resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
//     if (resultado != digitos.charAt(0))
//       return false;
//     tamanho = tamanho + 1;
//     numeros = cnpj.substring(0, tamanho);
//     soma = 0;
//     pos = tamanho - 7;
//     for (i = tamanho; i >= 1; i--) {
//       soma += numeros.charAt(tamanho - i) * pos--;
//       if (pos < 2)
//         pos = 9;
//     }
//     resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
//     if (resultado != digitos.charAt(1))
//       return false;
//     return true;
//   }, "Informe um CNPJ válido");
//   jQuery.validator.setDefaults({
//     errorElement: 'span',
//     errorPlacement: function (error, element) {
//       error.addClass('invalid-feedback');
//       element.closest('.form-group').append(error);
//     },
//     highlight: function (element, errorClass, validClass) {
//       $(element).addClass('is-invalid');
//     },
//     unhighlight: function (element, errorClass, validClass) {
//       $(element).removeClass('is-invalid');
//     }
//   });
//   $('#pd-more').click(function () {
//     var tamanhoBox = $(".box-slide").height();
//     $('.pd-conteudo').css('height', 'calc(' + tamanhoBox + 'px + 30px)');
//     $(this).addClass('active');
//   });
//   /// Slide categoria filtros 
//   $('.collapse-side').click(function () {
//     $('.ct-sidebar').addClass('active');
//     $('.overlay-mobile').addClass('active');
//     $('body').css('overflow', 'hidden');
//   });
//   $('.collapse-exit').click(function () {
//     $('.ct-sidebar').removeClass('active');
//     $('.overlay-mobile').removeClass('active');
//     $('body').css('overflow', 'auto');
//   });
//   $('#collapse-exit-filter').click(function () {
//     $('.card-collapse-filtrar').each(function () {
//       if ($(this).hasClass('active')) {
//         $(this).toggleClass('active');
//         $('.overlay-mobile').removeClass('active');
//       }
//     });
//   });
//   (function () {
//     'use strict';
//     window.addEventListener('load', function () {
//       // Fetch all the forms we want to apply custom Bootstrap validation styles to
//       var forms = document.getElementsByClassName('needs-validation');
//       // Loop over them and prevent submission
//       var validation = Array.prototype.filter.call(forms, function (form) {
//         form.addEventListener('submit', function (event) {
//           if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//           }
//           form.classList.add('was-validated');
//         }, false);
//       });
//     }, false);
//   })();
//   /////
//   // /*Dropdown Menu*/
//   // $('.drop-down').click(function() {
//   //   $(this).attr('tabindex', 1).focus();
//   //   $(this).toggleClass('active');
//   //   $(this).find('.drop-down-menu').slideToggle(300);
//   // });
//   // $('.drop-down').focusout(function() {
//   //   $(this).removeClass('active');
//   //   $(this).find('.drop-down-menu').slideUp(300);
//   // });
//   // $('.drop-down .drop-down-menu li').click(function() {
//   //   $(this).parents('.drop-down').find('span').text($(this).text());
//   //   $('#cor-produto').val($(this).attr('id')).trigger('change');
//   // });
//   // $('.overlay').click(function() {
//   //   $('.box-carrinho').removeClass('ready');
//   //   $(this).removeClass('active');
//   // })
//   // /* Puxar quantidade de produto carrinho */
//   // var carrinhoQuantidade = $(".carrinho-lista .crt-it").length;

//   // $('#myspan').text(carrinhoQuantidade);
//   // $("#user-hover").hover(function() {
//   //   setTimeout(function() {
//   //     $('.box-module').addClass('ready');
//   //     $('.overlay').addClass('active');
//   //     $('#nav-user').addClass('ready-2');
//   //     $('#icon-arrow-user').css('transform', 'rotateZ(-90deg)');
//   //   }, 200);
//   // }, function() {
//   //   setTimeout(function() {
//   //     $('.box-module').removeClass('ready');
//   //     $('.overlay').removeClass('active');
//   //     $('#nav-user').removeClass('ready-2');
//   //     $('#icon-arrow-user').css('transform', 'rotateZ(90deg)');
//   //   }, 200);
//   // })
//   // $('#cat-todas').click(function() {
//   //   var attr = $(this).attr('aria-expanded');
//   //   if ($('.navbar-categoria').hasClass('fixed')) {
//   //     $('.navbar-categoria').addClass('fixar-cat');
//   //   }
//   //   if (attr == 'false') {
//   //     $(this).attr('aria-expanded', true);
//   //   }
//   //   $('#sidebar').toggleClass('ready');
//   //   $('#cat-todas').toggleClass('ready-2');
//   //   $('.overlay-body').toggleClass('active');
//   //   $('#cat-todas').toggleClass('active');
//   //   $('#icon-arrow').toggleClass('active');
//   // });
//   // $('.btn-fav').click(function() {
//   //   $(this).toggleClass('active');
//   // })
//   // $('.overlay-body').click(function() {
//   //   $('#sidebar').removeClass('ready');
//   //   $('#cat-todas').removeClass('ready-2');
//   //   $('.overlay-body').removeClass('active');
//   //   $('#cat-todas').toggleClass('active');
//   //   $('#icon-arrow').toggleClass('active');
//   //   var attr = $('#cat-todas').attr('aria-expanded');
//   //   if (attr == 'true') {
//   //     $('#cat-todas').attr('aria-expanded', false);
//   //   }
//   // })
//   // $("#carrinho").click(function() {
//   //   $('.box-carrinho').addClass('ready');
//   //   $('.overlay').addClass('active');
//   //   $('#carrinho').addClass('ready-2');
//   //   $('.navbar-header').addClass('ready');
//   //   $('body').css('overflow', 'hidden');
//   //   $('.navbar-categoria').addClass('ready');
//   // });
//   // $('.box-carrinho-fechar').click(function() {
//   //   $('.box-carrinho').removeClass('ready');
//   //   $('.overlay').removeClass('active');
//   //   $('.navbar-header').removeClass('ready');
//   //   $('body').css('overflow', 'auto');
//   //   $('.navbar-categoria').removeClass('ready');
//   // })
//   // $('.nav-user-mobile').click(function() {
//   //   $('.module-mobile').toggleClass('ready');
//   //   $('.mobile-arrow').toggleClass('active');
//   // })
//   // $('.dropdown-hover').hover(
//   //   function() {
//   //     $(this).addClass('show');
//   //     $(this).find('[data-toggle="dropdown"]').attr('aria-expanded', true);
//   //     $(this).find('.dropdown-menu').addClass('show');
//   //   },
//   //   function() {
//   //     $(this).removeClass('show');
//   //     $(this).find('[data-toggle="dropdown"]').attr('aria-expanded', false);
//   //     $(this).find('.dropdown-menu').removeClass('show');
//   //   });
//   // $('.navbar-categoria .nav-link').hover(function() {
//   //   $('.overlay-hover').addClass('active');
//   //   $('.navbar-categoria').addClass('index-z');
//   // }, function() {
//   //   $('.overlay-hover').removeClass('active');
//   //   $('.navbar-categoria').removeClass('index-z');
//   // })
//   // $('.dropdown-menu').hover(function() {
//   //   $('.overlay-hover').addClass('active');
//   //   $('.navbar-categoria').addClass('index-z');
//   // }, function() {
//   //   $('.overlay-hover').removeClass('active');
//   //   $('.navbar-categoria').removeClass('index-z');
//   // })
//   // var tamanhoSide = $(".img-size").height();
//   // $('.img-size').innerHeight(tamanhoSide);
//   // $('#sidebar').innerHeight(tamanhoSide);
//   // $('.expand-footer').click(function() {
//   //   $('.footer-middle').toggleClass('expand');
//   //   $('.expand-footer').toggleClass('expand')
//   //   if ($(this).attr('expandend') === 'mais informações') {
//   //     $(this).attr('expandend', 'menos informações');
//   //   } else {
//   //     $(this).attr('expandend', 'mais informações');
//   //   }
//   // });
//   // $('.btn-comp').click(function() {
//   //   $(this).toggleClass('active');
//   //   $('.compartilhar-pd-f').toggleClass('active');
//   //   $('.compartilhar-pd-t').toggleClass('active');
//   //   $('.compartilhar-pd-w').toggleClass('active');
//   //   $('.overlay-hover').toggleClass('active');
//   // })
//   // $(function() {
//   //   $(".side-menu").menu();
//   //   // Getter
//   //   var position = $(".side-menu").menu("option", "position");
//   //   // Setter
//   //   $(".side-menu").menu("option", "position", {
//   //     my: "left top",
//   //     at: "left+240 top-0 "
//   //   });
//   // });
//   // $('.side-menu li').hover(function() {
//   //   $('.ui-menu-item ul').addClass('active');
//   //   $('.ui-menu-item ul').removeClass('disable');
//   // }, function() {
//   //   $('.ui-menu-item ul').removeClass('active');
//   //   $('.ui-menu-item ul').addClass('disable');
//   // })
//   // $('.side-sub').mouseover(function() {
//   //   $('.ui-menu-item ul').addClass('active');
//   //   $('.ui-menu-item ul').removeClass('disable');
//   // })
//   // $('.side-sub').mouseleave(function() {
//   //   $('.ui-menu-item ul').removeClass('active');
//   //   $('.ui-menu-item ul').addClass('disable');
//   // })
//   // $(".box-mobile").click(function() {
//   //   $('.overlay-mobile').toggleClass('active');
//   //   $('.hamburger').toggleClass('is-active');
//   //   $('#sidebar').toggleClass('active-mobile');
//   //   $('.module-mobile').removeClass('ready');
//   //   $('body').toggleClass('hidden-over');
//   //   var attr = $('.box-mobile button').attr('aria-expanded');
//   //   if (attr == 'false') {
//   //     $('.box-mobile button').attr('aria-expanded', true);
//   //   }
//   //   if (attr == 'true') {
//   //     $('.box-mobile button').attr('aria-expanded', false);
//   //   }
//   // });
//   $(document).scroll(function () {
//     var scroll = $(this).scrollTop();
//     var sidebar = $('#sidebar').hasClass('ready');
//     var sidebarfixed = $('.navbar-categoria').hasClass('fixed');
//     if (scroll === 0) {
//       $('.navbar-categoria').removeClass('topo');
//       $('.navbar-categoria').removeClass('up');
//     } else {
//       $('.navbar-categoria').removeClass('topo');
//     }
//     if (scroll > 50) {
//       $('.navbar-header').addClass('fixed');
//       $('.navbar-categoria').addClass('fixed');
//       $('.mobile-search').css('height', '0px');
//       if (sidebar == true) {
//         $('.navbar-categoria').addClass('fixar-cat');
//       } else {
//         $('.navbar-categoria').removeClass('fixar-cat');
//       }
//     } else {
//       $('.navbar-header').removeClass('fixed');
//       $('.navbar-categoria').removeClass('fixed');
//       $('.mobile-search').css('height', '55px');
//       if (sidebar == true) {
//         $('.navbar-categoria').removeClass('fixar-cat');
//       }
//     }
//   });
//   // Mobile scroll produto
//   // var $item = $("#comprar-item").clone();
//   // $("#comprar-item").clone().prependTo("#mobile-body");
//   // $("#title-product").clone().prependTo("#mobile-title");
//   // $("#mobile-float .pd-precos").attr("class", "pd-precos col-6 p-0");
//   // $("#mobile-float .pd-comprar-btn").attr("class", "pd-comprar-btn col-6 p-0");
//   // $(".user-tooltip").clone().prependTo(".module-mobile");
//   // /////////////////
//   // $('.carrinho-fechar').click(function() {
//   //   $('.box-carrinho').removeClass('ready');
//   //   $('#carrinho').removeClass('ready-2');
//   //   $('.overlay').removeClass('active');
//   // })
//   // $('.voltar-mobile').click(function() {
//   //   $('.ui-menu-item ul').removeClass('active');
//   // })
//   // $('.search-topo').focus(function() {
//   //   $('.overlay').addClass('active');
//   // })
//   // $('.search-topo').focusout(function() {
//   //   $('.overlay').removeClass('active');
//   // });




//   // Active first slider
//   $('.footer-exible').click(function () {
//     $('.mobile-footer-side').toggleClass('active');
//     $('.overlay-mobile').toggleClass('active');
//   });
//   $('.click-informacoes').click(function () {
//     $('.footer-informacoes').addClass('active');
//   })
//   // Clicks
//   $('.click-duvidas').click(function () {
//     $('.footer-duvidas').addClass('active');
//   })
//   $('.click-duvidas').click(function () {
//     $('.footer-duvidas').addClass('active');
//   })
//   $('.click-institucional').click(function () {
//     $('.footer-institucional').addClass('active');
//   })
//   // Toggle
//   $('.click-voltar').click(function () {
//     $('.footer-informacoes').removeClass('active');
//     $('.footer-duvidas').removeClass('active');
//     $('.footer-institucional').removeClass('active');
//   })
//   $('.click-voltar-info').click(function () {
//     $('.mobile-footer-side').toggleClass('active');
//     $('.overlay-mobile').toggleClass('active');
//   })
//   ///
//   $('.filter-show-result').click(function () {
//     $(this).toggleClass('active');
//   })
//   $('.ct-collapse').click(function () {
//     $(this).toggleClass('active');
//     $('#pd-more').click(function () {
//       $('.box-slide').addClass('expand');
//     })
//   });
//   'use strict';
//   var c, currentScrollTop = 0,
//     navbar = $('.navbar-categoria');
//   $(window).scroll(function () {
//     var a = $(window).scrollTop();
//     var b = navbar.height();
//     currentScrollTop = a;
//     if (c < currentScrollTop && a > b + b) {
//       navbar.addClass("up");
//     } else if (c > currentScrollTop && !(a <= b)) {
//       navbar.removeClass("up");
//     }
//     c = currentScrollTop;
//   });
//   // MAD-RIPPLE // (jQ+CSS)
//   $(document).on("mousedown", "[data-ripple]", function (e) {
//     var $self = $(this);
//     if ($self.is(".btn-disabled")) {
//       return;
//     }
//     if ($self.closest("[data-ripple]")) {
//       e.stopPropagation();
//     }
//     var initPos = $self.css("position"),
//       offs = $self.offset(),
//       x = e.pageX - offs.left,
//       y = e.pageY - offs.top,
//       dia = Math.min(this.offsetHeight, this.offsetWidth, 100), // start diameter
//       $ripple = $('<div/>', {
//         class: "ripple",
//         appendTo: $self
//       });
//     if (!initPos || initPos === "static") {
//       $self.css({
//         position: "relative"
//       });
//     }
//     $('<div/>', {
//       class: "rippleWave",
//       css: {
//         background: $self.data("ripple"),
//         width: dia,
//         height: dia,
//         left: x - (dia / 2),
//         top: y - (dia / 2),
//       },
//       appendTo: $ripple,
//       one: {
//         animationend: function () {
//           $ripple.remove();
//         }
//       }
//     });
//   });
//   $(document).on("input", "#avaliacao", function () {
//     var caracteresDigitados = $(this).val().length;
//     $(".contador").text(caracteresDigitados);
//   });
//   $('.show-pass').click(function () {
//     if ($('#senha').attr('type') == 'text') {
//       $('#senha').attr('type', 'password');
//       $(this).removeClass('view');
//     } else {
//       $('#senha').attr('type', 'text');
//       $(this).addClass('view');
//     }
//   });
//   /* Ajustar modal boostrap 4 para multiplos modals */
//   $('.modal').on('show.bs.modal', function () {
//     var modS = $('.modal').not($(this)),
//       modZ = 0;
//     modS.each(function () {
//       var zIdx = $(this).css('z-index');
//       if (zIdx >= modZ) {
//         modZ = parseInt(zIdx) + 1;
//       }
//     });
//     $(this).css('z-index', modZ);
//   });
//   /*  Adicionar value ao input number na página de produto (colocar ajax caso necessite)   */
//   $(function () {
//     $("span").on("click", function () {
//       var $button = $(this);
//       var oldValue = $button.parent().find("input").val();
//       if ($button.text() == "+") {
//         var newVal = parseFloat(oldValue) + 1;
//         if (oldValue == 9) {
//           newVal = 9;
//         }
//       } else {
//         // Don't allow decrementing below zero
//         if (oldValue > 1) {
//           var newVal = parseFloat(oldValue) - 1;
//         } else {
//           newVal = 1;
//         }
//       }
//       $button.parent().find("#quantidade").val(newVal);
//     });
//   });
//   /*  --------------------------------   */
//   // $('#cores-select').on('change', function() {
//   //   var optionValue = $(this).val();
//   //   var optionText = $('#dropdownList option[value="' + optionValue + '"]').text();
//   //   var optionText = $("#dropdownList option:selected").text();
//   //   alert("Selected Option Text: " + optionText);
//   // });
//   // Carousels
//   // $('.banner-central').owlCarousel({
//   //   items: 1,
//   //   loop: true,
//   //   autoWidth: false,
//   //   autoplay: true,
//   //   autoplayTimeout: 8000,
//   //   autoplayHoverPause: true,
//   //   responsive: {
//   //     991: {
//   //       items: 1,
//   //       mergeFit: false,
//   //       autoWidth: true,
//   //       autoHeight: false,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     1104: {
//   //       items: 1,
//   //       autoWidth: false,
//   //       autoHeight: false,
//   //       nav: true,
//   //       dots: true
//   //     }
//   //   }
//   // });
//   // $('.banner-categoria').owlCarousel({
//   //   items: 1,
//   //   loop: true,
//   //   autoWidth: false,
//   //   autoplay: true,
//   //   autoplayTimeout: 8000,
//   //   autoplayHoverPause: true,
//   //   responsive: {
//   //     991: {
//   //       items: 1,
//   //       mergeFit: false,
//   //       autoWidth: true,
//   //       autoHeight: false,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     1104: {
//   //       items: 1,
//   //       autoWidth: false,
//   //       autoHeight: false,
//   //       nav: true,
//   //       dots: true
//   //     }
//   //   }
//   // });
//   // $('.carousel-destaque').owlCarousel({
//   //   items: 1,
//   //   loop: true,
//   //   autoWidth: false,
//   //   autoplay: true,
//   //   autoplayTimeout: 8000,
//   //   autoplayHoverPause: true,
//   //   responsive: {
//   //     991: {
//   //       items: 1,
//   //       mergeFit: false,
//   //       autoWidth: true,
//   //       autoHeight: false,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     1104: {
//   //       items: 1,
//   //       autoWidth: false,
//   //       autoHeight: false,
//   //       nav: true,
//   //       dots: true
//   //     }
//   //   }
//   // });
//   // $('.banners-produto-row').owlCarousel({
//   //   items: 5,
//   //   merge: true,
//   //   lazyLoad: true,
//   //   animateIn: true,
//   //   dots: true,
//   //   nav: false,
//   //   autoHeight: false,
//   //   autoWidth: false,
//   //   responsive: {
//   //     0: {
//   //       items: 2,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     575: {
//   //       items: 2,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     991: {
//   //       items: 3,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     1000: {
//   //       items: 5,
//   //       nav: false,
//   //       dots: true
//   //     }
//   //   }
//   // });
//   // $('.produto-carousel').owlCarousel({
//   //   merge: true,
//   //   animateIn: true,
//   //   dots: true,
//   //   nav: true,
//   //   autoHeight: false,
//   //   autoWidth: false,
//   //   responsive: {
//   //     0: {
//   //       items: 2,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: true,
//   //       autoHeight: false,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     576: {
//   //       items: 2,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: true,
//   //       autoHeight: false,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     767: {
//   //       items: 2,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: true,
//   //       autoHeight: false,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     991: {
//   //       items: 2,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: true,
//   //       autoHeight: false,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     1194: {
//   //       items: 3,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: false,
//   //       autoHeight: false,
//   //       nav: true,
//   //       dots: true
//   //     },
//   //     1200: {
//   //       items: 4,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: false,
//   //       autoHeight: false,
//   //       nav: true,
//   //       dots: true
//   //     },
//   //     1300: {
//   //       items: 5,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: false,
//   //       autoHeight: false,
//   //       nav: true,
//   //       dots: true
//   //     }
//   //   }
//   // });
//   // $('.categoria-carousel').owlCarousel({
//   //   merge: true,
//   //   animateIn: true,
//   //   dots: true,
//   //   nav: true,
//   //   autoHeight: false,
//   //   autoWidth: false,
//   //   responsive: {
//   //     0: {
//   //       items: 2,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: true,
//   //       autoHeight: false,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     576: {
//   //       items: 2,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: true,
//   //       autoHeight: false,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     767: {
//   //       items: 2,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: true,
//   //       autoHeight: false,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     991: {
//   //       items: 2,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: true,
//   //       autoHeight: false,
//   //       nav: false,
//   //       dots: true
//   //     },
//   //     1194: {
//   //       items: 3,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: false,
//   //       autoHeight: false,
//   //       nav: true,
//   //       dots: false
//   //     },
//   //     1200: {
//   //       items: 4,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: false,
//   //       autoHeight: false,
//   //       nav: true,
//   //       dots: false
//   //     },
//   //     1300: {
//   //       items: 4,
//   //       margin: 15,
//   //       mergeFit: false,
//   //       autoWidth: false,
//   //       autoHeight: false,
//   //       nav: true,
//   //       dots: false
//   //     }
//   //   }
//   // });
// });

// function enableFieldset()
// {
//   var x = document.getElementById("endereco");
//   x.disabled = false;
// }

// function disableFieldset()
// {
//   var x = document.getElementById("endereco");
//   x.disabled = true;
// }

// disableFieldset()