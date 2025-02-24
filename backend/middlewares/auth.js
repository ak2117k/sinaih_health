const { getUser } = require("../utils/auth");

const checkForAuthentication = (req, res, next) => {
  const authorizationHeaderValue = req.headers["authorization"];
  req.user = null;
  if (
    !authorizationHeaderValue ||
    !authorizationHeaderValue.startsWith("Bearer")
  )
    return next();
  const token = authorizationHeaderValue.split("Bearer ")[1];
  const user = getUser(token);
  req.user = user;
  return next();
};

const restrictTo = (roles = []) => {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/log-in");
    if (!roles.includes(req.user.profile.acessType)) {
      return res.end("UnAuthorized");
    }
  };
};

const restrictToLoginnedUserOnly = (req, res, next) => {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.redirect("/log-in");

  const user = getUser(userUid);
  if (!user) return res.redirect("/log-in");

  req.user = user;
  next();
};

const checkAuth = (req, res, next) => {
  const userUid = req.cookies?.uid;
  if (userUid) {
    // Redirect logged-in users away from login/signup page, maybe to dashboard or home
    return res.redirect("/"); // Update this URL as needed
  }

  const user = getUser(userUid);
  if (!user) return res.redirect("/sign-up");

  req.user = user;
  next();
};

module.exports = {
  restrictToLoginnedUserOnly,
  checkAuth,
  checkForAuthentication,
  restrictTo,
};
