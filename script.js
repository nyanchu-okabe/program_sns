document.addEventListener("DOMContentLoaded", function () {
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

    let posts = [];

    async function fetchPosts() {
        try {
            const response = await fetch('./posts.json');
            posts = await response.json();
            // 初期表示
            renderPosts(posts);
            populateTagFilter(posts);
        } catch (error) {
            console.error("データの取得に失敗しました:", error);
        }
    }

    function populateTagFilter(posts) {
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
        document.getElementById("post-subtitle").textContent = post.subtitle || '';
        document.getElementById("post-date").textContent = post.date || '';
        document.getElementById("post-content").textContent = post.content;
        document.getElementById("post-detail").classList.add('active');
    }

    function highlightText(text) {
        const searchTerm = searchInput.value.toLowerCase();
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    function applyFilters() {
        let filteredPosts = posts;

        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedTag = tagFilter.value;

        if (searchTerm) {
            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.subtitle.toLowerCase().includes(searchTerm) ||
                post.content.toLowerCase().includes(searchTerm)
            );
        }

        if (selectedCategory) {
            filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
        }

        if (selectedTag) {
            filteredPosts = filteredPosts.filter(post => post.tags.includes(selectedTag));
        }

        renderPosts(filteredPosts);
    }

    function sortPosts(posts, sortBy) {
        return posts.sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.date) - new Date(a.date);
            } else if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            }
        });
    }

    searchInput.addEventListener("input", applyFilters);
    categoryFilter.addEventListener("change", applyFilters);
    tagFilter.addEventListener("change", applyFilters);
    sortSelect.addEventListener("change", function () {
        const sortedPosts = sortPosts(posts, sortSelect.value);
        renderPosts(sortedPosts);
    });
    backButton.addEventListener("click", function () {
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById("home").classList.add('active');
    });

    // 最初のデータの取得
    fetchPosts();
});
