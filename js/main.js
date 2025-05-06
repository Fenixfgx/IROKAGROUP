(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);


async function cargarCarrusel(sheetName) {
    const url = 'https://script.google.com/macros/s/AKfycbzao-PiXRODtJbV7t9e4kXEoap_pL2iIFyxLUlf7ugX3YiOgk8m7et7GQqRa0Olw-Lh/exec'; // Tu URL de Web App
  
    try {
      const response = await fetch(`${url}?sheet=${sheetName}`);
      const data = await response.json();
  
      if (data.error) {
        console.error(data.error);
        return;
      }
  
      const carouselInner = document.querySelector('.carousel-inner');
      carouselInner.innerHTML = ''; // limpiamos el carrusel
  
      data.forEach((item, index) => {
        const activeClass = index === 0 ? 'active' : '';
        const carouselItem = `
          <div class="carousel-item ${activeClass}">
          <img class="w-100" src="${item.imagen}" alt="Imagen">
          <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
            <h2 class="text-primary font-weight-medium m-0">${item.titulo}</h2>
            <h1 class="display-1 text-white m-0">${item.subtitulo}</h1>
            <h2 class="text-white m-0"> ${item.año} </h2>
          </div>
        </div>
      `;
      carouselInner.innerHTML += carouselItem;
    });  
    } catch (error) {
      console.error('Error cargando carrusel:', error);
    }
  }
  
  async function cargarQuienesSomos() {
    const url = 'https://script.google.com/macros/s/AKfycbzao-PiXRODtJbV7t9e4kXEoap_pL2iIFyxLUlf7ugX3YiOgk8m7et7GQqRa0Olw-Lh/exec';
    try {
        const response = await fetch(`${url}?sheet=QS`);
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        const historia = data.find(item => item.seccion.toLowerCase() === 'historia');
        const vision = data.find(item => item.seccion.toLowerCase() === 'vision');

        // Reemplazar contenido de la sección "Our Story"
        if (historia) {
            document.getElementById('qs-historia-titulo').textContent = historia.titulo;
            document.getElementById('qs-historia-texto').textContent = historia.texto;
        }

        // Reemplazar contenido de la sección "Our Vision"
        if (vision) {
            document.getElementById('qs-vision-titulo').textContent = vision.titulo;
            document.getElementById('qs-vision-texto').textContent = vision.texto;
        }

    } catch (error) {
        console.error('Error cargando sección Quienes Somos:', error);
    }
}

