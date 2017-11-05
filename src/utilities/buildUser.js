export default function buildUser(user) {
  var res = {};
  res.facebook = {};
  res.email = user.local.email;
  if (user.facebook) {
    Object.assign(res.facebook, user.facebook);
  }

  return res;
}
