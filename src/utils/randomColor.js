const colorMap = {
  blue: '#5fdde5',
  brown: '#7d5a5a',
  green: '#a8df65',
  banana: '#fcf876',
  mango: '#ffc324',
  apple: '#8ac926',
  strawberry: '#e63946',
  yellow: '#fcf876',
};

export default function randomColor(color = null) {
  const colorLowerCase = color ? color.toLowerCase() : null;
  const mapColor = colorMap[colorLowerCase];
  return mapColor || `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
