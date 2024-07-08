const API_URL = "http://localhost:3000/api";

document.getElementById("blogForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const blog = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    content: document.getElementById("content").value,
  };
  try {
    const response = await axios.post(`${API_URL}/blogs`, blog);
    alert("Blog post created successfully!");
    document.getElementById("blogForm").reset();
    fetchBlogs();
  } catch (error) {
    alert("Failed to create blog post: " + error.response.data.error);
  }
});

async function fetchBlogs() {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    const blogs = response.data;
    const blogList = document.getElementById("blogList");
    blogList.innerHTML = "";
    blogs.forEach((blog) => {
      const blogElement = document.createElement("div");
      blogElement.className = "blog-item";
      blogElement.innerHTML = `
        <h3>${blog.title}</h3>
        <p class="author">Author - ${blog.author}</p>
        <button class="toggle-btn"></button>
        <div class="blog-content">
            <p>${blog.content}</p>
            <h4>Comments</h4>
            <div class="comments-section" id="comments-${blog.id}">
                ${blog.Comments.map(
                  (comment) => `
                    <div class="comment">
                        <p>${comment.content}</p>
                        <button id="delete-btn" onclick="deleteComment(${comment.id}, ${blog.id})">Delete</button>
                    </div>
                `
                ).join("")}
            </div>
            <form onsubmit="addComment(event, ${blog.id})">
                <input type="text" placeholder="Write a comment" required>
                <button type="submit"><img src="data:image/png;base64,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"></button>
            </form>
        </div>
      `;
      const toggleBtn = blogElement.querySelector('.toggle-btn');
      const content = blogElement.querySelector('.blog-content');
      toggleBtn.addEventListener('click', () => {
        if (content.style.display === 'none' || content.style.display === '') {
          content.style.display = 'block';
          toggleBtn.classList.add('expanded');
        } else {
          content.style.display = 'none';
          toggleBtn.classList.remove('expanded');
        }
      });

      blogList.appendChild(blogElement);
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}

async function addComment(event, blogId) {
  event.preventDefault();
  const content = event.target.querySelector("input").value;
  try {
    const response = await axios.post(`${API_URL}/blogs/${blogId}/comments`, { content });
    const newComment = response.data;
    const commentsSection = document.getElementById(`comments-${blogId}`);
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `
      <p>${newComment.content}</p>
      <button id="delete-btn" onclick="deleteComment(${newComment.id}, ${blogId})">Delete</button>
    `;
    commentsSection.appendChild(commentElement);
    event.target.reset();
  } catch (error) {
    alert("Failed to add comment: " + error.response.data.error);
  }
}

async function deleteComment(commentId, blogId) {
  try {
    await axios.delete(`${API_URL}/comments/${commentId}`);
    const commentElement = document.querySelector(`button[onclick="deleteComment(${commentId}, ${blogId})"]`).parentNode;
    commentElement.remove();
  } catch (error) {
    alert("Failed to delete comment: " + error.response.data.error);
  }
}

fetchBlogs();