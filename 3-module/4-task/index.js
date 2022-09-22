function showSalary(users, age) {
  let result = "";
  for (let i = 0; i < users.length; i++) {
    if (users[i].age <= age) {
      let nl = result.length > 0 ? "\n" : "";
      result += nl + `${users[i].name}, ${users[i].balance}`;
    }
  }
  return result;
}
