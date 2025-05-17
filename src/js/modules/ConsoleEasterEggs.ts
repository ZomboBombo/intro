/* eslint-disable no-console */

interface IConsoleGroup {
  title: string | string[]
  content: string | string[]
}

interface ICreateConsoleGroupFunc extends IConsoleGroup {
  innerGroups?: IConsoleGroup[]
}

/**
 * Class [ConsoleEasterEggs]
 * 
 * The «Console Easter Eggs» interactions with users!
 * ~~~
*/
export default class ConsoleEasterEggs {
  private static readonly _uiColors = {
    primary: 'rgb(16, 6, 24)',
    secondary: 'rgb(192, 163, 250)',
  }

  private readonly _defTextShadow = [
    `1px 1px 0 ${ConsoleEasterEggs._uiColors.primary}`,
    `1px -1px 0 ${ConsoleEasterEggs._uiColors.primary}`,
    `-1px -1px 0 ${ConsoleEasterEggs._uiColors.primary}`,
    `-1px 1px 0 ${ConsoleEasterEggs._uiColors.primary}`,
  ]

  private readonly _titleStylesMap = new Map([
    ['font-size', '24px'],
    ['text-shadow', `${this._defTextShadow.join(',')}`],
    ['color', `${ConsoleEasterEggs._uiColors.secondary}`],
  ])

  private readonly _contentStylesMap = new Map([
    ['font-size', '18px'],
    ['text-shadow', `${this._defTextShadow.join(',')}`],
    ['color', `${ConsoleEasterEggs._uiColors.secondary}`],
  ])

  private _titleStyles: string
  private _contentStyles: string

  constructor() {
    this._titleStyles = this._getStylesStringFromMap(this._titleStylesMap)
    this._contentStyles = this._getStylesStringFromMap(this._contentStylesMap)

    this._createConsoleGroup({
      title: [
        '%cGotcha! You find the «Console Easter Eggs»!',
        this._titleStyles,
      ],
      content: [
        '%cSince you\'ve already come in, check this out!',
        this._contentStyles,
      ],
      innerGroups: [
        // ### Actual versions
        {
          title: [
            '%cActual «Intro\'s» versions:',
            this._contentStyles,
          ],
          content: [
            '%c%s%c%s',
            this._contentStyles,
            'Vanilla version:',
            this._contentStyles,
            '\n--> https://github.com/ZomboBombo/intro',
          ],
        },

        // ### Upcoming versions
        {
          title: [
            '%cUpcoming «Intro\'s» versions:',
            this._contentStyles,
          ],
          content: [
            '%c%s%c%s%c%s',
            this._contentStyles,
            '\n--> Vue',
            this._contentStyles,
            '\n--> React',
            this._contentStyles,
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
    return Array.from(stylesMap).map(
      ([mKey, mVal]) => `${mKey}: ${mVal};`
    ).join(' ')
  }

  /**
   * Private method: [_createConsoleGroup()].
   * 
   * Main logic of 'console.group()' with inner log-content creation.
   * ~~~
   * @param {ICreateConsoleGroupFunc} props
   * @returns {void}
  */
  private _createConsoleGroup({ title, content, innerGroups }: ICreateConsoleGroupFunc): void {
    console.group(...title)
    console.log(...content)
    if (innerGroups) {
      for (const group of innerGroups) {
        this._createConsoleGroup(group)
      }
    }
    console.groupEnd()
  }
}
