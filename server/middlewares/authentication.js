const { validateToken } = require("../services/authentication");

function checkAuthCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies["cookieName"];
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      return next();
    } catch (err) {
      console.error("Token validation failed:", err);
      return res.redirect("/user/signin");
    }
  };
}

async function restrictToLoggedinUserOnly(req, res, next) {
  const tokenVal = req.cookies.token;
  console.log("token : ", tokenVal);
  //validations
  if (!tokenVal) {
    return res.redirect("/user/signin");
  }
  next();
}
module.exports = { checkAuthCookie, restrictToLoggedinUserOnly };
