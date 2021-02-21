getCategoriesLine = (categoryArray) => {
  console.log(categoryArray);
  var lastElement = categoryArray.pop();
  var line = "";
  categoryArray.forEach((element) => {
    line = element + " \u2022 "; //this is bullet's unicode
  });
  if (lastElement) {
    line += lastElement;
  }
  return line;
};

const categoryArray = ["fasdf", "fds"];

console.log(categoryArray);
console.log(getCategoriesLine(categoryArray));
