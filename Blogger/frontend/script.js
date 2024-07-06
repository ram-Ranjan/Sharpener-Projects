const API_URL = 'http://localhost:3000/api';

document.getElementById('blogForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const blog = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        content: document.getElementById('content').value
    };
    try {
        const response = await axios.post(`${API_URL}/blogs`, blog);
        alert('Blog post created successfully!');
        document.getElementById('blogForm').reset();
        fetchBlogs();
    } catch (error) {
        alert('Failed to create blog post: ' + error.response.data.error);
    }
});

async function fetchBlogs() {
    try {
        const response = await axios.get(`${API_URL}/blogs`);
        const blogs = response.data;
        const blogList = document.getElementById('blogList');
        blogList.innerHTML = '';
        blogs.forEach(blog => {
            const blogElement = document.createElement('div');
            blogElement.className = 'blog-item';
            blogElement.innerHTML = `
                <h3>${blog.title}</h3>
                <p>Author: ${blog.author}</p>
                <div class="blog-content">
                    <p>${blog.content}</p>
                    <h4>Comments</h4>
                    <div class="comments-section">
                        ${blog.Comments.map(comment => `
                            <div class="comment">
                                ${comment.content}
                                <button onclick="deleteComment(${comment.id})">Delete</button>
                            </div>
                        `).join('')}
                    </div>
                    <form onsubmit="addComment(event, ${blog.id})">
                        <input type="text" placeholder="Write a comment" required>
                        <button type="submit">Add Comment</button>
                    </form>
                </div>
            `;
            blogElement.querySelector('h3').addEventListener('click', () => {
                const content = blogElement.querySelector('.blog-content');
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
            });
            blogList.appendChild(blogElement);
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
}

async function addComment(event, blogId) {
    event.preventDefault();
    const content = event.target.querySelector('input').value;
    try {
        await axios.post(`${API_URL}/blogs/${blogId}/comments`, { content });
        alert('Comment added successfully!');
        event.target.reset();
        fetchBlogs();
    } catch (error) {
        alert('Failed to add comment: ' + error.response.data.error);
    }
}

async function deleteComment(commentId) {
    try {
        await axios.delete(`${API_URL}/comments/${commentId}`);
        alert('Comment deleted successfully!');
        fetchBlogs();
    } catch (error) {
        alert('Failed to delete comment: ' + error.response.data.error);
    }
}

fetchBlogs();