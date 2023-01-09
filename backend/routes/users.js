const router = require('express').Router();
const { validationGetUser, validatePatchUserInfo, validatePatchUserAvatar } = require('../middlewares/validatons');

const {
  getUsers,
  getMe,
  getUser,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.patch('/me', validatePatchUserInfo, patchUserInfo);
router.patch('/me/avatar', validatePatchUserAvatar, patchUserAvatar);
router.get('/:userId', validationGetUser, getUser);
module.exports = router;
