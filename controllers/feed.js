/**The json method of express:
 * convient method to send json response body
 * Dont call res.render - since I dont render view - no HTML!
 */

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        //simulate mongoose id
        _id: 1,
        title: "first tltle",
        content: "first content",
        imageUrl: "images/duck.jpg",
        creator: {
          name: "Nir",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  //Get the post from the request body
  const post = req.body.post;

  res.status(201).json({});
};

exports.createPost = (req, res, next) => {
  //Extract request body fields
  const title = req.body.title;
  const content = req.body.content;

  console.log(title, content);

  console.log(`title:${title}, content:${content}`);
  //Save post in DB (later)

  //Return the response
  res.status(201).json({
    message: "Post created succussfully!",
    post: { id: new Date().toISOString(), title, content },
  });
};
