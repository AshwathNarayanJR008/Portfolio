document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (hamburger && sidebar) {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';

        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            if (sidebar.classList.contains('open')) {
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Close sidebar when clicking a link on mobile
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    sidebar.classList.remove('open');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }

    // Scroll reveal animation using Intersection Observer
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible if you only want it to animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Typing Effect for Hero Title ---
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const textToType = "Hi, I'm Ashwath Narayan JR";
        typingElement.innerHTML = ''; // clear initial text
        let i = 0;

        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');

        function typeWriter() {
            if (i <= textToType.length) {
                let currentText = textToType.substring(0, i);
                let htmlText = currentText;

                // Wrap the name in span for styling if we reached that part
                if (i > 8) {
                    htmlText = currentText.substring(0, 8) + "<span>" + currentText.substring(8) + "</span>";
                }

                typingElement.innerHTML = htmlText;
                typingElement.appendChild(cursor);
                i++;

                // Random typing speed for realism
                setTimeout(typeWriter, 50 + Math.random() * 80);
            }
        }
        setTimeout(typeWriter, 800); // Wait bit before starting
    }

    // --- Neural Network Particle Background ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 242, 254, 0.5)';
                ctx.fill();
            }
        }

        const particleCount = window.innerWidth < 768 ? 30 : 80;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(79, 172, 254, ${0.4 - distance / 300})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }
});
