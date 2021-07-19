const router = require("express").Router();
const Blog = require("../model/Blog");

router.post("/post-blog", async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        img_url: req.body.img_url,
        description: req.body.description,
        categoryBlog: req.body.categoryBlog,
    });
    try {
        const saveBlog = await blog.save();
        res.status(200).send(saveBlog);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/get-all-blog", async (req, res) => {
    try {
        const blog = await Blog.find({});
        res.status(200).send(blog);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/get-blog/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.send(blog);
})

router.put("/update-blog/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        blog.title = req.body.title;
        blog.img_url = req.body.img_url;
        blog.description = req.body.description;
        blog.categoryBlog = req.body.categoryBlog;
        const updatedBlog = await blog.save();
        if (updatedBlog) {
            return res
                .status(200)
                .send({ message: 'SuccessUpdated', data: updatedBlog });
        }
    }
    return res.status(500).send({ message: ' Error in Updating Blog.' });
})

router.post('/:id/reviews', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      const review = {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
      };
      blog.reviews.push(review);
      blog.numReviews = blog.reviews.length;
      const updatedBlog = await blog.save();
      res.status(201).send({
        data: updatedBlog.reviews[updatedBlog.reviews.length - 1],
        message: 'Review saved successfully.',
      });
    } else {
      res.status(404).send({ message: 'Blog Not Found' });
    }
  });

router.delete("/delete-blog/:id", async (req,res)=>{
    const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
    res.send(deleteBlog)
})

module.exports = router;