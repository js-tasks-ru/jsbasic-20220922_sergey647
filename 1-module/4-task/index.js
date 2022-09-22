function checkSpam(str) {
  let result = false;
  const blackListArr = ['1xBet', 'XXX'];
  blackListArr.map((word) => {
    if (new RegExp(word,'i').test(str)) {
      result = true;
      return;
    }
  });
  return result;
}
