const moderatorFunctions = require("../functions/moderator");

const { ModeratedPostRepository } = require("../repositories/moderator");

let moderatorRepo = new ModeratedPostRepository(); //use this repository

exports.deletePost = (req, res) => {
  const postId = req.body.postId;
  moderatorFunctions.removePost(postId);

  res.redirect("/moderator");
};

exports.working = (req, res) => {
  currentPost = moderatorRepo.postsForConsideration.pop(); //remove first post form the moderator queue

  const considerId = currentPost.postId;
  const sendToDelete = { considerId: considerId }; //send if delete function is triggered

  // Serve an HTML page with two buttons
  res.send(`
    <html>
    <head>
      <title>Moderator Interface</title>
    </head>
    <body>
      <h1>Moderator Interface</h1>
      <button onclick="keep()">Keep</button>
      <button onclick="remove()">Remove</button>
      <script>
        // Function to handle 'Keep' button click
        function keep() {
          fetch('/keep', { method: 'POST' })
            .then(response => {
              // Handle response as needed
              console.log('Keep function executed');
            })
            .catch(error => {
              console.error('Error executing Keep function:', error);
            });
        }

        // Function to handle 'Remove' button click
        function remove() {
          fetch('/remove', { method: 'POST',     
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(sendToDelete),  })
            .then(response => {
              // Handle response as needed
              console.log('Remove function executed');
            })
            .catch(error => {
              console.error('Error executing Remove function:', error);
            });
        }
      </script>
    </body>
    </html>
  `);
};

exports.keep = (req, res) => {
  res.redirect("/moderator"); //redirect to the working moderator route
};
