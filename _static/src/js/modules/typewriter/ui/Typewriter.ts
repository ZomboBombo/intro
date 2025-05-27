import * as _ from '../config'
import { NullishHTMLElem } from '../../../_core/types'

/**
 * @class
 * @module Typewriter
 * @description Utility feature. Used to create a 'typewriting' animation.
*/
export default class Typewriter {
  private static CNST_TYPEWRITING_DELAY_DEF_COEFF = 15

  private _textBlock: HTMLElement
  private _options: _.ITypewriterOptions
  private _delayCoeff: number
  private _typewriterTimeoutsList: ReturnType<typeof setTimeout>[] = []

  /**
   * @constructor
   * @param {HTMLElement} textBlock
   * @param {ITypewriterOptions} options
  */
  constructor(textBlock: HTMLElement, options?: _.ITypewriterOptions) {
    this._textBlock = textBlock
    this._options = options ?? {}

    this._calcDelayCoeff()
  }

  /**
   * @description Initiates the 'Typewriter' logic.
   * @returns {void}
  */
  public init(): void {
    this._calcDelayCoeff()
  }

  /**
   * @description Used to manually enable the 'typing' logic.
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

        this._typewriterTimeoutsList.push(
          setTimeout(() => {
            this._textBlock.textContent += letter
          }, twTimeout)
        )
      }
    }

    this._setupModalActionsObserver()
  }

  /**
   * Private method: [_setupModalActionsObserver()].
   * 
   * @description Configures the logic for tracking state-changes of the 'Modal' inside which the 'Typewriter' instance is located.
   * @returns {void}
  */
  private _setupModalActionsObserver(): void {
    const parentModal: NullishHTMLElem = this._textBlock.closest('[data-modal="window"]')

    if (!parentModal) {
      return
    }

    const modalActionsObserverCb: MutationCallback = (mutationRecs: MutationRecord[]): void => {
      const modalClassAttrMutation: MutationRecord | undefined = mutationRecs.find((mutation: MutationRecord) => mutation.attributeName === 'class')

      if (!modalClassAttrMutation) {
        return
      }

      const { target } = modalClassAttrMutation
      const notActiveModal: boolean = !(target as HTMLElement).classList.contains('is-active')

      if (notActiveModal) {
        this._typewriterTimeoutsList.forEach((timeout) => clearTimeout(timeout))
        modalActionsObserver.disconnect()
      }
    }

    const modalActionsObserver = new MutationObserver(modalActionsObserverCb)
    modalActionsObserver.observe(parentModal, {
      attributes: true,
      attributeOldValue: true,
    })
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
