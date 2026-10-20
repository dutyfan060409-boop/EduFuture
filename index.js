
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const searchBtn = document.getElementById('search-btn');
    const searchBox = document.getElementById('search-box');
    const searchInput = searchBox.querySelector('.search-input');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdown = document.querySelector('.dropdown');

    // 1. Эффект уменьшения навбара при скролле
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Открытие / закрытие мобильного меню (Бургер)
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 3. Раскрытие строки поиска
    searchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // Закрытие поиска при клике вне его
    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target)) {
            searchBox.classList.remove('active');
        }
    });

    // 4. Переключение Темной / Светлой темы с сохранением в localStorage
    const savedTheme = localStorage.getItem('edu-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');

        if (isDark) {
            themeIcon.classList.replace('bx-moon', 'bx-sun');
            localStorage.setItem('edu-theme', 'dark');
        } else {
            themeIcon.classList.replace('bx-sun', 'bx-moon');
            localStorage.setItem('edu-theme', 'light');
        }
    });

    // 5. Переключение активного состояния ссылок
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Если это кнопка выпадающего меню на мобильном — не закрываем меню
            if (this.classList.contains('dropdown-toggle') && window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle('open');
                return;
            }

            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            // Закрываем мобильное меню при клике на ссылку
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});