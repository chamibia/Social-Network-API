const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require("../../controllers/user-controller");

router.route("/").get(getUsers).post(createUser);

// localhost:3001/api/user
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// localhost:3001/api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
