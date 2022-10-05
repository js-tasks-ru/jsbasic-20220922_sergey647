function getMinMax(str) {
  const garbage = Array.from(str.matchAll(/(\-?[\d]*[.]?[\d]+)/g));
  const chaosArr = garbage.map((itm) => {
    return parseFloat(itm[1], 10);
  });
  return {
    min: Math.min.apply(null, chaosArr),
    max: Math.max.apply(null, chaosArr),
  };
}
