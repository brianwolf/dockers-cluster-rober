let redirections = "";
const postsContainer = document.querySelector(".posts-container");
const searchDisplay = document.querySelector(".search-display");

fetch(
  "./data.json"
).then(async (response) => {
  redirections = await response.json();
  redirections.map((post) => createPost(post));
});

const createPost = (postData) => {
  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `
      <a class="post-preview" href="${postData.link}" target="_blank">
        <img class="post-image" src="${postData.image}">
      </a>
      <div class="post-content">
        <p class="post-title">${postData.title}</p>
        <p class="post-description">${postData.description}</p>
        <div class="post-tags">
          ${postData.categories
      .map((category) => {
        return '<span class="post-tag">' + category + "</span>";
      })
      .join("")}
        </div>
      </div>
  `;

  postsContainer.append(post);
};

const handleSearchPosts = (query) => {
  const searchQuery = query.trim().toLowerCase();

  if (searchQuery.length <= 1) {
    resetPosts()
    return
  }

  let searchResults = [...redirections].filter(
    (post) =>
      post.categories.some((category) => category.toLowerCase().includes(searchQuery)) ||
      post.title.toLowerCase().includes(searchQuery)
  );

  if (searchResults.length == 0) {
    searchDisplay.innerHTML = "No results found"
  }

  postsContainer.innerHTML = "";
  searchResults.map((post) => createPost(post));
};

const resetPosts = () => {
  searchDisplay.innerHTML = ""
  postsContainer.innerHTML = "";
  redirections.map((post) => createPost(post));
};

const search = document.getElementById("search");

let debounceTimer;
const debounce = (callback, time) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};

search.addEventListener(
  "input",
  (event) => {
    const query = event.target.value;
    debounce(() => handleSearchPosts(query), 500);
  },
  false
);