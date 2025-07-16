document.addEventListener('DOMContentLoaded', function() {
  /*****************************
   * CURSOR PERSONALIZADO BONITO *
   *****************************/
  // Cursor personalizado con color morado fijo
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  let mouseX = 0, mouseY = 0;
  let posX = 0, posY = 0;

  // Aplica color morado fijo
  function setCursorColor() {
    const accent = '#8780E2'; // Color morado
    cursor.style.background = accent;
    cursorFollower.style.borderColor = accent;
  }
  setCursorColor();

  // Seguir el movimiento del mouse con suavidad
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Cursor principal (punto) - movimiento instantáneo
    cursor.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
  });

  // Animación más rápida para el cursor follower
  function updateCursorPosition() {
    posX += (mouseX - posX) / 5; // Ajustado para mayor suavidad
    posY += (mouseY - posY) / 5;

    cursorFollower.style.transform = `translate3d(calc(${posX}px - 50%), calc(${posY}px - 50%), 0)`;

    requestAnimationFrame(updateCursorPosition);
  }
  updateCursorPosition();

  // Efectos hover en elementos interactivos
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-hover]');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      cursorFollower.classList.add('active');
      
      // Efecto especial para botones
      if (el.tagName === 'BUTTON' || el.classList.contains('cta-button')) {
        cursorFollower.style.transform += ' scale(1.5)';
        cursorFollower.style.opacity = '0.5';
      }
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      cursorFollower.classList.remove('active');
      
      // Resetear efectos especiales
      if (el.tagName === 'BUTTON' || el.classList.contains('cta-button')) {
        cursorFollower.style.transform = `translate3d(calc(${posX}px - 50%), calc(${posY}px - 50%), 0)`;
        cursorFollower.style.opacity = '1';
      }
    });
  });

  /*****************************
   * PARTÍCULAS NO INTERACTIVAS *
   *****************************/
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 70,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#8780E2" // Color morado para las partículas
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          }
        },
        "opacity": {
          "value": 0.3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#B4B8F3", // Color lila claro para las conexiones
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1.5,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false, // Deshabilitado interacción con hover
            "mode": "grab"
          },
          "onclick": {
            "enable": false, // Deshabilitado interacción con click
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }

  /**************************
   * RESTANTE DEL CÓDIGO JS *
   **************************/
  // Header scroll effect
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Cerrar menú móvil si está abierto
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Animación de contadores
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target + '+';
      }
    });
  }
  
  // Activar contadores cuando la sección es visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    observer.observe(heroSection);
  }
  
  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Formulario de contacto
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = ['name', 'email', 'message'];
      
      // Validación de campos requeridos
      requiredFields.forEach(field => {
        const input = document.getElementById(field);
        const error = input.nextElementSibling;
        
        if (!input.value.trim()) {
          error.textContent = 'Este campo es obligatorio';
          error.style.display = 'block';
          input.style.borderColor = '#e74c3c';
          isValid = false;
        } else if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          error.textContent = 'Ingresa un correo válido';
          error.style.display = 'block';
          input.style.borderColor = '#e74c3c';
          isValid = false;
        } else {
          error.style.display = 'none';
          input.style.borderColor = '#ddd';
        }
      });
      
      if (isValid) {
        // Simular envío del formulario
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular retraso de red
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado';
          
          // Resetear formulario después de 2 segundos
          setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Mostrar notificación de éxito
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
          }, 2000);
        }, 1500);
      }
    });
  }
  
  // Animaciones GSAP
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero text animation al cargar
    gsap.from(".hero-title", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    });
    
    gsap.from(".hero-subtitle", {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out"
    });
    
    gsap.from(".hero-buttons button", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 1,
      ease: "power2.out"
    });
    
    gsap.from(".hero-image", {
      x: 100,
      opacity: 0,
      duration: 1,
      delay: 1.2,
      ease: "expo.out"
    });
    
    // Contadores animados cuando entren en pantalla
    gsap.utils.toArray(".stat-number").forEach((el) => {
      const endValue = parseInt(el.getAttribute("data-count"));
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(el, 
            { innerText: 0 }, 
            {
              innerText: endValue,
              duration: 2,
              snap: "innerText",
              ease: "power1.out",
              onUpdate: () => el.innerText = Math.round(el.innerText)
            }
          );
        }
      });
    });
    
    // Animación del título
    gsap.from(".section-title", {
      scrollTrigger: {
        trigger: ".section-title",
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
    
    // Animación de cada "about-feature" en secuencia
    gsap.utils.toArray(".about-feature").forEach((feature, i) => {
      gsap.from(feature, {
        scrollTrigger: {
          trigger: feature,
          start: "top 90%",
        },
        x: -40,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: "power2.out"
      });
    });
    
    // Animación de imagen y badge
    gsap.from(".about-image", {
      scrollTrigger: {
        trigger: ".about-image",
        start: "top 90%",
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
    
    gsap.from(".experience-badge", {
      scrollTrigger: {
        trigger: ".experience-badge",
        start: "top 90%",
      },
      scale: 0.5,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "back.out(1.7)"
    });
    
    // Animación del título de la sección de servicios
    gsap.from(".services-title", {
      scrollTrigger: {
        trigger: ".services .section-title",
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
    
    // Animación de las tarjetas una por una
    gsap.utils.toArray(".service-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out"
      });
    });
    
    // Título de sección: fade + subida
    gsap.from(".values .section-title .values-section-title", {
      scrollTrigger: {
        trigger: ".values .section-title",
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
    
    // Tarjetas de valores: animación secuencial
    gsap.utils.toArray(".value-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.15,
        ease: "power2.out"
      });
    });
    
    // Misión/Vision cards: fade + subida
    gsap.from(".mission-card .values-section-title", {
      scrollTrigger: {
        trigger: ".mission-card",
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
    
    gsap.from(".vision-card", {
      scrollTrigger: {
        trigger: ".vision-card",
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power2.out"
    });
    
    // Animación de entrada para las tarjetas de testimonio
    gsap.utils.toArray(".testimonial-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        delay: index * 0.15,
        ease: "power2.out"
      });
    });
    
    // Animación entrada desde la izquierda para la info de contacto
    gsap.from(".contact-info", {
      scrollTrigger: {
        trigger: ".contact-info",
        start: "top 80%",
      },
      x: -60,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
    
    // Animación entrada desde la derecha para el formulario
    gsap.from(".contact-form-container", {
      scrollTrigger: {
        trigger: ".contact-form-container",
        start: "top 80%",
      },
      x: 60,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
    
    // Animaciones CTA
    gsap.from(".cta-title", {
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
    
    gsap.from(".cta-subtitle", {
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      delay: 0.2,
      duration: 1,
      ease: "power2.out"
    });
    
    gsap.from(".cta-buttons", {
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      delay: 0.4,
      duration: 1,
      ease: "power2.out"
    });
    
    // Animaciones Footer
    gsap.utils.toArray('.footer-content > div').forEach((section, i) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: "power2.out"
      });
    });
    
    gsap.from('.footer-bottom', {
      scrollTrigger: {
        trigger: '.footer-bottom',
        start: 'top 90%'
      },
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.8,
      ease: "power2.out"
    });
  }
});