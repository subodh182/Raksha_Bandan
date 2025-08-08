// Raksha Bandhan 2025 - JavaScript Functions
// Professional Dynamic 3D Animation Script

class RakshaBandhanApp {
    constructor() {
        this.currentWish = 0;
        this.isPlaying = false;
        this.particles = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createParticles();
        this.startParticleAnimation();
        this.initAOS();
        this.setupMusicControl();
        this.setupSmoothScrolling();
        this.createLoadingScreen();
        this.autoChangeWishes();
    }

    // Create loading screen
    createLoadingScreen() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-rakhi"></div>
        `;
        document.body.appendChild(loadingOverlay);

        // Remove loading screen after 2 seconds
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 1000);
        }, 2000);
    }

    // Setup event listeners
    setupEventListeners() {
        // Navigation scroll effect
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Hamburger menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Navigation links
        document.querySelectorAll('a[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-section');
                this.scrollToSection(targetId);
            });
        });

        // Resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    // Handle scroll events
    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }

    // Smooth scrolling to sections
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Setup smooth scrolling for anchor links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Create floating particles
    createParticles() {
        const particleContainer = document.getElementById('particles-container');
        const particleEmojis = ['🌸', '🌺', '🌼', '🪔', '💖', '✨', '🎊', '🎉'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createParticle(particleContainer, particleEmojis);
            }, i * 1000);
        }
    }

    createParticle(container, emojis) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random starting position
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }

    // Start continuous particle animation
    startParticleAnimation() {
        const particleContainer = document.getElementById('particles-container');
        const particleEmojis = ['🌸', '🌺', '🌼', '🪔', '💖', '✨', '🎊', '🎉'];
        
        setInterval(() => {
            this.createParticle(particleContainer, particleEmojis);
        }, 2000);
    }

    // Initialize AOS (Animate On Scroll)
    initAOS() {
        // Simple AOS implementation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    // Setup music control
    setupMusicControl() {
        const musicToggle = document.getElementById('music-toggle');
        const backgroundMusic = document.getElementById('background-music');
        
        if (musicToggle && backgroundMusic) {
            musicToggle.addEventListener('click', () => {
                if (this.isPlaying) {
                    backgroundMusic.pause();
                    musicToggle.classList.remove('playing');
                    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                } else {
                    backgroundMusic.play().catch(e => {
                        console.log('Audio play prevented by browser policy');
                        this.showNotification('Click to enable music', 'info');
                    });
                    musicToggle.classList.add('playing');
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                }
                this.isPlaying = !this.isPlaying;
            });
        }
    }

    // Show notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-gold);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: var(--shadow-medium);
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Auto change wishes
    autoChangeWishes() {
        setInterval(() => {
            this.currentWish = (this.currentWish + 1) % 3;
            this.showWish(this.currentWish);
        }, 5000);
    }

    // Handle window resize
    handleResize() {
        // Recreate particles on resize for better responsive behavior
        const particleContainer = document.getElementById('particles-container');
        if (particleContainer) {
            particleContainer.innerHTML = '';
            this.createParticles();
        }
    }
}

// Global functions for HTML interactions

// Start celebration with special effects
function startCelebration() {
    document.body.classList.add('celebration-active');
    createFireworks();
    
    // Play celebration sound if available
    const audio = document.getElementById('background-music');
    if (audio && !app.isPlaying) {
        audio.play().catch(e => console.log('Audio play prevented'));
    }
    
    // Show celebration message
    app.showNotification('🎉 रक्षा बंधन की शुभकामनाएं! 🎉', 'success');
    
    // Remove celebration class after animation
    setTimeout(() => {
        document.body.classList.remove('celebration-active');
    }, 2000);
}

// Create firework effects
function createFireworks() {
    const colors = ['#FFD700', '#FF6B35', '#DC143C', '#FF69B4', '#9370DB'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'celebration-firework';
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            document.body.appendChild(firework);
            
            setTimeout(() => firework.remove(), 2000);
        }, i * 100);
    }
}

// Show specific wish
function showWish(index) {
    const wishCards = document.querySelectorAll('.wish-card');
    const navDots = document.querySelectorAll('.nav-dot');
    
    // Hide all wish cards
    wishCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all dots
    navDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show selected wish and activate corresponding dot
    if (wishCards[index]) {
        wishCards[index].classList.add('active');
    }
    
    if (navDots[index]) {
        navDots[index].classList.add('active');
    }
    
    app.currentWish = index;
}

// Share wish functionality
function shareWish() {
    const currentWishCard = document.querySelector('.wish-card.active');
    if (currentWishCard) {
        const wishText = currentWishCard.querySelector('p').textContent;
        
        if (navigator.share) {
            navigator.share({
                title: 'रक्षा बंधन की शुभकामनाएं',
                text: wishText,
                url: window.location.href
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback for browsers that don't support Web Share API
            if (navigator.clipboard) {
                navigator.clipboard.writeText(`${wishText}\n\n${window.location.href}`)
                    .then(() => {
                        app.showNotification('शुभकामना कॉपी हो गई!', 'success');
                    })
                    .catch(err => {
                        console.log('Copy failed:', err);
                        app.showNotification('कॉपी नहीं हो सकी', 'error');
                    });
            } else {
                // Final fallback
                const tempInput = document.createElement('textarea');
                tempInput.value = `${wishText}\n\n${window.location.href}`;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                app.showNotification('शुभकामना कॉपी हो गई!', 'success');
            }
        }
    }
}

// Social media sharing
function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('रक्षा बंधन की हार्दिक शुभकामनाएं! भाई-बहन के प्रेम का पावन त्योहार मनाएं।');
    
    let shareUrl;
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
        case 'instagram':
            // Instagram doesn't support direct sharing, so copy to clipboard
            navigator.clipboard.writeText(`${decodeURIComponent(text)}\n\n${window.location.href}`)
                .then(() => {
                    app.showNotification('Instagram के लिए टेक्स्ट कॉपी हो गया!', 'success');
                });
            return;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            if (app.currentWish > 0) {
                showWish(app.currentWish - 1);
            }
            break;
        case 'ArrowRight':
            if (app.currentWish < 2) {
                showWish(app.currentWish + 1);
            }
            break;
        case ' ':
            e.preventDefault();
            startCelebration();
            break;
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next wish
            if (app.currentWish < 2) {
                showWish(app.currentWish + 1);
            }
        } else {
            // Swipe right - previous wish
            if (app.currentWish > 0) {
                showWish(app.currentWish - 1);
            }
        }
    }
}

// Dynamic background color change based on time
function updateBackgroundBasedOnTime() {
    const hour = new Date().getHours();
    const body = document.body;
    
    if (hour >= 6 && hour < 12) {
        // Morning - Golden hour
        body.style.background = 'linear-gradient(45deg, #FFE4B5, #FFDAB9, #FFE4E1)';
    } else if (hour >= 12 && hour < 18) {
        // Afternoon - Bright
        body.style.background = 'linear-gradient(45deg, #FFF5EE, #FFFACD, #F0E68C)';
    } else if (hour >= 18 && hour < 21) {
        // Evening - Sunset
        body.style.background = 'linear-gradient(45deg, #FFB347, #FF7F50, #FF6347)';
    } else {
        // Night - Gentle
        body.style.background = 'linear-gradient(45deg, #483D8B, #4B0082, #663399)';
    }
}

// Add CSS for notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Easter egg - Konami code
let konamiCode = [];
const konami = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konami.join(',')) {
        // Special celebration mode
        document.body.style.animation = 'rainbow 2s linear infinite';
        createSpecialFireworks();
        app.showNotification('🌈 विशेष उत्सव मोड सक्रिय! 🌈', 'success');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
        
        konamiCode = [];
    }
});

// Special fireworks for easter egg
function createSpecialFireworks() {
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'celebration-firework';
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';
            firework.style.background = colors[i % colors.length];
            firework.style.animationDuration = '3s';
            
            document.body.appendChild(firework);
            
            setTimeout(() => firework.remove(), 3000);
        }, i * 50);
    }
}

// Add rainbow animation for easter egg
const rainbowStyles = document.createElement('style');
rainbowStyles.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyles);

// Performance optimization - Lazy loading for images and animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Start animations when elements come into view
            if (element.classList.contains('rakhi-3d')) {
                element.style.animationPlayState = 'running';
            }
            
            // Unobserve once activated
            lazyObserver.unobserve(element);
        }
    });
}, observerOptions);

// Initialize the app when DOM is loaded
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new RakshaBandhanApp();
    
    // Update background based on time
    updateBackgroundBasedOnTime();
    
    // Update background every hour
    setInterval(updateBackgroundBasedOnTime, 3600000);
    
    // Setup lazy loading
    document.querySelectorAll('.rakhi-3d, .rakhi-design').forEach(el => {
        el.style.animationPlayState = 'paused';
        lazyObserver.observe(el);
    });
    
    // Initialize first wish
    showWish(0);
    
    console.log('🎉 Raksha Bandhan 2025 - Professional Dynamic Web Experience Loaded! 🎉');
    console.log('Features: 3D Animations, Particle Effects, Music Control, Touch Support, Keyboard Navigation');
    console.log('Try: Arrow keys for navigation, Spacebar for celebration, Konami code for surprise!');
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RakshaBandhanApp,
        startCelebration,
        showWish,
        shareWish,
        shareOnSocial
    };
}