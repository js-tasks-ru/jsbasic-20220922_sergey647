function factorial(n) {
  let f=n;
  if(n<2) {
    return 1;
  } else {
    for(let i = n-1; i > 1; i--) {
      f *= i;
    }
    return f;
  }
}
