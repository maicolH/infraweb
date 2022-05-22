$(document).ready(function(){

  // MODAL
  var modalText = {
    roambi: {
      title: 'Laravel',
      tag: 'El marco PHP para artesanos web',
      detail: 'Laravel es un marco de aplicación web con sintaxis expresiva y elegante. Con su Modelo de arquitectura MVC Permite que el sistema sea escalable si es requerido.',
      link: 'https://laravel.com/'
    },
    walker: {
      title: 'Desarrollo web',
      tag: 'Adaptable',
      detail: 'El desarrollo web de la imagen de tu negocio en Internet no es algo trivial, requiere de la combinación de varias disciplinas para obtener un trabajo de calidad, desde usabilidad y diseño, pasando por habilidades de programación y desarrollo, hasta conocimientos de posicionamiento en buscadores.',
    },
    powur: {
      title: 'software',
      tag: 'Escalable y Robusto.',
      detail: 'Utilizamos el .NET framework y .NET Native IDE para programar aplicaciones para escritorio de Windows, además de escenarios en la nube, IoT y alojados en la web. Brindamos una gama completa de servicios de administración y desarrollo de aplicaciones, que incluyen conversiones de VB.NET, migraciones y modernizaciones de aplicaciones heredadas, así como depuración, rastreo, refactorización, creación de perfiles y servicios de subprocesamiento administrado. También usamos MonoDevelop para crear aplicaciones de escritorio y web multiplataforma.',
    },
    mystand: {
      title: 'Cableado',
      tag: 'Datos y Electrico',
      detail: 'Diseño, evaluación y adaptación de cableado estructurado, brindando soluciones de conectividad para redes de comunicaciones y electricas. Gracias a nuestras soluciones proporcionamos integracion a todo tipo de infraestructuras.',
    },
    never: {
      title: 'CMS',
      tag: 'Gestores de Contenido',
      detail: 'permite a los usuarios crear contenido sin necesidad de contar con conocimientos técnicos muy específicos. Es probable que hayáis oido hablar de algunos de los CMS más populares que solemos utilizar los programadores, como Drupal, WordPress, Joomla, El desarrollo basado en un CMS tiene una gran cantidad de ventajas que hacen que sea una opción muy recomendable a la hora de plantear una web',
    },
    themall: {
      title: 'Servidores',
      tag: 'Adecuacion ',
      detail: 'Contamos con un servicio de configuración e instalación de servidores empresariales que necesitan de ayuda de un ingeniero o técnico experto en la instalación, configuración y asesoramiento para su correcto funcionamiento en Colombia. Nuestro servicio de configuración e instalación de servidores cuentan con personal altamente especializado y entrenado en el manejo de relaciones interpersonales que le ayudarán a encontrar solución a sus requerimientos puntuales.',
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
              
    });
  }
})
