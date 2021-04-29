declare global {
  interface String {
    firstWordUppercase(): string;
  }
}
// eslint-disable-next-line
String.prototype.firstWordUppercase = function(){
  return this
    .split(" ")
    .map((word) => {
      return `${word[0].toUpperCase()}${word.slice(1)}`;
    })
    .join(" ");
};

export {}
