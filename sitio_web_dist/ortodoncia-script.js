/* ======================================
   CLÍNICA DENTAL YANY - LANDING ORTODONCIA
   JavaScript - Vanilla JS (No jQuery)
   ====================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    /* ======================================
       CONFIGURACIÓN INICIAL
       ====================================== */

    // Configurar reCAPTCHA site key
    const RECAPTCHA_SITE_KEY = '6LeCkVwsAAAAAC_BpDV1xGDEEQNTGHUlMZtwza9-'; // Site Key (Clave del sitio)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzausXsGUpcOrJ7rsWqCq5UIVSHcx-9jiR8tlwpaRYFkC_dUE2C1ssFBkyU6b7GnEGQ/exec';

    /* ======================================
       GSAP ANIMATIONS
       ====================================== */

    // Registrar ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero fade in animation
    gsap.from('.hero-content', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
    });

    /* ======================================
       AOS (ANIMATE ON SCROLL) INITIALIZATION
       ====================================== */

    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: 'mobile' // Opcional: deshabilitar en móvil para mejor performance
    });

    /* ======================================
       SWIPER CAROUSEL (TESTIMONIALS)
       ====================================== */

    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    /* ======================================
       COUNTUP.JS (ANIMATED NUMBERS)
       ====================================== */

    const countUpElements = document.querySelectorAll('[data-countup]');

    const countUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const targetNumber = parseInt(entry.target.getAttribute('data-countup'));

                const countUp = new CountUp(entry.target, targetNumber, {
                    duration: 2.5,
                    separator: '.',
                    decimal: ',',
                    useEasing: true,
                    useGrouping: true,
                });

                if (!countUp.error) {
                    countUp.start();
                } else {
                    console.error(countUp.error);
                }

                // Track event
                dataLayerPush('number_animation', {
                    number_type: entry.target.closest('.stat') ? 'stat' : 'hero_stat',
                    value: targetNumber
                });
            }
        });
    }, { threshold: 0.5 });

    countUpElements.forEach(el => countUpObserver.observe(el));

    /* ======================================
       SMOOTH SCROLL TO ANCHOR
       ====================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; // Offset for fixed headers if any
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Track CTA clicks
                const ctaType = this.getAttribute('data-cta');
                if (ctaType) {
                    dataLayerPush('cta_click', {
                        cta_location: ctaType,
                        destination: targetId
                    });
                }
            }
        });
    });

    /* ======================================
       STICKY CTA (APPEARS ON SCROLL)
       ====================================== */

    const stickyCta = document.getElementById('stickyCta');
    const heroSection = document.getElementById('hero');

    window.addEventListener('scroll', function () {
        if (heroSection) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollPosition = window.pageYOffset;

            if (scrollPosition > heroBottom) {
                stickyCta.classList.add('show');
            } else {
                stickyCta.classList.remove('show');
            }
        }
    });

    // Track sticky CTA click
    const stickyCtaButton = stickyCta.querySelector('.cta-sticky');
    if (stickyCtaButton) {
        stickyCtaButton.addEventListener('click', function () {
            dataLayerPush('cta_click', {
                cta_location: 'sticky_footer',
                cta_type: 'sticky_button'
            });
        });
    }

    /* ======================================
       FAQ ACCORDION
       ====================================== */

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');

                // Track FAQ interaction
                dataLayerPush('faq_interaction', {
                    question: question.textContent.trim()
                });
            }
        });
    });

    /* ======================================
       FORM VALIDATION & SUBMISSION (PARSLEY.JS)
       ====================================== */

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        // Initialize Parsley
        const parsleyForm = $(contactForm).parsley({
            errorClass: 'parsley-error',
            successClass: 'parsley-success',
            errorsWrapper: '<ul class="parsley-errors-list"></ul>',
            errorTemplate: '<li></li>'
        });

        // Form submission
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Validate with Parsley
            if (!parsleyForm.isValid()) {
                return;
            }

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';

            try {
                // Get form data
                const formData = new FormData(contactForm);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });

                // Get reCAPTCHA token if configured
                if (typeof grecaptcha !== 'undefined' && RECAPTCHA_SITE_KEY && RECAPTCHA_SITE_KEY !== 'YOUR_RECAPTCHA_SITE_KEY') {
                    try {
                        const recaptchaToken = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
                        formObject.recaptcha_token = recaptchaToken;
                    } catch (recaptchaError) {
                        console.log('reCAPTCHA no disponible, continuando sin él:', recaptchaError);
                        formObject.recaptcha_token = 'not_configured';
                    }
                } else {
                    formObject.recaptcha_token = 'not_configured';
                }

                // Track form start
                dataLayerPush('form_submit_attempt', {
                    form_type: 'contact_form',
                    sucursal: formObject.sucursal,
                    cuando: formObject.cuando
                });

                // Show loading message
                Swal.fire({
                    title: 'Enviando...',
                    text: 'Espera un momento mientras procesamos tu solicitud',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                // Send to Google Apps Script
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formObject)
                });

                // Show success message with SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: '¡Solicitud Enviada!',
                    html: `
                        <p>Gracias <strong>${formObject.nombre}</strong> por tu interés en Clínica Dental Yany.</p>
                        <p>Te contactaremos a la brevedad al teléfono <strong>${formObject.telefono}</strong>.</p>
                        <p>También hemos enviado una confirmación a tu email.</p>
                    `,
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#00aeef',
                    timer: 10000,
                    timerProgressBar: true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });

                // Track successful submission
                dataLayerPush('form_submit_success', {
                    form_type: 'contact_form',
                    sucursal: formObject.sucursal,
                    cuando: formObject.cuando
                });

                // Reset form
                contactForm.reset();
                parsleyForm.reset();

            } catch (error) {
                console.error('Error:', error);

                // Show error message
                Swal.fire({
                    icon: 'error',
                    title: 'Error al enviar',
                    text: 'Hubo un problema al enviar tu solicitud. Por favor intenta nuevamente o contáctanos directamente por WhatsApp o teléfono.',
                    confirmButtonText: 'Intentar de nuevo',
                    confirmButtonColor: '#00aeef',
                    showCancelButton: true,
                    cancelButtonText: 'Contactar por WhatsApp',
                    cancelButtonColor: '#25D366'
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.cancel) {
                        window.open('https://wa.me/56998923371', '_blank');
                    }
                });

                // Track error
                dataLayerPush('form_submit_error', {
                    form_type: 'contact_form',
                    error_message: error.message
                });

            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ENVIAR SOLICITUD';
            }
        });
    }

    /* ======================================
       TRACK CONTACT BUTTONS (WHATSAPP & PHONE)
       ====================================== */

    const contactButtons = document.querySelectorAll('[data-contact]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function () {
            const contactType = this.getAttribute('data-contact');
            dataLayerPush('contact_click', {
                contact_type: contactType,
                location: this.closest('section')?.id || 'unknown'
            });
        });
    });

    /* ======================================
       SCROLL DEPTH TRACKING
       ====================================== */

    const scrollDepths = [25, 50, 75, 100];
    const triggeredDepths = new Set();

    window.addEventListener('scroll', function () {
        const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !triggeredDepths.has(depth)) {
                triggeredDepths.add(depth);
                dataLayerPush('scroll_depth', {
                    depth_percentage: depth
                });
            }
        });
    });

    /* ======================================
       TIME ON PAGE TRACKING
       ====================================== */

    const timeThresholds = [30, 60, 120, 300]; // seconds
    const triggeredTimes = new Set();

    timeThresholds.forEach(threshold => {
        setTimeout(() => {
            if (!triggeredTimes.has(threshold)) {
                triggeredTimes.add(threshold);
                dataLayerPush('time_on_page', {
                    seconds: threshold
                });
            }
        }, threshold * 1000);
    });

    /* ======================================
       GOOGLE MAPS INITIALIZATION
       ====================================== */

    window.initMap = function () {
        // Coordenadas de las 3 sucursales
        const locations = [
            {
                name: 'Providencia',
                address: 'Luis Thayer Ojeda 086',
                metro: 'Metro Pedro de Valdivia',
                position: { lat: -33.4256, lng: -70.6110 }
            },
            {
                name: 'Santiago Centro',
                address: 'Estado 10, Local 205',
                metro: 'Metro Plaza de Armas',
                position: { lat: -33.4372, lng: -70.6506 }
            },
            {
                name: 'Vitacura',
                address: 'Luis Pasteur 5719, Local 202',
                metro: 'Metro Manquehue',
                position: { lat: -33.3950, lng: -70.5764 }
            }
        ];

        // Centro del mapa (promedio de las 3 ubicaciones)
        const centerPosition = { lat: -33.4193, lng: -70.6127 };

        // Crear mapa
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: centerPosition,
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        });

        // Crear marcadores
        const infoWindow = new google.maps.InfoWindow();

        locations.forEach((location, index) => {
            const marker = new google.maps.Marker({
                position: location.position,
                map: map,
                title: location.name,
                animation: google.maps.Animation.DROP,
                icon: {
                    url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png'
                }
            });

            // Info window content
            const contentString = `
                <div style="font-family: 'Open Sans', sans-serif; padding: 10px;">
                    <h3 style="color: #4A3B7A; margin: 0 0 10px 0; font-family: 'Montserrat', sans-serif;">${location.name}</h3>
                    <p style="margin: 5px 0; color: #374151;"><strong>Dirección:</strong> ${location.address}</p>
                    <p style="margin: 5px 0; color: #374151;"><strong>Metro:</strong> ${location.metro}</p>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${location.position.lat},${location.position.lng}"
                       target="_blank"
                       style="display: inline-block; margin-top: 10px; padding: 8px 16px; background: #3D5A99; color: white; text-decoration: none; border-radius: 5px; font-weight: 600;">
                        Cómo llegar
                    </a>
                </div>
            `;

            marker.addListener('click', () => {
                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);

                // Track map marker click
                dataLayerPush('map_marker_click', {
                    location: location.name
                });
            });
        });

        // Track map interaction
        map.addListener('dragend', () => {
            dataLayerPush('map_interaction', {
                action: 'drag'
            });
        });

        map.addListener('zoom_changed', () => {
            dataLayerPush('map_interaction', {
                action: 'zoom',
                zoom_level: map.getZoom()
            });
        });
    };

    /* ======================================
       RELLAX.JS (PARALLAX EFFECT)
       ====================================== */

    // Initialize Rellax on elements with data-rellax-speed attribute
    if (typeof Rellax !== 'undefined') {
        const rellax = new Rellax('.rellax', {
            speed: -2,
            center: false,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false
        });
    }

    /* ======================================
       TIPPY.JS (TOOLTIPS)
       ====================================== */

    // Initialize tooltips on elements with data-tippy-content attribute
    if (typeof tippy !== 'undefined') {
        tippy('[data-tippy-content]', {
            theme: 'custom',
            placement: 'top',
            animation: 'scale',
            duration: [200, 150]
        });
    }

    /* ======================================
       INTERSECTION OBSERVER FOR ANIMATIONS
       ====================================== */

    const animatedElements = document.querySelectorAll('.card, .treatment-card, .testimonial-card, .result-card');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    animatedElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    /* ======================================
       HERO SCROLL INDICATOR
       ====================================== */

    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function () {
            const firstSection = document.querySelector('.why-now');
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    /* ======================================
       PERFORMANCE MONITORING
       ====================================== */

    // Log performance metrics
    window.addEventListener('load', function () {
        setTimeout(function () {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;

            console.log('Performance Metrics:');
            console.log('Page Load Time:', pageLoadTime + 'ms');
            console.log('Connect Time:', connectTime + 'ms');
            console.log('Render Time:', renderTime + 'ms');

            // Track to Analytics
            dataLayerPush('page_performance', {
                page_load_time: pageLoadTime,
                connect_time: connectTime,
                render_time: renderTime
            });
        }, 0);
    });

    /* ======================================
       LAZY LOADING IMAGES (LAZYSIZES)
       ====================================== */

    // LazySizes is automatically initialized via the library
    // Add custom event listeners if needed
    document.addEventListener('lazyloaded', function (e) {
        console.log('Image loaded:', e.target.src);
    });

    /* ======================================
       ERROR HANDLING
       ====================================== */

    window.addEventListener('error', function (e) {
        console.error('Global error:', e.message);

        // Track errors
        dataLayerPush('javascript_error', {
            error_message: e.message,
            error_file: e.filename,
            error_line: e.lineno
        });
    });

    /* ======================================
       PAGE VISIBILITY API (TRACK ENGAGEMENT)
       ====================================== */

    let visibilityStartTime = Date.now();

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            const timeSpent = Date.now() - visibilityStartTime;
            dataLayerPush('page_visibility_change', {
                status: 'hidden',
                time_visible: Math.round(timeSpent / 1000)
            });
        } else {
            visibilityStartTime = Date.now();
            dataLayerPush('page_visibility_change', {
                status: 'visible'
            });
        }
    });

    /* ======================================
       HELPER FUNCTIONS
       ====================================== */

    // DataLayer push helper
    function dataLayerPush(eventName, eventParams = {}) {
        if (typeof window.dataLayer !== 'undefined') {
            window.dataLayer.push({
                event: eventName,
                ...eventParams,
                timestamp: new Date().toISOString()
            });
            console.log('DataLayer event:', eventName, eventParams);
        }
    }

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /* ======================================
       CONSOLE MESSAGE
       ====================================== */

    console.log('%c🦷 Clínica Dental Yany - Landing Ortodoncia', 'font-size: 20px; font-weight: bold; color: #4A3B7A;');
    console.log('%c40 años recuperando sonrisas', 'font-size: 14px; color: #3D5A99;');
    console.log('%cDesarrollado con ❤️ usando Vanilla JS', 'font-size: 12px; color: #10B981;');

    /* ======================================
       INITIALIZE COMPLETE
       ====================================== */

    // Track page view
    dataLayerPush('page_view', {
        page_title: document.title,
        page_url: window.location.href,
        referrer: document.referrer
    });

    /* ======================================
       PARTICLES.JS (EFECTO SPARKLES)
       ====================================== */
    if (typeof particlesJS !== 'undefined') {
        particlesJS('sparkles-container', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.8,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.3,
                        sync: false
                    }
                },
                size: {
                    value: 2,
                    random: true
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    resize: true
                }
            },
            retina_detect: true
        });
        console.log('✅ Particles effect initialized');
    }

    console.log('✅ All scripts initialized successfully');

}); // End DOMContentLoaded

/* ======================================
   GDPR / COOKIE CONSENT (OPTIONAL)
   ====================================== */

/*
// Uncomment if you want to implement cookie consent
window.addEventListener('load', function() {
    window.cookieconsent.initialise({
        palette: {
            popup: {
                background: '#4A3B7A'
            },
            button: {
                background: '#3D5A99'
            }
        },
        theme: 'classic',
        position: 'bottom',
        content: {
            message: 'Este sitio utiliza cookies para mejorar tu experiencia de navegación.',
            dismiss: 'Entendido',
            link: 'Más información',
            href: '/politica-de-privacidad'
        }
    });
});
*/

/* ======================================
   SERVICE WORKER (OPTIONAL - PWA)
   ====================================== */

/*
// Uncomment to register a service worker for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful:', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed:', err);
        });
    });
}
*/
