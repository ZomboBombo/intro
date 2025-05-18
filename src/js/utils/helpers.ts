const HEX_COLOR_STRING_LENGTH = 6
const HEX_ALLOWED_SYMBOLS: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

/**
 * @function generateRandomHexColor()
 * @description Generate a random HEX-color.
 * ~~~
 * 
 * @returns {string}
*/
export function generateRandomHexColor(): string {
  const randomHexColorSymbs: string[] = []

  for (let i = 0; i < HEX_COLOR_STRING_LENGTH; i++) {
    const randomHexSymbIndex: number = Math.floor(Math.random() * HEX_ALLOWED_SYMBOLS.length)
    randomHexColorSymbs.push(HEX_ALLOWED_SYMBOLS[randomHexSymbIndex])
  }

  return `#${randomHexColorSymbs.join('')}`
}