async function cargarEmpresas() {
    const url = 'https://script.google.com/macros/s/AKfycbzao-PiXRODtJbV7t9e4kXEoap_pL2iIFyxLUlf7ugX3YiOgk8m7et7GQqRa0Olw-Lh/exec';
    try {
        const response = await fetch(`${url}?sheet=Empresas`);
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        const contenedor = document.getElementById('empresas');
        contenedor.innerHTML = ''; // Limpiamos contenido anterior

        data.forEach(empresa => {
            const card = document.createElement('div');
            card.className = 'col-lg-6 mb-5';
            card.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-sm-5">
                        <img class="img-fluid mb-3 mb-sm-0" src="${empresa.imagen}" alt="">
                    </div>
                    <div class="col-sm-7">
                        <h4><i class="fa ${empresa.icono} service-icon"></i>${empresa.titulo}</h4>
                        <p class="m-0">${empresa.contenido}</p>
                        <a href="${empresa.url}" target="_blank" class="btn btn-primary mt-2">Visitar</a>
                    </div>
                </div>
            `;
            contenedor.appendChild(card);
        });

    } catch (error) {
        console.error('Error cargando Empresas:', error);
    }
}

async function cargarVC() {
    const url = 'https://script.google.com/macros/s/AKfycbzao-PiXRODtJbV7t9e4kXEoap_pL2iIFyxLUlf7ugX3YiOgk8m7et7GQqRa0Olw-Lh/exec';
    try {
        const response = await fetch(`${url}?sheet=VC`);
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        // Filtrar principios y líneas de acción
        const principios = data.filter(item => item.tipo === 'principio');
        const lineasAccion = data.filter(item => item.tipo === 'linea');

        // Cargar principios
        const principiosList = document.getElementById('principios-list');
        principiosList.innerHTML = '';
        principios.forEach(item => {
            const li = document.createElement('li');
            li.className = 'mb-3';
            li.innerHTML = `
                <div class="d-flex align-items-start">
                    <i class="fas fa-check-circle text-primary mr-2 mt-1"></i>
                    <div>
                        <h5 class="text-white mb-1">${item.titulo}</h5>
                        <p class="text-light mb-0">${item.descripcion}</p>
                    </div>
                </div>
            `;
            principiosList.appendChild(li);
        });

        // Cargar líneas de acción
        const modeloList = document.getElementById('modelo-list');
        modeloList.innerHTML = '';
        lineasAccion.forEach(item => {
            const li = document.createElement('li');
            li.className = 'mb-3';
            li.innerHTML = `
                <div class="d-flex align-items-start">
                    <i class="fas fa-arrow-right text-primary mr-2 mt-1"></i>
                    <div>
                        <h5 class="text-white mb-1">${item.titulo}</h5>
                        <p class="text-light mb-0">${item.descripcion}</p>
                    </div>
                </div>
            `;
            modeloList.appendChild(li);
        });

    } catch (error) {
        console.error('Error cargando Valores Corporativos:', error);
    }
}

async function cargarAreasNegocio() {
    const url = 'https://script.google.com/macros/s/AKfycbzao-PiXRODtJbV7t9e4kXEoap_pL2iIFyxLUlf7ugX3YiOgk8m7et7GQqRa0Olw-Lh/exec';
    
    try {
        const response = await fetch(`${url}?sheet=Negocios`);
        const data = await response.json();

        if (data.error || !Array.isArray(data)) {
            console.error('Error en datos:', data.error || 'Formato inválido');
            return;
        }

        // Filtrar áreas por sector
        const industriales = data.filter(item => item.sector === 'industrial');
        const servicios = data.filter(item => item.sector === 'servicios');

        // Función helper para crear el HTML de cada área
        const createAreaHTML = (area) => `
            <div class="row align-items-center mb-5">
                <div class="col-4 col-sm-3">
                    <div style="
                        width: 120px;
                        height: 120px;
                        border-radius: 50%;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #f8f9fa;
                        margin: 0 auto;
                    ">
                        <img style="
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        " 
                        src="${area.imagen_url || 'img/not-found.png'}" 
                        alt="${area.titulo || 'Área de negocio'}"
                        onerror="this.onerror=null; this.src='img/not-found.png';">
                    </div>
                </div>
                <div class="col-8 col-sm-9">
                    <h4>${area.titulo || 'Sin título'}</h4>
                    <p class="m-0">${area.descripcion || 'Sin descripción'}</p>
                </div>
            </div>
        `;

        // Cargar sector industrial
        const sectorIndustrial = document.getElementById('sector-industrial');
        if (sectorIndustrial) {
            sectorIndustrial.innerHTML = industriales.map(createAreaHTML).join('');
        }

        // Cargar sector servicios
        const sectorServicios = document.getElementById('sector-servicios');
        if (sectorServicios) {
            sectorServicios.innerHTML = servicios.map(createAreaHTML).join('');
        }

    } catch (error) {
        console.error('Error cargando áreas de negocio:', error);
    }
}

async function enviarMensaje(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Prevenir múltiples envíos
    if (submitButton.disabled) {
        return false;
    }
    
    try {
        // Validar el formulario
        const formData = new FormData(form);
        const data = {
            empresa: formData.get('empresa'),
            contacto: formData.get('contacto'),
            email: formData.get('email'),
            area: formData.get('area'),
            mensaje: formData.get('mensaje')
        };

        // Validar campos requeridos
        for (const [key, value] of Object.entries(data)) {
            if (!value) {
                throw new Error(`El campo ${key} es requerido`);
            }
        }

        // Deshabilitar el botón y mostrar estado
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        // Crear un temporizador para prevenir múltiples envíos
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Tiempo de espera agotado')), 5000);
        });

        // Enviar datos al script de Google
        const fetchPromise = fetch(
            'https://script.google.com/macros/s/AKfycbzpxxEQeptXOrjuo-vfMd2EdQYK-qB21WsFNVdIsXsdOcxe0xvnbnvRB_NHwOEl7S-JQQ/exec',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'no-cors'
            }
        );

        // Esperar la respuesta o el timeout, lo que ocurra primero
        await Promise.race([fetchPromise, timeoutPromise]);

        // Esperar un momento antes de mostrar el mensaje de éxito
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mostrar mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Mensaje enviado correctamente',
            confirmButtonColor: '#DA9F5B'
        });

        // Limpiar formulario
        form.reset();

        // Prevenir nuevos envíos por un momento
        await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
        console.error('Error:', error);
        
        // Mostrar mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al enviar el mensaje. Por favor, intente nuevamente.',
            confirmButtonColor: '#DA9F5B'
        });

    } finally {
        // Restaurar el botón
        submitButton.disabled = false;
        submitButton.innerHTML = 'Enviar Mensaje';
    }

    return false;
}

async function cargarNuestroEquipo() {
    const url = 'https://script.google.com/macros/s/AKfycbzao-PiXRODtJbV7t9e4kXEoap_pL2iIFyxLUlf7ugX3YiOgk8m7et7GQqRa0Olw-Lh/exec';
    
    try {
        const response = await fetch(`${url}?sheet=NE`);
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        // Destruir el carrusel existente antes de actualizarlo
        if ($('.testimonial-carousel').data('owl.carousel')) {
            $('.testimonial-carousel').trigger('destroy.owl.carousel');
        }

        const carouselContainer = document.querySelector('.testimonial-carousel');
        carouselContainer.innerHTML = '';

        data.forEach(miembro => {
            const testimonialItem = `
                <div class="testimonial-item">
                    <div class="d-flex align-items-center mb-3">
                        <img class="img-fluid mr-3 rounded-circle" 
                             src="${miembro.foto_url || 'img/not-found.png'}" 
                             style="width: 60px; height: 60px; object-fit: cover;"
                             alt="${miembro.nombre}"
                             onerror="this.onerror=null; this.src='img/not-found.png';">
                        <div>
                            <h4 class="text-primary mb-1">${miembro.nombre}</h4>
                            <small class="text-uppercase">${miembro.cargo}</small>
                        </div>
                    </div>
                    <div class="testimonial-text bg-white p-4">
                        <p class="m-0">${miembro.descripcion}</p>
                    </div>
                </div>
            `;
            carouselContainer.innerHTML += testimonialItem;
        });

        // Reinicializar el carrusel con la configuración original
        $('.testimonial-carousel').owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            loop: true,
            center: true,
            margin: 30,
            responsive: {
                0:{
                    items:1
                },
                576:{
                    items:1
                },
                768:{
                    items:2
                },
                992:{
                    items:3
                }
            }
        });

    } catch (error) {
        console.error('Error cargando Nuestro Equipo:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    cargarCarrusel('SLIDER');
    cargarQuienesSomos();
    cargarEmpresas();
    cargarVC();  // Llamada a la función cargarVC
    cargarAreasNegocio();
    cargarNuestroEquipo();
});

document.addEventListener('DOMContentLoaded', function() {
    // Manejo de navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Ajustar el offset según la altura de tu navbar
                const navHeight = document.querySelector('.nav-bar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Actualizar clase active
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Observador de intersección para animaciones de entrada
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Actualizar navegación activa
                const id = entry.target.id;
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.2
    });

    // Observar todas las secciones
    document.querySelectorAll('section, .container-fluid').forEach(section => {
        section.classList.add('section-fade');
        observer.observe(section);
    });

    // Activar la primera sección por defecto
    document.querySelector('.nav-item').classList.add('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.nav-bar');
    const inicio = document.querySelector('#inicio');
    let lastScrollTop = 0;

    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const inicioHeight = inicio.offsetHeight;
        const navbarHeight = navbar.offsetHeight;

        // Verificar si estamos fuera de la sección de inicio
        if (scrollTop > (inicioHeight - navbarHeight)) {
            if (!navbar.classList.contains('scrolled')) {
                navbar.classList.add('scrolled');
                // Aplicar transición suave para la altura
                navbar.style.height = '70px';
            }
        } else {
            navbar.classList.remove('scrolled');
            // Restaurar altura original
            navbar.style.height = '';
        }

        lastScrollTop = scrollTop;
    }

    // Actualizar navbar al hacer scroll
    window.addEventListener('scroll', updateNavbar);
    
    // Actualizar navbar al cargar la página
    updateNavbar();

    // Actualizar navbar cuando cambie el tamaño de la ventana
    window.addEventListener('resize', updateNavbar);
});

async function cargarFooter() {
    const url = 'https://script.google.com/macros/s/AKfycbzao-PiXRODtJbV7t9e4kXEoap_pL2iIFyxLUlf7ugX3YiOgk8m7et7GQqRa0Olw-Lh/exec';
    
    try {
        const response = await fetch(`${url}?sheet=footer`);
        const data = await response.json();

        console.log('Datos recibidos del footer:', data);

        // Cargar enlaces de acceso
        const linksContainer = document.getElementById('footer-links');
        
        if (!linksContainer) {
            console.error('No se encontró el contenedor de enlaces');
            return;
        }

        const enlaces = data.filter(item => item.tipo === 'enlaces');
        console.log('Enlaces filtrados:', enlaces);

        if (enlaces && enlaces.length > 0) {
            // Dividir los enlaces en dos grupos para las columnas
            const mitad = Math.ceil(enlaces.length / 2);
            const columna1 = enlaces.slice(0, mitad);
            const columna2 = enlaces.slice(mitad);

            const createLinkHTML = (enlace) => {
                const isInternal = enlace.valor.startsWith('#');
                return `
                    <div class="d-flex mb-2">
                        <i class="fa fa-angle-right text-primary mr-2" style="margin-top: 4px;"></i>
                        <a class="text-white" 
                           href="${enlace.valor}"
                           ${!isInternal ? 'target="_blank"' : ''}>
                            ${enlace.campo}
                        </a>
                    </div>
                `;
            };

            const linksHTML = `
                <div class="row">
                    <div class="col-6">
                        ${columna1.map(createLinkHTML).join('')}
                    </div>
                    <div class="col-6">
                        ${columna2.map(createLinkHTML).join('')}
                    </div>
                </div>
            `;

            console.log('HTML generado para enlaces:', linksHTML);
            linksContainer.innerHTML = linksHTML || '<p class="text-white">No hay enlaces disponibles</p>';
        } else {
            console.log('No se encontraron enlaces');
            linksContainer.innerHTML = '<p class="text-white">No hay enlaces disponibles</p>';
        }

        // Cargar datos de contacto
        const contactoContainer = document.getElementById('footer-contact');
        const contacto = data.find(item => item.tipo === 'contacto');
        console.log('Datos de contacto:', contacto); // Para depuración

        if (contacto) {
            contactoContainer.innerHTML = `
                <p><i class="fa fa-map-marker-alt mr-2"></i>${contacto.valor || 'Dirección no disponible'}</p>
                <p><i class="fa fa-phone-alt mr-2"></i>${contacto.telefono || contacto.valor || 'Teléfono no disponible'}</p>
                <p class="m-0"><i class="fa fa-envelope mr-2"></i>${contacto.email || contacto.valor || 'Email no disponible'}</p>
            `;
        }

        // Cargar datos de redes sociales
        const socialText = document.getElementById('footer-social-text');
        const socialLinks = document.getElementById('footer-social-links');
        const sociales = data.filter(item => item.tipo === 'social');
        console.log('Datos sociales:', sociales); // Para depuración

        if (sociales.length > 0) {
            // Buscar la descripción
            const descripcion = sociales.find(s => s.campo === 'descripcion')?.valor;
            socialText.textContent = descripcion || 'Síguenos en nuestras redes sociales';

            // Generar los enlaces sociales
            socialLinks.innerHTML = sociales.map(s => {
                if (s.campo !== 'descripcion' && s.valor) {
                    return `<a class="btn btn-lg btn-outline-light btn-lg-square mr-2" 
                              href="${s.valor}" 
                              target="_blank">
                              <i class="fab fa-${s.campo}"></i>
                           </a>`;
                }
                return '';
            }).join('');
        }

        // Cargar horarios
        const hoursContainer = document.getElementById('footer-hours');
        const horarios = data.filter(item => item.tipo === 'horarios');
        console.log('Datos horarios:', horarios); // Para depuración

        if (horarios.length > 0) {
            const semana = horarios.find(h => h.campo === 'semana')?.valor;
            const finsemana = horarios.find(h => h.campo === 'finsemana')?.valor;

            hoursContainer.innerHTML = `
                <h6 class="text-white text-uppercase">Lunes - Viernes</h6>
                <p>${semana || '8:00 AM - 6:00 PM'}</p>
                <h6 class="text-white text-uppercase">Sábado - Domingo</h6>
                <p>${finsemana || 'Cerrado'}</p>
            `;
        }

    } catch (error) {
        console.error('Error cargando footer:', error);
    }
}

// Agregar la llamada a la función en el DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    cargarFooter();
});