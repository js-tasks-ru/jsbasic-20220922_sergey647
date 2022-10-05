function filterRange(arr, a, b) {
  let result = [];
  arr.forEach(function (item) {
    if (item >= a && item <= b) {
      result.push(item);
    }
  });
  return result;
}
