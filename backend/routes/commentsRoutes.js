const express = require("express")
const router = express.Router()

const commentsController= require ('../controllers/commentsController')


router.get("/", commentsController.getAll)
router.post("/dados", commentsController.createComment)
router.delete("/delete" , commentsController.deleteComment)
router.put("/updade", commentsController.alterComment)
router.put("/vote" , commentsController.score)

module.exports = router