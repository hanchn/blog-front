// 工具函数集合
const utils = {
    // 显示 Toast 消息
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        if (!toast) {
            const toastEl = document.createElement('div');
            toastEl.id = 'toast';
            toastEl.className = 'toast';
            document.body.appendChild(toastEl);
        }
        const toastElement = document.getElementById('toast');
        toastElement.textContent = message;
        toastElement.className = `toast toast-${type} show`;
        
        setTimeout(() => {
            toastElement.className = 'toast';
        }, 3000);
    },

    // 表单验证
    validateForm(formData) {
        const errors = {};
        
        // 邮箱验证
        if (formData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                errors.email = '请输入有效的邮箱地址';
            }
        }
        
        // 密码验证
        if (formData.password) {
            if (formData.password.length < 6) {
                errors.password = '密码长度至少为6位';
            }
        }
        
        // 确认密码验证
        if (formData.confirmPassword && formData.password) {
            if (formData.confirmPassword !== formData.password) {
                errors.confirmPassword = '两次输入的密码不一致';
            }
        }
        
        // 用户名验证
        if (formData.username) {
            if (formData.username.length < 3) {
                errors.username = '用户名长度至少为3位';
            }
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },

    // 获取表单数据
    getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }
        
        return data;
    },

    // 设置表单错误
    setFormErrors(form, errors) {
        // 清除所有错误提示
        form.querySelectorAll('.error-message').forEach(el => el.remove());
        form.querySelectorAll('.form-input.error').forEach(el => {
            el.classList.remove('error');
        });
        
        // 设置新的错误提示
        Object.entries(errors).forEach(([field, message]) => {
            const input = form.querySelector(`[name="${field}"]`);
            if (input) {
                input.classList.add('error');
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = message;
                input.parentNode.appendChild(errorDiv);
            }
        });
    }
};

export default utils; 