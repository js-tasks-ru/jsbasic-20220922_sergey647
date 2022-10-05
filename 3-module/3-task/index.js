function camelize(str) {
  let result = [];
  let caps = false;
  for (let i = 0; i < str.split("").length; i++) {
    if (str[i] === "-") {
      caps = true;
    } else {
      result.push(caps ? str[i].toUpperCase() : str[i]);
      caps = false;
    }
  }
  return result.join("");
}
