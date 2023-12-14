const express = require("express");

const router = express.Router();

const feedController = require("../controllers/feed");
//total path: GET: /feed/posts
router.get("/posts", feedController.getPosts);

/**CREATE A POST RESOURCE
 * 1. use post - Since I want to add/append - and not update!
 *   (for updating - use put - which is more appropriate for user resource)
 *
 */

router.post("/posts", feedController.createPost);
module.exports = router;
