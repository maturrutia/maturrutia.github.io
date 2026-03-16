// Main JavaScript File
(function() {
  'use strict';

  // ===========================
  // Particle Network Animation
  // ===========================
  class ParticleNetwork {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.mouse = { x: null, y: null, radius: 150 };
      this.animationId = null;
      
      this.init();
    }

    init() {
      this.resize();
      this.createParticles();
      this.animate();
      
      window.addEventListener('resize', () => this.resize());
      this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
      this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());
    }

    resize() {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
      this.particles = [];
      this.createParticles();
    }

    createParticles() {
      const numberOfParticles = Math.floor((this.canvas.width * this.canvas.height) / 15000);
      
      for (let i = 0; i < numberOfParticles; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        });
      }
    }

    handleMouseMove(e) {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    }

    handleMouseLeave() {
      this.mouse.x = null;
      this.mouse.y = null;
    }

    drawParticles() {
      const theme = document.documentElement.getAttribute('data-theme');
      const color = theme === 'light' ? 'rgba(30, 41, 59, 0.6)' : 'rgba(226, 232, 240, 0.6)';
      
      this.particles.forEach(particle => {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
      });
    }

    drawConnections() {
      const theme = document.documentElement.getAttribute('data-theme');
      const maxDistance = 120;
      
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.5;
            const color = theme === 'light' 
              ? `rgba(30, 41, 59, ${opacity})` 
              : `rgba(226, 232, 240, ${opacity})`;
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 0.5;
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.stroke();
          }
        }
        
        // Connect to mouse
        if (this.mouse.x !== null) {
          const dx = this.particles[i].x - this.mouse.x;
          const dy = this.particles[i].y - this.mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.mouse.radius) {
            const opacity = (1 - distance / this.mouse.radius) * 0.8;
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.mouse.x, this.mouse.y);
            this.ctx.stroke();
          }
        }
      }
    }

    updateParticles() {
      this.particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
        
        // Mouse interaction
        if (this.mouse.x !== null) {
          const dx = this.mouse.x - particle.x;
          const dy = this.mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.mouse.radius) {
            const force = (this.mouse.radius - distance) / this.mouse.radius;
            particle.vx += (dx / distance) * force * 0.1;
            particle.vy += (dy / distance) * force * 0.1;
          }
        }
        
        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;
      });
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawConnections();
      this.drawParticles();
      this.updateParticles();
      
      this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      window.removeEventListener('resize', this.resize);
    }
  }

  // ===========================
  // Theme Toggle
  // ===========================
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ===========================
  // Mobile Navigation
  // ===========================
  function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
      });
    }
    
    if (navClose) {
      navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    }
    
    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }

  // ===========================
  // Smooth Scroll & Active Section
  // ===========================
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          
          if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  function initActiveSection() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
      const scrollPos = window.scrollY + 100;
      
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
  }

  // ===========================
  // Header Scroll Effect
  // ===========================
  function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ===========================
  // Scroll Reveal Animations
  // ===========================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .timeline-item, .skill-category, .stat-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
      el.classList.add('reveal', 'reveal-fade-up');
      revealObserver.observe(el);
    });
  }

  // ===========================
  // Copy Email to Clipboard
  // ===========================
  function initCopyEmail() {
    const copyButton = document.getElementById('copy-email');
    
    if (copyButton) {
      copyButton.addEventListener('click', async () => {
        const email = copyButton.getAttribute('data-email');
        const feedback = copyButton.querySelector('.copy-feedback');
        
        try {
          await navigator.clipboard.writeText(email);
          copyButton.classList.add('copied');
          feedback.textContent = 'Copied!';
          
          setTimeout(() => {
            copyButton.classList.remove('copied');
            feedback.textContent = 'Click to copy';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
          feedback.textContent = 'Failed to copy';
          setTimeout(() => {
            feedback.textContent = 'Click to copy';
          }, 2000);
        }
      });
    }
  }

  // ===========================
  // Initialize Everything
  // ===========================
  function init() {
    // Initialize particle network
    const canvas = document.getElementById('hero-canvas');
    if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      new ParticleNetwork(canvas);
    }
    
    // Initialize all features
    initThemeToggle();
    initMobileNav();
    initSmoothScroll();
    initActiveSection();
    initHeaderScroll();
    initScrollReveal();
    initCopyEmail();
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
