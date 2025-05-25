import Auth from './modules/auth.js';

// 初始化移动端菜单
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            menuToggle.classList.toggle('active');
        });
    }
}

// 初始化所有功能
function init() {
    console.log('Initializing main.js...');
    initMobileMenu();
    // 初始化 Auth 模块
    Auth.init();
}

// 当 DOM 加载完成时初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
} 