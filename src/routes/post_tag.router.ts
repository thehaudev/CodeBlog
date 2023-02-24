import Post_tagController from "../controllers/post_tag.controller"

const router = require('express').Router()

const post_tagController = new Post_tagController
//POST /api/v1/post_tag
router.post('/', post_tagController.createPost_tag)