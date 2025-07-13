// @route POST /api/comments
// @desc Create a new comment
// @access Private
router.post("/", authMiddleware, ...validateCommentCreation, commentController.createComment);

// @route GET /api/comments/blog/:blogId
// @desc Get all comments for a specific blog
// @access Public
router.get("/blog/:blogId", commentController.getCommentsByBlog);

// @route PUT /api/comments/:id
// @desc Update a comment
// @access Private
router.put("/:id", authMiddleware, ...validateCommentUpdate, commentController.updateComment);

// @route DELETE /api/comments/:id
// @desc Delete a comment
// @access Private
router.delete("/:id", authMiddleware, ...validateCommentDelete, commentController.deleteComment);

module.exports = router;
