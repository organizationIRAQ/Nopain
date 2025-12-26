// ملف JavaScript الرئيسي
document.addEventListener('DOMContentLoaded', function() {
    console.log('موقع "بدون ألم" جاهز! 🐾');
    
    // 1. شريط التنقل المتنقل
    initNavbar();
    
    // 2. التمرير السلس
    initSmoothScroll();
    
    // 3. تحديث الروابط النشطة
    updateActiveLinks();
    
    // 4. إعداد النماذج العامة
    setupForms();
});

// شريط التنقل المتنقل
function initNavbar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // إغلاق القائمة عند النقر على رابط
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// التمرير السلس
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight || 70;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// تحديث الروابط النشطة
function updateActiveLinks() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!navLinks.length) return;
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkPath = link.getAttribute('href');
        const linkUrl = new URL(linkPath, window.location.origin);
        const currentUrl = new URL(currentPath, window.location.origin);
        
        if (linkUrl.pathname === currentUrl.pathname) {
            link.classList.add('active');
        }
        
        // الصفحة الرئيسية
        if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
            const homeLinks = document.querySelectorAll('.nav-links a[href="index.html"], .nav-links a[href="/"], .nav-links a[href="./index.html"]');
            homeLinks.forEach(homeLink => {
                homeLink.classList.add('active');
            });
        }
    });
}

// إعداد النماذج العامة
function setupForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // التحقق في الوقت الحقيقي
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
        });
        
        // منع الإرسال إذا كان هناك أخطاء
        form.addEventListener('submit', function(e) {
            const errors = form.querySelectorAll('.error');
            if (errors.length > 0) {
                e.preventDefault();
                alert('الرجاء تصحيح الأخطاء في النموذج قبل الإرسال.');
            }
        });
    });
}

// التحقق من حقل
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // مسح الأخطاء السابقة
    clearFieldError(field);
    
    // التحقق إذا كان الحقل مطلوباً
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'هذا الحقل مطلوب');
        isValid = false;
    }
    
    // التحقق من نوع الحقل
    if (value) {
        switch (field.type) {
            case 'email':
                if (!isValidEmail(value)) {
                    showFieldError(field, 'البريد الإلكتروني غير صالح');
                    isValid = false;
                }
                break;
                
            case 'tel':
                if (!isValidPhone(value)) {
                    showFieldError(field, 'رقم الهاتف غير صالح');
                    isValid = false;
                }
                break;
        }
        
        // التحقق من الطول
        if (field.minLength && value.length < field.minLength) {
            showFieldError(field, `الحد الأدنى للحروف هو ${field.minLength}`);
            isValid = false;
        }
        
        if (field.maxLength && value.length > field.maxLength) {
            showFieldError(field, `الحد الأقصى للحروف هو ${field.maxLength}`);
            isValid = false;
        }
    }
    
    return isValid;
}

// إظهار خطأ في الحقل
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#f44336';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    
    field.parentNode.appendChild(errorDiv);
}

// مسح خطأ الحقل
function clearFieldError(field) {
    field.classList.remove('error');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// التحقق من البريد الإلكتروني
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// التحقق من رقم الهاتف
function isValidPhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    return re.test(phone);
}

// تأثير التمرير لشريط التنقل
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// العدادات المتحركة
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // تشغيل عند ظهور العنصر
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// تهيئة العدادات إذا وجدت
if (document.querySelector('.counter')) {
    initCounters();
}