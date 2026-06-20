document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle hamburger icon if needed
        });
    }

    // 2. Smooth Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // 3. Before/After Slider (Startup Level)
    const initSlider = () => {
        const slider = document.querySelector('.comparison-slider');
        const handle = document.querySelector('.slider-handle');
        const overlay = document.querySelector('.image-overlay');

        if (slider && handle && overlay) {
            let active = false;

            const move = (e) => {
                if (!active) return;
                let x = (e.pageX || e.touches[0].pageX) - slider.getBoundingClientRect().left;
                let width = slider.offsetWidth;
                let percent = (x / width) * 100;
                percent = Math.max(0, Math.min(100, percent));
                
                handle.style.left = `${percent}%`;
                overlay.style.width = `${percent}%`;
            };

            handle.addEventListener('mousedown', () => active = true);
            window.addEventListener('mouseup', () => active = false);
            window.addEventListener('mousemove', move);
            
            handle.addEventListener('touchstart', () => active = true);
            window.addEventListener('touchend', () => active = false);
            window.addEventListener('touchmove', move);
        }
    };

    initSlider();

    // 4. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
});

// Utility: Format Bytes for UI
const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
