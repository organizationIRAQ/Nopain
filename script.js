// تنشيط القائمة المتنقلة
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// نموذج التطوع
document.getElementById('volunteerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // جمع البيانات من النموذج
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        country: document.getElementById('country').value,
        hours: document.getElementById('hours').value,
        message: document.getElementById('message').value,
        volunteerTypes: Array.from(document.querySelectorAll('input[name="volunteer-type"]:checked'))
            .map(cb => cb.value)
    };
    
    // هنا يمكنك إرسال البيانات لخادمك
    console.log('بيانات المتطوع:', formData);
    
    // عرض رسالة نجاح
    alert('شكراً لك! تم استلام طلب التطوع بنجاح. سنتواصل معك خلال 48 ساعة.');
    
    // إعادة تعيين النموذج
    this.reset();
});

// تأثير التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// تأثير التمرير لشريط التنقل
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// العد التنازلي المتحرك
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// تفعيل العدادات عند التمرير
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.number');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent.replace('+', ''));
                if (!isNaN(target)) {
                    animateCounter(stat, target, 2000);
                }
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// مراقبة قسم الإحصائيات
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    observer.observe(statsSection);
}

// تفعيل خيارات التبرع
document.querySelectorAll('.donation-option').forEach(option => {
    option.addEventListener('click', function() {
        // إزالة التفعيل من جميع الخيارات
        document.querySelectorAll('.donation-option').forEach(opt => {
            opt.style.backgroundColor = 'rgba(255,255,255,0.2)';
        });
        
        // تفعيل الخيار المحدد
        this.style.backgroundColor = 'var(--secondary-color)';
        
        // هنا يمكنك تحديث قيمة التبرع في النموذج
        const amount = this.textContent.replace('ريال', '').trim();
        console.log('المبلغ المختار:', amount);
    });
});