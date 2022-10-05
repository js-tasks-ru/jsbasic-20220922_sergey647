function sumSalary(salaries) {
  let result = 0;
  Object.keys(salaries).map((key) => {
    if (typeof salaries[key] === "number" && isFinite(salaries[key])) {
      result += salaries[key];
    }
  });
  return result;
}
