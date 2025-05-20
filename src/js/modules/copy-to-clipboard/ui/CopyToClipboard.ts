/**
 * @class
 * @module CopyToClipboard
 * @description Performs the 'copy-to-clipboard' logic when clicking on the triggers.
*/
export default class CopyToClipboard {
  private static readonly CNST_SUCCESS_COPY_TEXT_PREVIEW_TIME = 3000
  private static readonly CNST_SUCCESS_COPY_TEXT = 'Copied!'

  private _trigger: HTMLButtonElement
  private _realTriggerTextContent: string
  private _successCopyStylesMap: Map<string, string>

  /**
   * @constructor
   * @param {HTMLButtonElement} trigger
  */
  constructor(trigger: HTMLButtonElement) {
    this._trigger = trigger
    this._realTriggerTextContent = this._trigger.textContent ?? ''

    const { width, height } = this._trigger.getBoundingClientRect()

    this._successCopyStylesMap = new Map([
      ['width', `${width}px`],
      ['height', `${height}px`],
      ['pointer-events', 'none'],
    ])
  }

  /**
   * @description Initiates the 'Copy-To-Clipboard' logic.
   * @returns {void}
  */
  public init(): void {
    this._trigger.addEventListener('click', this._onClick)
  }

  /**
   * Private method: [_resetTrigger()]
   * @returns {void}
  */
  private _resetTrigger(): void {
    this._trigger.textContent = this._realTriggerTextContent
    this._trigger.style = ''
  }

  /**
   * Private method: [_setTriggerSuccessCopyBehavior()]
   * @returns {void}
  */
  private _setTriggerSuccessCopyBehavior(): void {
    for (const [mKey, mVal] of this._successCopyStylesMap) {
      this._trigger.style.setProperty(mKey, mVal)
    }

    this._trigger.textContent = CopyToClipboard.CNST_SUCCESS_COPY_TEXT
  }

  /**
   * @callback
   * Private callback: [_onClick]
   *
   * @param {MouseEvent} e
   * @returns {Promise<void>}
  */
  private _onClick = async (e: MouseEvent): Promise<void> => {
    e.preventDefault()

    await navigator.clipboard.writeText(this._realTriggerTextContent ?? '')
    this._setTriggerSuccessCopyBehavior()

    setTimeout(() => {
      this._resetTrigger()
    }, CopyToClipboard.CNST_SUCCESS_COPY_TEXT_PREVIEW_TIME)
  }
}
