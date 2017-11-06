export default function buildUser(user) {
  const res = {};
  res.facebook = {};
  res.email = user.local.email;
  if (user.facebook) {
    Object.assign(res.facebook, user.facebook);
  }

  return res;
}
