// 文章列表页面的交互功能
document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const searchInput = document.querySelector('.search-input input');
    const categoryFilter = document.querySelector('.filter-select select');
    const articlesGrid = document.querySelector('.articles-grid');
    const articles = Array.from(document.querySelectorAll('.article-card'));

    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 搜索功能
    const handleSearch = debounce((searchTerm) => {
        const normalizedSearchTerm = searchTerm.toLowerCase().trim();
        
        articles.forEach(article => {
            const title = article.querySelector('.article-title').textContent.toLowerCase();
            const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
            const tags = Array.from(article.querySelectorAll('.tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            const isVisible = title.includes(normalizedSearchTerm) ||
                            excerpt.includes(normalizedSearchTerm) ||
                            tags.some(tag => tag.includes(normalizedSearchTerm));
            
            article.style.display = isVisible ? 'flex' : 'none';
        });
    }, 300);

    // 分类筛选功能
    const handleCategoryFilter = (category) => {
        articles.forEach(article => {
            if (!category) {
                article.style.display = 'flex';
                return;
            }

            const tags = Array.from(article.querySelectorAll('.tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            const isVisible = tags.some(tag => tag.includes(category.toLowerCase()));
            article.style.display = isVisible ? 'flex' : 'none';
        });
    };

    // 添加事件监听器
    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    categoryFilter.addEventListener('change', (e) => {
        handleCategoryFilter(e.target.value);
    });

    // 添加动画效果
    articles.forEach((article, index) => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            article.style.transition = 'all 0.5s ease';
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // 添加标签点击事件
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const tagText = e.target.textContent;
            categoryFilter.value = tagText.toLowerCase();
            handleCategoryFilter(tagText);
        });
    });

    // 添加分页交互
    const paginationItems = document.querySelectorAll('.page-item');
    paginationItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有active类
            paginationItems.forEach(i => i.classList.remove('active'));
            
            // 添加active类到当前点击的项
            item.classList.add('active');
            
            // 这里可以添加实际的页面切换逻辑
            // 例如：加载新的文章数据
        });
    });
}); 