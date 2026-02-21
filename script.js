// Projects data
const projects = [
  {
    title: 'Smart Cleaning Robot',
    description: 'AI-powered autonomous cleaning robot with computer vision navigation and ROS integration.',
    category: 'AI + Embedded Systems'
  },
  {
    title: 'Embedded Systems Experiments',
    description: '50+ hands-on projects exploring ESP32, STM32, sensors, wireless protocols, and edge computing.',
    category: 'Embedded Systems'
  },
  {
    title: 'Engineering Content Platform',
    description: 'Full-stack platform for sharing engineering projects, tutorials, and product development resources.',
    category: 'Full-Stack Development'
  }
];

// DOM elements
const projectsGrid = document.getElementById('projects-grid');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Initialize projects
function initProjects() {
  projects.forEach((project, index) => {
    const projectCard = document.createElement('article');
    projectCard.className = 'project-card glass-card animate-fade-in-up';
    projectCard.style.animationDelay = `${index * 0.1 + 0.2}s`;
    projectCard.setAttribute('role', 'listitem');
    projectCard.innerHTML = `
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-category">
          <span>${project.category}</span>
          <span>→ View Project</span>
        </div>
      </div>
    `;
    projectsGrid.appendChild(projectCard);
  });
}

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !expanded);
  navMenu.classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Close mobile menu
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

// Observe animated elements
document.addEventListener('DOMContentLoaded', () => {
  initProjects();
  
  document.querySelectorAll('.animate-fade-in-up').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
  });
});
