document.addEventListener("DOMContentLoaded", function () {
    // 投稿データのサンプル (JSON形式)
    const posts = [
    {
        "id": 1,
        "title": "3Dキャラクターモデリング",
        "subtitle": "進捗報告",
        "date": "2024-09-12",
        "content": "キャラクターモデリングの進捗報告です。",
        "category": "モデリング",
        "tags": ["キャラクター", "3D"]
    },
    {
        "id": 2,
        "title": "ゲームエンジン選定",
        "subtitle": "選定候補",
        "date": "2024-09-10",
        "content": "使用するゲームエンジンの候補について説明します。",
        "category": "エンジン",
        "tags": ["ゲーム", "エンジン"]
    },
    {
        "id": 3,
        "title": "新しいアニメーション機能",
        "subtitle": "機能追加",
        "date": "2024-09-08",
        "content": "最新のアニメーション機能を実装しました。",
        "category": "アニメーション",
        "tags": ["アニメーション", "機能追加"]
    },
    {
        "id": 4,
        "title": "3Dデータ保存アルゴリズム",
        "subtitle": "保存アルゴリズム",
        "date": "2024-09-05",
        "content": "新しい3Dデータ保存アルゴリズムについて説明します。",
        "category": "アルゴリズム",
        "tags": ["データ", "アルゴリズム"]
    },
    {
        "id": 5,
        "title": "OpenGL vs LWJGL",
        "subtitle": "グラフィックライブラリ比較",
        "date": "2024-09-03",
        "content": "OpenGLとLWJGLの違いについて比較します。",
        "category": "比較",
        "tags": ["OpenGL", "LWJGL"]
    },
    {
        "id": 6,
        "title": "C++ / RUST / JAVA",
        "subtitle": "言語比較",
        "date": "2024-09-01",
        "content": "C++、RUST、JAVAの比較を行います。",
        "category": "比較",
        "tags": ["C++", "RUST", "JAVA"]
    },
    {
        "id": 7,
        "title": "VR技術の最新トレンド",
        "subtitle": "VRの未来",
        "date": "2024-08-30",
        "content": "最新のVR技術とその未来について考察します。",
        "category": "VR",
        "tags": ["VR", "技術", "トレンド"]
    },
    {
        "id": 8,
        "title": "ゲームアートの進化",
        "subtitle": "アートの変遷",
        "date": "2024-08-25",
        "content": "ゲームアートの歴史とその進化について解説します。",
        "category": "アート",
        "tags": ["ゲームアート", "進化"]
    },
    {
        "id": 9,
        "title": "AIとゲームデザイン",
        "subtitle": "AIの役割",
        "date": "2024-08-20",
        "content": "AIがゲームデザインにどのように影響を与えているかを探ります。",
        "category": "AI",
        "tags": ["AI", "ゲームデザイン"]
    },
    {
        "id": 10,
        "title": "物理エンジンの基礎",
        "subtitle": "物理シミュレーション",
        "date": "2024-08-15",
        "content": "物理エンジンの基本的な概念と使用方法について説明します。",
        "category": "エンジン",
        "tags": ["物理エンジン", "シミュレーション"]
    },
    {
        "id": 11,
        "title": "マルチプレイヤーゲームの設計",
        "subtitle": "ネットワーク設計",
        "date": "2024-08-10",
        "content": "マルチプレイヤーゲームを設計する際のネットワーク要件について解説します。",
        "category": "ネットワーク",
        "tags": ["マルチプレイヤー", "ネットワーク"]
    },
    {
        "id": 12,
        "title": "ゲーム内経済システム",
        "subtitle": "経済モデル",
        "date": "2024-08-05",
        "content": "ゲーム内での経済システムの設計とその影響について説明します。",
        "category": "経済",
        "tags": ["経済", "システム"]
    },
    {
        "id": 13,
        "title": "キャラクターAIの実装",
        "subtitle": "AIの技術",
        "date": "2024-08-01",
        "content": "キャラクターAIを実装する際の技術とアプローチについて解説します。",
        "category": "AI",
        "tags": ["キャラクターAI", "実装"]
    },
    {
        "id": 14,
        "title": "リーダブルコードの書き方",
        "subtitle": "コード品質",
        "date": "2024-07-28",
        "content": "リーダブルなコードを書くためのベストプラクティスについて説明します。",
        "category": "プログラミング",
        "tags": ["リーダブルコード", "品質"]
    },
    {
        "id": 15,
        "title": "3Dアニメーションの基礎",
        "subtitle": "アニメーション技術",
        "date": "2024-07-25",
        "content": "3Dアニメーションの基本的な技術と方法について解説します。",
        "category": "アニメーション",
        "tags": ["3Dアニメーション", "技術"]
    }
]


    const postList = document.getElementById("post-list");
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    const tagFilter = document.getElementById("tag-filter");
    const sortSelect = document.getElementById("sort-select");
    const backButton = document.getElementById("back-button");

    if (!postList || !searchInput || !categoryFilter || !tagFilter || !sortSelect || !backButton) {
        console.error("必要な要素がHTMLに存在しません。");
        return;
    }

    // タグフィルタのオプションを動的に生成
    function populateTagFilter() {
        const uniqueTags = new Set();
        posts.forEach(post => {
            post.tags.forEach(tag => uniqueTags.add(tag));
        });

        tagFilter.innerHTML = '<option value="">タグを選択</option>'; // 初期オプション
        uniqueTags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            tagFilter.appendChild(option);
        });
    }

    function renderPosts(postsToRender) {
        postList.innerHTML = '';
        postsToRender.forEach(post => {
            const postItem = document.createElement("div");
            postItem.classList.add("post-item");
            postItem.innerHTML = `
                <h3>${highlightText(post.title)}</h3>
                <p>${highlightText(post.subtitle)}</p>
                <p>${post.date}</p>
                <p>タグ: ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(', ')}</p>
            `;
            postItem.addEventListener("click", function () {
                showPostDetail(post);
            });
            postList.appendChild(postItem);
        });
    }

    function showPostDetail(post) {
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById("post-title").textContent = post.title;
        document.getElementById("post-subtitle").textContent = post.subtitle;
        document.getElementById("post-date").textContent = post.date;
        document.getElementById("post-content").textContent = post.content;
        document.getElementById("post-detail").classList.add('active');
        window.location.hash = '#post-detail';
    }

    function filterPosts() {
        const query = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const tag = tagFilter.value;
        let filteredPosts = posts.filter(post =>
            (query === '' || post.title.toLowerCase().includes(query) || post.subtitle.toLowerCase().includes(query) || post.content.toLowerCase().includes(query)) &&
            (category === '' || post.category === category) &&
            (tag === '' || post.tags.includes(tag))
        );

        switch (sortSelect.value) {
            case 'date-asc':
                filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'date-desc':
                filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'title-asc':
                filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                filteredPosts.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }

        renderPosts(filteredPosts);
    }

    function highlightText(text) {
        const query = searchInput.value.toLowerCase();
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    function showTabFromHash() {
        const hash = window.location.hash || '#home';
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        const activeTab = document.querySelector(hash);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }

    function handleBackButtonClick() {
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById("home").classList.add('active');
        window.location.hash = '#home';
    }

    searchInput.addEventListener("input", filterPosts);
    categoryFilter.addEventListener("change", filterPosts);
    tagFilter.addEventListener("change", filterPosts);
    sortSelect.addEventListener("change", filterPosts);
    backButton.addEventListener("click", handleBackButtonClick);

    populateTagFilter(); // タグフィルタのオプションを生成
    showTabFromHash();
    window.addEventListener('hashchange', showTabFromHash);

    // 初期表示
    renderPosts(posts);
});
