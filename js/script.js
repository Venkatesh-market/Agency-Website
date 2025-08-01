// Navigation Menu Toggle
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.querySelector('i').classList.toggle('fa-bars');
    navToggle.querySelector('i').classList.toggle('fa-times');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.querySelector('i').classList.add('fa-bars');
        navToggle.querySelector('i').classList.remove('fa-times');
    }
});

// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    setTimeout(typeWriter, 1000);
}

// Intersection Observer for Animations
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.2
});

// Observe elements with animation classes
document.querySelectorAll('.service__card, .stat__card, .why-us__text').forEach(element => {
    observer.observe(element);
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat__number');
let statsAnimated = false;

function animateStats() {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50; // Adjust speed here

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                stat.textContent = target;
            }
        };

        updateCounter();
    });
}

// Trigger stats animation on scroll
const statsSection = document.querySelector('.stats__grid');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
            animateStats();
            statsAnimated = true;
        }
    });

    statsObserver.observe(statsSection);
}

// Particle Animation
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize Particle System
const particlesCanvas = document.createElement('canvas');
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    particlesContainer.appendChild(particlesCanvas);
    const ctx = particlesCanvas.getContext('2d');
    let particles = [];

    function initParticles() {
        particlesCanvas.width = particlesContainer.offsetWidth;
        particlesCanvas.height = particlesContainer.offsetHeight;

        for (let i = 0; i < 50; i++) {
            const x = Math.random() * particlesCanvas.width;
            const y = Math.random() * particlesCanvas.height;
            particles.push(new Particle(x, y));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(ctx);

            if (particles[i].size <= 0.2) {
                particles.splice(i, 1);
                i--;

                // Add new particle
                const x = Math.random() * particlesCanvas.width;
                const y = Math.random() * particlesCanvas.height;
                particles.push(new Particle(x, y));
            }
        }

        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Resize handler
    window.addEventListener('resize', () => {
        particlesCanvas.width = particlesContainer.offsetWidth;
        particlesCanvas.height = particlesContainer.offsetHeight;
    });
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (isValid) {
            // Add success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('form__success');
            successMessage.textContent = 'Message sent successfully!';
            contactForm.appendChild(successMessage);

            // Reset form
            contactForm.reset();

            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });
}