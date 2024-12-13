// Function to fetch posts and comments
async function fetchSocialMediaFeed() {
    try {
        // Fetch posts
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await postsResponse.json();

        // Fetch comments
        const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
        const comments = await commentsResponse.json();

        // Display posts and comments
        const feed = document.getElementById('feed');
        let postCount = 0; // Counter to limit posts displayed

        posts.forEach(post => {
            if (postCount >= 10) return; // Limit to 10 posts
            postCount++;

            // Create a post container
            const postDiv = document.createElement('div');
            postDiv.className = 'post';

            // Create and append the post title
            const postTitle = document.createElement('h2');
            postTitle.textContent = post.title;
            postDiv.appendChild(postTitle);

            // Create and append the post body
            const postBody = document.createElement('p');
            postBody.textContent = post.body;
            postDiv.appendChild(postBody);

            // Create a comments container
            const commentsDiv = document.createElement('div');
            commentsDiv.className = 'comments';

            // Add a comments heading
            const commentsHeading = document.createElement('h3');
            commentsHeading.textContent = 'Comments:';
            commentsDiv.appendChild(commentsHeading);

            // Filter and append comments related to this post
            comments
                .filter(comment => comment.postId === post.id)
                .forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment';

                    const commentText = document.createElement('p');
                    commentText.innerHTML = `<strong>${comment.name}</strong>: ${comment.body}`;
                    commentDiv.appendChild(commentText);

                    commentsDiv.appendChild(commentDiv);
                });

            // Append comments container to post
            postDiv.appendChild(commentsDiv);

            // Append the post container to the feed
            feed.appendChild(postDiv);
        });

        console.log('Social Media Feed loaded successfully!');
    } catch (error) {
        console.error('Error loading feed:', error);
    }
}

// Load the feed
fetchSocialMediaFeed();
