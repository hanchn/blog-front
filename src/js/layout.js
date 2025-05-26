// 加载布局组件
async function loadLayout() {
    try {
        // 加载header
        const headerResponse = await fetch('/src/layouts/header.html');
        const headerHtml = await headerResponse.text();
        document.body.insertAdjacentHTML('afterbegin', headerHtml);

        // 加载footer
        const footerResponse = await fetch('/src/layouts/footer.html');
        const footerHtml = await footerResponse.text();
        document.body.insertAdjacentHTML('beforeend', footerHtml);

        // 设置当前页面的导航激活状态
        setActiveNavLink();
        
        // 初始化移动端菜单
        initMobileMenu();
    } catch (error) {
        console.error('Error loading layout:', error);
    }
}

// 设置当前页面的导航激活状态
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.header-nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath || 
            (currentPath === '/' && linkPath === '/') ||
            (currentPath.includes(linkPath) && linkPath !== '/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 初始化移动端菜单
function initMobileMenu() {
    const menuButton = document.querySelector('.header-menu-button');
    const mobileMenu = document.querySelector('.header-mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuButton.classList.toggle('active');
        });

        // 点击移动端菜单链接时关闭菜单
        const mobileNavLinks = mobileMenu.querySelectorAll('.header-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuButton.classList.remove('active');
            });
        });
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadLayout); 