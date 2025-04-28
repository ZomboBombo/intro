/**
 * Interface [ITypewriterOptions]
 * 
 * @interface {ITypewriterOptions}
 * - @prop {number} typewritingDelayCoeff
*/
interface ITypewriterOptions {
  typewritingDelayCoeff?: number
}

/**
 * Class [Typewriter]
 * 
 * Utility feature. Used to create a 'typewriting'
 * animation.
 * 
 * Constructor:
 * @param {HTMLElement} textBlock
 * @param {ITypewriterOptions} options
*/
export default class Typewriter {
  private static CNST_TYPEWRITING_DELAY_DEF_COEFF = 15

  private _textBlock: HTMLElement
  private _options: ITypewriterOptions
  private _delayCoeff: number

  constructor(textBlock: HTMLElement, options?: ITypewriterOptions) {
    this._textBlock = textBlock
    this._options = options ?? {}

    this._calcDelayCoeff()
  }

  /**
   * Public method: [init()].
   * @returns {void}
  */
  public init(): void {
    this._calcDelayCoeff()
  }

  /**
   * Public method: [type()].
   * @returns {void}
  */
  public type(): void {
    const splitText = this._getSplitText()

    this._textBlock.textContent = ''

    if (splitText === '') {
      this._textBlock.textContent = splitText
    } else {
      for (const [index, letter] of splitText.entries()) {
        const twTimeout: number = index * this._delayCoeff

        setTimeout(() => {
          this._textBlock.textContent += letter
        }, twTimeout)
      }
    }
  }

  /**
   * Private method: [_calcDelayCoeff()].
   * @returns {void}
  */
  private _calcDelayCoeff(): void {
    if (this._options.typewritingDelayCoeff) {
      const isLessThanMin: boolean = this._options.typewritingDelayCoeff <= Typewriter.CNST_TYPEWRITING_DELAY_DEF_COEFF

      this._delayCoeff = isLessThanMin
        ? Typewriter.CNST_TYPEWRITING_DELAY_DEF_COEFF
        : this._options.typewritingDelayCoeff
    } else {
      this._delayCoeff = Typewriter.CNST_TYPEWRITING_DELAY_DEF_COEFF
    }
  }

  /**
   * Private method: [_getSplitText()].
   * @returns {string[] | ''}
  */
  private _getSplitText(): string[] | '' {
    return this._textBlock.textContent
      ? this._textBlock.textContent.split('')
      : ''
  }
}
