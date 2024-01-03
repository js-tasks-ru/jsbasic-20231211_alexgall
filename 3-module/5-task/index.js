function getMinMax(str) {
  let result = {
    min: "",
    max: "",
  };
  const splitData = str.split(" ");
  const filteredData = splitData.filter((value) => !isNaN(Number(value)));
  result.max = Math.max(...filteredData);
  result.min = Math.min(...filteredData);
  return result;
}
