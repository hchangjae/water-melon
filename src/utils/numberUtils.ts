export const simpleNumber = (number: number) => {
  const units = ['', 'K', 'M', 'B', 'T', 'Q', 'QQ', 'S', 'SS', 'O', 'N', 'D'];
  let unit = 0;
  while (number >= 1000) {
    number /= 1000;
    unit++;
  }

  const hasDecimal = number % 1 !== 0;
  return `${hasDecimal ? number.toFixed(1) : number}${units[unit]}`;
};
