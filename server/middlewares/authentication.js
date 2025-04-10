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
      req.user = null;
      return next(); // don't redirect – let frontend decide
    }
  };
}

async function restrictToLoggedinUserOnly(req, res, next) {
  const tokenVal = req.cookies.token;

  if (!tokenVal) {
    return res.status(401).json({ message: "Unauthorized: No token found" });
  }

  try {
    const { validateToken } = require("../services/authentication");
    const userPayload = validateToken(tokenVal);
    req.user = userPayload;
    next();
  } catch (err) {
    console.error("Token validation failed:", err);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = { checkAuthCookie, restrictToLoggedinUserOnly };
