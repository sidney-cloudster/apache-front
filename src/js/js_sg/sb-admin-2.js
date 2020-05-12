$(document).ready(function() {



  


$('.date').mask('00/00/0000');
$('.time').mask('00:00');

$("#faixa_tipo input[type='radio']").on("change", function() {
  var html = "banners-faixa-html";
  var imagem = "banners-faixa-imagens";

  if ($(this).val() == "html") {
    $('a.faixa_link').attr('href', html);
    $('a.faixa_link').removeClass('disabled');
  } else {
    $('a.faixa_link').attr('href', imagem);
    $('a.faixa_link').removeClass('disabled');
  }

});


      // Define an extended mixed-mode that understands vbscript and
      // leaves mustache/handlebars embedded templates in html mode
      var mixedMode = {
        name: "htmlmixed",
        scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
                       mode: null},
                      {matches: /(text|application)\/(x-)?vb(a|script)/i,
                       mode: "vbscript"}]
      };
      var editor = CodeMirror.fromTextArea(document.getElementById("texthtml"), {
        mode: mixedMode,
        selectionPointer: true,
        lineNumbers: true,
        matchBrackets: true,
        theme: "monokai"
      });









  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

});

    // Toggle the side navigation
    $("#sidebarToggleTop").on('click', function(e) {
      $(".overlay").toggleClass("active");
      $(this).toggleClass('is-active');
      $('body').toggleClass('sidebar-expand')
      $(".sidebar-wrapper").toggleClass("expand");
      if ($(".sidebar-wrapper").hasClass("expand")) {
        $('.sidebar .collapse').collapse('hide');
      };
    });
  
    $('#sidebarToggle').on('click', function(e) {
      $(".sidebar-wrapper").toggleClass("toggled");
      $('.conteudo').toggleClass('toggled');
      $('.navbar-topo').toggleClass('toggled');
      $('.subheader').toggleClass('toggled');
      if ($(".sidebar-wrapper").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      };
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      };
    })

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});


$( function() {
  $(".date").datepicker({
    dateFormat: 'dd/mm/yy',
    showOtherMonths: true,
    selectOtherMonths: true,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    nextText: 'Proximo',
    prevText: 'Anterior'
  });
} );

jQuery(function($) {

  // MAD-RIPPLE // (jQ+CSS)
  $(document).on("mousedown", "[data-ripple]", function(e) {
    
    var $self = $(this);
    
    if($self.is(".btn-disabled")) {
      return;
    }
    if($self.closest("[data-ripple]")) {
      e.stopPropagation();
    }
    
    var initPos = $self.css("position"),
        offs = $self.offset(),
        x = e.pageX - offs.left,
        y = e.pageY - offs.top,
        dia = Math.min(this.offsetHeight, this.offsetWidth, 100), // start diameter
        $ripple = $('<div/>', {class : "ripple",appendTo : $self });
    
    if(!initPos || initPos==="static") {
      $self.css({position:"relative"});
    }
    
    $('<div/>', {
      class : "rippleWave",
      css : {
        background: $self.data("ripple"),
        width: dia,
        height: dia,
        left: x - (dia/2),
        top: y - (dia/2),
      },
      appendTo : $ripple,
      one : {
        animationend : function(){
          $ripple.remove();
        }
      }
    });
  });

});

function shortenLargeNumber(num, digits) {
  var units = ['mi', 'bi', 'T', 'P', 'E', 'Z', 'Y'],
      decimal;

  for(var i=units.length-1; i>=0; i--) {
      decimal = Math.pow(1000000, i+1);

      if(num <= -decimal || num >= decimal) {
          return +(num / decimal).toFixed(digits) + units[i];
      }
  }

  return num;
}

$('.pr-number-click').each(function() {
  var numeros = $(this).text();
  var numerosConvertidos = shortenLargeNumber(numeros);
  $(this).text(numeros.replace(numeros, numerosConvertidos)); 
});

 









