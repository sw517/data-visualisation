const colorMap = {
  blue: '#5fdde5',
  brown: '#7d5a5a',
  green: '#a8df65',
  yellow: '#fcf876',
  red: '#e63946',
  banana: '#fcf876',
  mango: '#ffc324',
  apple: '#8ac926',
  strawberry: '#e63946',
};

/**
 * Checks the colorMap for an existing color if the argument
 * is passed, otherwise a random color will be returned if unset
 * or no match is found.
 * @param {string} color The string containing a hex color code.
 */
export default function randomColor(color = null) {
  const colorLowerCase = color ? color.toLowerCase() : null;
  const mapColor = colorMap[colorLowerCase];
  return mapColor || `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
