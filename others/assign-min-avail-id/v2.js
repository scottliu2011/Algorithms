// 使用标志位

function assign(array) {
  const count = array.length;
  const existAry = new Array(count);

  for (let i = 0; i < count; i++) {
    const value = array[i];
    
    if (value < count) {
      existAry[value] = true;
    }
  }

  for (let i = 0; i < count; i++) {
    if (!existAry[i]) {
      return i;
    }
  }

  return count;
}

const array = [5, 3, 0, 4, 1, 9, 7, 2];

const id = assign(array);

console.log(id);