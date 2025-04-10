async function authorizationToAdminAndModerator(req, res, next) {
  const role = req.user.role;
  //validations
  if (!(role === "Admin" || role === "Moderator")) {
    return res.redirect("/");
  }
  next();
}
module.exports = authorizationToAdminAndModerator;
