function namify(users) {
  let result = [];
  users.map((user) => {
    result.push(user.name);
  });
  return result;
}
