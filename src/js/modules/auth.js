import utils from '../common/utils.js';

class Auth {
    constructor() {
        // 构造函数中不进行初始化
    }

    init() {
        console.log('Initializing Auth module...');
        // 初始化元素
        this.userActions = document.querySelector('.user-actions');
        this.loginModal = document.getElementById('loginModal');
        this.registerModal = document.getElementById('registerModal');
        this.loginForm = document.querySelector('.login-form');
        this.registerForm = document.querySelector('.register-form');
        this.closeButtons = document.querySelectorAll('.modal-close');

        // 创建用户操作区域
        this.createUserActions();

        // 绑定事件
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeModal(this.loginModal);
                this.closeModal(this.registerModal);
            });
        });
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        if (this.registerForm) {
            this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // 检查登录状态
        this.checkLoginStatus();
    }

    createUserActions() {
        // 清空用户操作区域
        this.userActions.innerHTML = `
            <div class="user-actions-content">
                <div class="user-buttons">
                    <div class="user-buttons-guest">
                        <a href="#" class="text-link" id="loginBtn">登录</a>
                        <span class="text-divider">/</span>
                        <a href="#" class="text-link" id="registerBtn">注册</a>
                    </div>
                    <div class="user-buttons-logged" style="display: none;">
                        <a href="#" class="text-link" id="logoutBtn">退出</a>
                    </div>
                </div>
            </div>
        `;

        // 重新获取元素
        this.userButtonsGuest = this.userActions.querySelector('.user-buttons-guest');
        this.userButtonsLogged = this.userActions.querySelector('.user-buttons-logged');
        this.loginBtn = this.userActions.querySelector('#loginBtn');
        this.registerBtn = this.userActions.querySelector('#registerBtn');
        this.logoutBtn = this.userActions.querySelector('#logoutBtn');

        // 绑定事件
        if (this.loginBtn) {
            this.loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal(this.loginModal);
            });
        }
        if (this.registerBtn) {
            this.registerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal(this.registerModal);
            });
        }
        if (this.logoutBtn) {
            this.logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
    }

    openModal(modal) {
        console.log('Opening modal:', modal);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const formData = utils.getFormData(this.loginForm);
        const validation = utils.validateForm(formData);

        if (!validation.isValid) {
            utils.setFormErrors(this.loginForm, validation.errors);
            return;
        }

        try {
            // TODO: 实现实际的登录 API 调用
            // 模拟登录成功
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // 保存用户信息到本地存储
            const userData = {
                id: 1,
                username: '测试用户',
                email: formData.email,
                avatar: 'https://picsum.photos/40/40?random=1'
            };
            localStorage.setItem('user', JSON.stringify(userData));
            
            // 更新 UI
            this.updateUI(userData);
            
            // 关闭模态框
            this.closeModal(this.loginModal);
            
            // 显示成功提示
            utils.showToast('登录成功', 'success');
        } catch (error) {
            utils.showToast('登录失败，请重试', 'error');
            console.error('Login error:', error);
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const formData = utils.getFormData(this.registerForm);
        const validation = utils.validateForm(formData);

        if (!validation.isValid) {
            utils.setFormErrors(this.registerForm, validation.errors);
            return;
        }

        try {
            // TODO: 实现实际的注册 API 调用
            // 模拟注册成功
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // 保存用户信息到本地存储
            const userData = {
                id: 1,
                username: formData.username,
                email: formData.email,
                avatar: 'https://picsum.photos/40/40?random=1'
            };
            localStorage.setItem('user', JSON.stringify(userData));
            
            // 更新 UI
            this.updateUI(userData);
            
            // 关闭模态框
            this.closeModal(this.registerModal);
            
            // 显示成功提示
            utils.showToast('注册成功', 'success');
        } catch (error) {
            utils.showToast('注册失败，请重试', 'error');
            console.error('Register error:', error);
        }
    }

    handleLogout() {
        // 清除本地存储的用户信息
        localStorage.removeItem('user');
        
        // 更新 UI
        this.updateUI(null);
        
        // 显示提示
        utils.showToast('已退出登录', 'info');
    }

    checkLoginStatus() {
        const userData = JSON.parse(localStorage.getItem('user'));
        this.updateUI(userData);
    }

    updateUI(userData) {
        if (userData) {
            // 已登录状态
            this.userButtonsGuest.style.display = 'none';
            this.userButtonsLogged.style.display = 'block';
            this.userAvatar.src = userData.avatar;
        } else {
            // 未登录状态
            this.userButtonsGuest.style.display = 'flex';
            this.userButtonsLogged.style.display = 'none';
            this.userAvatar.src = 'https://picsum.photos/40/40?random=1';
        }
    }
}

// 导出 Auth 类的实例
export default new Auth(); 