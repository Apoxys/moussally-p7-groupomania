const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postsCtrl = require('../controllers/postsCtrl');
const multer = require('../middleware/multer-config');


router.get('/', /*auth,*/ postsCtrl.getAllPosts);
router.get('/:id', /*auth,*/ postsCtrl.getOnePost);

router.post('/', auth, multer, postsCtrl.createPost);
router.post(':id', auth, postsCtrl.likes);

router.put('/:id', auth, multer, postsCtrl.modifyPost);

router.delete('/:id', auth, postsCtrl.deletePost);

module.exports = router;