
function assign(array) {
  for (let i = 0; i < array.length; i++) {
    if (!array.includes(i)) {
      return i;
    }
  }

  return array.length;
}

const array = [5, 3, 0, 4, 1, 9, 7, 2, 6, 8];

const id = assign(array);

console.log(id);