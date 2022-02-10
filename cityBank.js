function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

function cardDistribution(infos) {
  let lastDigit = 1;
  const results = infos.map(
    ({ district, currentYear, postNo, birthYear, priority, name }) => {
      const dl = district.slice(0, 2).toUpperCase();
      const cyLen = currentYear.toString().length;
      const cy = currentYear
        .toString()
        .split("")
        .slice(cyLen - 2)
        .join("");
      const pn = postNo.toString().slice(0, 2);
      const by = birthYear;
      const serial = `${dl}${cy}${pn}${by}`.padEnd(15, 0) + lastDigit++;
      return {
        cardNumber: serial,
        gift: Number(serial.charAt(serial.length - 1)) % 2 === 0 ? "R" : "W",
        priority,
        name,
      };
    }
  );
  results.sort(dynamicSort("name"));
  results.sort(dynamicSort("priority"));

  const finalResults = results.map(({ cardNumber, gift, priority }) => {
    return { cardNumber, gift, priority };
  });

  return finalResults;
}