// 内容分类切换
function initCategoryTabs() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // 移除其他分类的激活状态
            categoryItems.forEach(i => i.classList.remove('active'));
            // 添加当前分类的激活状态
            item.classList.add('active');
            
            // 加载对应分类的内容
            loadContent(item.querySelector('span').textContent.trim());
        });
    });
}

// 加载内容
async function loadContent(category) {
    const articleList = document.querySelector('.article-list');
    articleList.innerHTML = '<div class="loading">加载中...</div>';
    
    try {
        // TODO: 根据分类从服务器获取数据
        // 这里使用模拟数据
        const articles = await mockFetchArticles(category);
        
        // 渲染文章列表
        articleList.innerHTML = articles.map(article => `
            <article class="article-card">
                <div class="article-header">
                    <div class="author-info">
                        <img src="${article.author.avatar}" alt="作者头像" class="author-avatar">
                        <div class="author-meta">
                            <h3 class="author-name">${article.author.name}</h3>
                            <span class="post-time">${article.postTime}</span>
                        </div>
                    </div>
                    <div class="article-actions">
                        <button class="action-btn"><i class="far fa-heart"></i> ${article.likes}</button>
                        <button class="action-btn"><i class="far fa-comment"></i> ${article.comments}</button>
                        <button class="action-btn"><i class="far fa-bookmark"></i></button>
                    </div>
                </div>
                <div class="article-content">
                    <h2 class="article-title">${article.title}</h2>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-cover">
                        <img src="${article.cover}" alt="文章封面" class="cover-image">
                    </div>
                    <div class="article-tags">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        `).join('');
        
        // 添加文章卡片动画
        animateArticleCards();
    } catch (error) {
        articleList.innerHTML = '<div class="error">加载失败，请重试</div>';
        console.error('Failed to load articles:', error);
    }
}

// 模拟获取文章数据
async function mockFetchArticles(category) {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
        {
            author: {
                name: '王五',
                avatar: 'https://picsum.photos/40/40?random=4'
            },
            postTime: '2小时前',
            title: '深入理解 JavaScript 异步编程',
            excerpt: '在当今的 Web 开发中，异步编程已经成为了不可或缺的一部分。本文将深入探讨 JavaScript 中的异步编程模式，帮助你更好地理解和应用这些概念...',
            cover: 'https://picsum.photos/800/400?random=5',
            tags: ['JavaScript', '异步编程', 'Promise'],
            likes: 128,
            comments: 32
        },
        {
            author: {
                name: '赵六',
                avatar: 'https://picsum.photos/40/40?random=6'
            },
            postTime: '4小时前',
            title: 'React Hooks 最佳实践指南',
            excerpt: 'React Hooks 的引入改变了我们编写 React 组件的方式。本文将分享一些实用的 Hooks 最佳实践，帮助你写出更清晰、更易维护的代码...',
            cover: 'https://picsum.photos/800/400?random=7',
            tags: ['React', 'Hooks', '前端开发'],
            likes: 96,
            comments: 24
        }
    ];
}

// 文章卡片动画
function animateArticleCards() {
    const cards = document.querySelectorAll('.article-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 搜索功能
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    // 防抖函数
    const debounce = (fn, delay) => {
        let timer = null;
        return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    };
    
    // 搜索处理函数
    const handleSearch = debounce((value) => {
        if (!value.trim()) return;
        
        // TODO: 实现搜索功能
        console.log('Searching for:', value);
    }, 300);
    
    // 监听输入
    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });
    
    // 监听搜索按钮点击
    searchBtn.addEventListener('click', () => {
        handleSearch(searchInput.value);
    });
    
    // 监听回车键
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchInput.value);
        }
    });
}

// 加载更多功能
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more .btn');
    let page = 1;
    
    loadMoreBtn.addEventListener('click', async () => {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = '加载中...';
        
        try {
            // TODO: 加载更多文章
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // 模拟加载完成
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = '加载更多';
            
            // 如果已经是最后一页
            if (page >= 3) {
                loadMoreBtn.textContent = '没有更多了';
                loadMoreBtn.disabled = true;
            }
            
            page++;
        } catch (error) {
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = '加载失败，请重试';
            console.error('Failed to load more articles:', error);
        }
    });
}

// 初始化所有功能
function init() {
    console.log('Initializing home page...');
    initCategoryTabs();
    initSearch();
    initLoadMore();
    
    // 初始加载推荐内容
    loadContent('推荐');
}

// 当 DOM 加载完成时初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
} 