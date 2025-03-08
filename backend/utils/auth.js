const jwt = require("jsonwebtoken");
const secretKey = "Sinanihealth@123!0987*%^$$$$";
function setUser(user, isAdmin = false) {
  return jwt.sign(
    {
      _id: user._id,
      email: isAdmin ? user.profile.email : user.username,
      isAdmin,
    },
    secretKey
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
