// 暴力搜索

function assign(array) {
  const count = array.length;

  for (let i = 0; i < count; i++) {
    if (!array.includes(i)) {
      return i;
    }
  }

  // 如果在数组中没找到 count就是最小可分配ID
  return count;
}

const array = [5, 3, 0, 4, 1, 9, 7, 2, 6, 8];

const id = assign(array);

console.log(id);