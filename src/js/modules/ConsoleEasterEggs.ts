/* eslint-disable no-console */

interface IConsoleGroup {
  groupTitle: string | string[]
  groupContent: string | string[]
}

interface ICreateConsoleGroup {
  groupTitle: string | string[]
  groupContent: string | string[]
  innerGroups?: IConsoleGroup[]
}

/**
 * Class [ConsoleEasterEggs]
 * 
 * The «Console Easter Eggs» interactions with users!
 * ~~~
*/
export default class ConsoleEasterEggs {
  private static _primaryTitleStylesMap = new Map([
    ['padding-inline', '24px'],
    ['font-size', '24px'],
    ['color', 'rgb(192, 163, 250)'],
    ['background-color', 'rgb(16, 6, 24)'],
    ['border-radius', '6px'],
  ])

  private static _primaryDescrStylesMap = new Map([
    ['padding-inline', '24px'],
    ['font-size', '24px'],
    ['color', 'rgb(192, 163, 250)'],
    ['background-color', 'rgb(16, 6, 24)'],
  ])

  private static _contentStylesMap = new Map([
    ['padding-inline', '24px'],
    ['font-size', '16px'],
    ['text-style', 'italic'],
    ['color', 'rgb(192, 163, 250)'],
    ['background-color', 'rgb(16, 6, 24)'],
    ['border-radius', '6px'],
  ])

  private static _sectionTitleStylesMap = new Map([
    ['padding-inline', '24px'],
    ['font-size', '16px'],
    ['color', 'rgb(16, 6, 24)'],
    ['background-color', 'rgb(192, 163, 250)'],
    ['border-radius', '6px'],
  ])

  private static _sectionDescrStylesMap = new Map([
    ['padding-inline', '24px'],
    ['font-size', '16px'],
    ['color', 'rgb(16, 6, 24)'],
    ['background-color', 'rgb(192, 163, 250)'],
    ['border-radius', '6px'],
  ])

  private static _warnStylesMap = new Map([
    ['padding-inline', '24px'],
    ['font-size', '16px'],
    ['color', 'rgb(255, 119, 0)'],
    ['background-color', 'rgba(255, 119, 0, 0.3)'],
  ])

  private _userAgent: string
  private _primaryTitleStyles: string
  private _primaryDescrStyles: string
  private _contentStyles: string
  private _sectionTitleStyles: string
  private _sectionDescrStyles: string
  private _warnStyles: string

  constructor() {
    this._userAgent = navigator.userAgent.toLowerCase()

    this._primaryTitleStyles = this._getStylesStringFromMap(ConsoleEasterEggs._primaryTitleStylesMap)
    this._primaryDescrStyles = this._getStylesStringFromMap(ConsoleEasterEggs._primaryDescrStylesMap)
    this._contentStyles = this._getStylesStringFromMap(ConsoleEasterEggs._contentStylesMap)
    this._sectionTitleStyles = this._getStylesStringFromMap(ConsoleEasterEggs._sectionTitleStylesMap)
    this._sectionDescrStyles = this._getStylesStringFromMap(ConsoleEasterEggs._sectionDescrStylesMap)
    this._warnStyles = this._getStylesStringFromMap(ConsoleEasterEggs._warnStylesMap)

    if (this._isSafari()) {
      this._createConsoleGroup({
        groupTitle: [
          '%cGotcha! You find the «Console Easter Eggs», but you can\'t show it :(',
          this._primaryTitleStyles,
        ],
        groupContent: [
          '%cBecause of Safari doesn\'t know how to work properly with stylized console.group() and console.log()\n To fully enjoy the beauty of the stylized elements, please open the website in a Chromium-browser :3',
          this._primaryDescrStyles,
        ],
      })
      return
    }

    if (this._isFirefox()) {
      this._createConsoleGroup({
        groupTitle: [
          '%cUnfortunately, the Firefoxfox doesn\'t understand all the style props for console-elements, so some of them may look a little bit weird... 0~0',
          this._warnStyles,
        ],
        groupContent: [
          '%cTo fully enjoy the beauty of the stylized elements, please open the website in a Chromium-browser :3',
          this._warnStyles,
        ],
      })
    }

    this._createConsoleGroup({
      groupTitle: [
        '%cGotcha! You find the «Console Easter Eggs»!',
        this._primaryTitleStyles,
      ],
      groupContent: [
        '%cSince you\'ve already come in, check this out!',
        this._contentStyles,
      ],
      innerGroups: [
        // ### Actual versions
        {
          groupTitle: [
            '%cActual «Intro\'s» versions:',
            this._sectionTitleStyles,
          ],
          groupContent: [
            '%c%s%c%s',
            this._sectionDescrStyles,
            'Vanilla version:',
            this._sectionDescrStyles,
            '\n--> https://github.com/ZomboBombo/intro',
          ],
        },

        // ### Upcoming versions
        {
          groupTitle: [
            '%cUpcoming «Intro\'s» versions:',
            this._sectionTitleStyles,
          ],
          groupContent: [
            '%c%s%c%s%c%s',
            this._sectionDescrStyles,
            '\n--> Vue',
            this._sectionDescrStyles,
            '\n--> React',
            this._sectionDescrStyles,
            '\n--> Flutter Web',
          ],
        },
      ],
    })
  }

  /**
   * Private method: [_getStylesStringFromMap()].
   * 
   * Used to get CSS-valid styles string from 'Styles-Map' structure.
   * ~~~
   * @param {Map<string, string>} stylesMap
   * @returns {string}
  */
  private _getStylesStringFromMap(stylesMap: Map<string, string>): string {
    return Array.from(stylesMap).map(([mKey, mVal]) => `${mKey}: ${mVal};`).join(' ')
  }

  /**
   * Private method: [_createConsoleGroup()].
   * 
   * Main logic of 'console.group()' with inner log-content creation.
   * ~~~
   * @param {ICreateConsoleGroup} props
   * @returns {void}
  */
  private _createConsoleGroup({ groupTitle, groupContent, innerGroups }: ICreateConsoleGroup): void {
    console.group(...groupTitle)
    console.log(...groupContent)
    if (innerGroups) {
      for (const cGroup of innerGroups) {
        this._createConsoleGroup(cGroup)
      }
    }
    console.groupEnd()
  }

  /**
   * Private method: [_isSafari()].
   * 
   * Checks whether the platform is an Safari
   * ~~~
   * @returns {boolean}
  */
  private _isSafari(): boolean {
    return this._userAgent.includes('webkit') && this._userAgent.includes('safari') && !this._userAgent.includes('chrome')
  }

  /**
   * Private method: [_isFirefox()].
   * 
   * Checks whether the platform is an Firefox
   * ~~~
   * @returns {boolean}
  */
  private _isFirefox(): boolean {
    return this._userAgent.includes('firefox')
  }
}
