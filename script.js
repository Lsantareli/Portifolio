// Navigation functionality - now for smooth scrolling
const navLinks = document.querySelectorAll('.nav-link');

// Add click event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove active class from all links
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });
        
        // Add active class to clicked link
        link.classList.add('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// CTA button functionality - now scrolls smoothly
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        // Let the default anchor behavior handle smooth scrolling
        // Remove active from all nav links and add to projects link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#projects') {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click animation to contact icons
    const contactIcons = document.querySelectorAll('.contact-icon');
    contactIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.style.transform = 'scale(0.95)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Remove parallax effect that was dependent on gradient background
// document.addEventListener('mousemove', (e) => {
//     const mouseX = e.clientX / window.innerWidth;
//     const mouseY = e.clientY / window.innerHeight;
//     
//     // Subtle parallax effect on background
//     document.body.style.backgroundPosition = `${mouseX * 20}px ${mouseY * 20}px`;
// });

// Keyboard navigation - now scrolls to sections
document.addEventListener('keydown', (e) => {
    const sections = ['home', 'projects', 'contact'];
    const currentActive = document.querySelector('.nav-link.active');
    const currentHref = currentActive ? currentActive.getAttribute('href').substring(1) : 'home';
    const currentIndex = sections.indexOf(currentHref);
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const nextIndex = (currentIndex + 1) % sections.length;
        const nextSection = document.getElementById(sections[nextIndex]);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
        const prevSection = document.getElementById(sections[prevIndex]);
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});