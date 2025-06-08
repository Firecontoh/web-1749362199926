document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = document.querySelector('.main-header').offsetHeight; // Get header height
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 20; // Add some extra padding

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                burgerMenu.classList.remove('active');
            }
        });
    });

    // Mobile navigation toggle
    const burgerMenu = document.getElementById('burgerMenu');
    const mainNav = document.getElementById('mainNav');

    if (burgerMenu && mainNav) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }

    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('[data-animation]');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Percentage of target element visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation;
                const delay = element.dataset.delay ? parseInt(element.dataset.delay) : 0;

                // Set initial state before adding transition class
                element.style.opacity = 0;
                element.style.transform = getInitialTransform(animationType);
                element.style.transition = `opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms, transform 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`;

                // Trigger animation after a slight timeout to ensure initial state is applied
                setTimeout(() => {
                    element.classList.add('is-visible');
                    // Remove the observer once the animation is played
                    observer.unobserve(element);
                }, 50); // Small delay
            }
        });
    };

    const getInitialTransform = (animationType) => {
        switch (animationType) {
            case 'fade-in-up':
                return 'translateY(50px)';
            case 'fade-in-left':
                return 'translateX(-50px)';
            case 'fade-in-right':
                return 'translateX(50px)';
            case 'zoom-in':
            case 'zoom-in-delay':
                return 'scale(0.8)';
            default:
                return 'translateY(0)'; // Default to no transform if unknown
        }
    };


    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero background (optional, can be CSS-only if fixed background)
    // If using JS for parallax, uncomment and adjust hero-section::before background to not be fixed.
    // window.addEventListener('scroll', () => {
    //     const hero = document.querySelector('.hero-section');
    //     if (hero) {
    //         const scrollPosition = window.pageYOffset;
    //         hero.style.backgroundPositionY = -scrollPosition * 0.3 + 'px'; // Adjust 0.3 for speed
    //     }
    // });
});