let currentDate = new Date();

const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();

function data(d, m, y) {
  let data;
  if (m < 10 && d < 10) {
    data = y + '0' + m + '0' + d;
  }
  if (m > 10 && d < 10) {
    data = y + m + '0' + d;
  }
  if (m < 10 && d > 10) {
    data = y + '0' + m + d;
  }
  return data;
}

export const date = data(day, month, year);