document.addEventListener('DOMContentLoaded', function() {
    window.copyCode = function(button) {
        const codeBlock = button.closest('.code-block').querySelector('code');
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            button.innerHTML = '<i class="bx bx-check"></i>';
            setTimeout(() => {
                button.innerHTML = '<i class="bx bx-copy"></i>';
            }, 2000);
        });
    };
    document.querySelectorAll('.sidebar-section a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    const sections = document.querySelectorAll('.doc-section');
    const sidebarLinks = document.querySelectorAll('.sidebar-section a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 100) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        sidebarLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === current ? 
                'var(--primary)' : 'var(--text-secondary)';
        });
    });
});
