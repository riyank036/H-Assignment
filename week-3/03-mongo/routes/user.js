const { Router } = require("express");
const router = Router();
const { User, Course } = require('../db');
const userMiddleware = require("../middleware/user");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

   await User.create({
        username,
        password
    })
    res.status(200).json({
        msg: "User Created Successfully"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
const response = await Course.find({})

res.status(200).json({
    courses: response
});

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
   const courseId = req.params.courseId;
   const username = req.headers.username;
  try {
    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
  } catch(e) {
    console.log(e)
  };
  res.status(200).json({
    msg: "Purchase Complited!"
  })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
   const user = await User.findOne({
    username: req.headers.username
   });
   console.log(user.purchasedCourses);
   const courses = await Course.find({
    _id: {
        "$in": user.purchasedCourses
    }
   });
   res.status(200).json({
    courses: courses
});
});



module.exports = router