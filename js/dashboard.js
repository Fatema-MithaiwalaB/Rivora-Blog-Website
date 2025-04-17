const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
  window.location.href = "login.html";
} else {
  const avatarSpan = document.querySelector(".username-avatar");
  const usernameSpan = document.querySelector(".username-text");

  avatarSpan.textContent = loggedInUser.username.charAt(0).toUpperCase();
  usernameSpan.textContent = loggedInUser.username;
}

// Logout button functionality
document.querySelector(".logout-btn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
const container = document.getElementById("blogContainer");

// Render blogs and comments
// Render blogs and comments
blogs.forEach((blog) => {
  const article = document.createElement("article");
  article.className = "news-card";

  const commentCount = blog.comments.length;
  const showBadge = commentCount > 0;

  let commentsHTML = "";
  blog.comments.forEach((comment, index) => {
    const isAuthor = comment.username === loggedInUser.username;
    commentsHTML += `
      <div class="comment-box ${index > 0 ? "hidden" : ""}">
        <div class="comment-header">
          <div class="avatar-comment">
            <span class="avatar">${comment.username.charAt(0)}</span>
            <span class="comment-user">${comment.username}</span>
          </div>
          ${isAuthor
            ? `<div class="edit-delete-group">
                <button class="edit-btn" data-blog="${blog.id}" data-comment="${index}">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" data-blog="${blog.id}" data-comment="${index}">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>`
            : ""}
        </div>
        <p class="comment-text">${comment.content}</p>
      </div>`;
  });

  // Build the entire article HTML with a scrollable comment list
  article.innerHTML = `
    <img src="assets/${blog.image}" alt="${blog.title}" class="news-image">
    <div class="news-content">
      <p class="news-date">APR, 2025</p>
      <h2 class="news-title">${blog.title}</h2>
      <button class="discover-btn">Discover ↷</button>
      <p class="news-desc">${blog.content}</p>

      <form class="comment-form" data-id="${blog.id}">
        <input type="text" placeholder="Add a comment..." required>
        <button type="submit">Post</button>
      </form>

      <div class="comment-section">
        ${showBadge ? `<span class="comment-badge">${commentCount} comment${commentCount > 1 ? "s" : ""}</span>` : ""}
        
        <div class="comment-list">
          ${commentsHTML}
        </div>

        ${
          commentCount > 1
            ? `<div class="read-more-container">
                <button class="read-more-btn" data-id="${blog.id}">Read More Comments</button>
              </div>`
            : ""
        }
      </div>
    </div>
  `;

  container.appendChild(article);
});


// Event Delegation for Read More, Edit, and Delete
document.addEventListener("click", (e) => {
  const readMoreBtn = e.target.closest(".read-more-btn");
  if (readMoreBtn) {
    const section = readMoreBtn.closest(".comment-section");
    const hiddenComments = section.querySelectorAll(".comment-box.hidden");

    if (readMoreBtn.textContent === "Read More Comments") {
      hiddenComments.forEach((c) => c.classList.remove("hidden"));
      readMoreBtn.textContent = "Hide Comments";
    } else {
      section.querySelectorAll(".comment-box").forEach((c, i) => {
        if (i > 0) c.classList.add("hidden");
      });
      readMoreBtn.textContent = "Read More Comments";
    }
  }

  const editBtn = e.target.closest(".edit-btn");
  if (editBtn) {
    const blogId = +editBtn.dataset.blog;
    const commentIndex = +editBtn.dataset.comment;

    const blogIndex = blogs.findIndex((b) => b.id === blogId);
    const commentBox = editBtn.closest(".comment-box");
    const commentTextP = commentBox.querySelector(".comment-text");

    const originalText = commentTextP.textContent;

    const textarea = document.createElement("textarea");
    textarea.value = originalText;
    textarea.rows = 3;
    textarea.style.width = "100%";
    textarea.classList.add("edit-textarea");

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "save-edit-btn";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "cancel-edit-btn";

    commentTextP.replaceWith(textarea);
    const editGroup = commentBox.querySelector(".edit-delete-group");
    editGroup.appendChild(saveBtn);
    editGroup.appendChild(cancelBtn);

    saveBtn.addEventListener("click", () => {
      const newText = textarea.value.trim();
      if (newText) {
        blogs[blogIndex].comments[commentIndex].content = newText;
        localStorage.setItem("blogs", JSON.stringify(blogs));
        location.reload();
      }
    });

    cancelBtn.addEventListener("click", () => {
      textarea.replaceWith(commentTextP);
      saveBtn.remove();
      cancelBtn.remove();
    });
  }

  const deleteBtn = e.target.closest(".delete-btn");
  if (deleteBtn) {
    const blogId = +deleteBtn.dataset.blog;
    const commentIndex = +deleteBtn.dataset.comment;
    if (confirm("Are you sure you want to delete this comment?")) {
      const blogIndex = blogs.findIndex((b) => b.id === blogId);
      blogs[blogIndex].comments.splice(commentIndex, 1);
      localStorage.setItem("blogs", JSON.stringify(blogs));
      location.reload();
    }
  }
});

// Handle new comment submission
document.addEventListener("submit", (e) => {
  if (e.target.classList.contains("comment-form")) {
    e.preventDefault();

    const blogId = +e.target.dataset.id;
    const input = e.target.querySelector("input");
    const commentText = input.value.trim();
    if (!commentText) return;

    const blogIndex = blogs.findIndex((b) => b.id === blogId);
    blogs[blogIndex].comments.push({
      username: loggedInUser.username,
      content: commentText,
    });

    localStorage.setItem("blogs", JSON.stringify(blogs));
    location.reload();
  }
});
