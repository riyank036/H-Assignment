const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require('../db')
const router = Router();

// Admin Routes
// router.post('/signup', (req, res) => {
//     // Implement admin signup logic
//     const username = req.body.username;
//     const password = req.body.password;
    
//     // check if a user with this username already exists

//     Admin.create({
//         usename: usename,
//         password: password
//     })
//     .then(function () {
//          res.json({
//             msg: "Admin created successfully"
//          })
//     })
//     .catch(function() {
//         res.status(403).json({
//             msg: "Admin not Created!"
//         })
//     })
// });

router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    // check if a user with this username already exists

    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        msg: "Admin created successfully"
     })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
   // Used zod for validation
    
const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price
   })
    console.log(newCourse);

    res.json({
        msg: "Course Created Successfully", courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
  const response = await Course.find({})

  console.log(response)

  res.json({
    Course: response
  })
});

module.exports = router;