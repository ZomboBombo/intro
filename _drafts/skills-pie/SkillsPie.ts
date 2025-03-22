/**
 * [__DRAFT__]
 *
 * Module full commented as draft.
 *
*/

// import { generateRandomHexColor } from '../utils/helpers'

// interface ISkillsPieOptionData {
//   name: string
//   value: number
//   color?: string
// }

// interface ISkillsPieOptions {
//   data: ISkillsPieOptionData[]
//   colors?: string[]
// }

// interface ISkillPieSliceConfig {
//   context: CanvasRenderingContext2D
//   centerX: number
//   centerY: number
//   radius: number
//   startAngle: number
//   endAngle: number
//   sliceAngle: number
//   color?: string
//   text?: string
// }

// /**
//  * Class [SkillsPie]
//  * ~~~
//  * 
//  * Used for 'Skills-Pie' logic initializtion.
//  * 'Skills-Pie' – it's <canvas> with 'skills'.
//  * ~~~~
//  * 
//  * Constructor params has {HTMLCanvasElement} as entry <canvas>,
//  * and {ISkillsPieOptions} as options required options.
//  * 
//  * @param {HTMLCanvasElement} skillsPieCanvas
//  * @param {ISkillsPieOptions} options
// */
// export default class SkillsPie {
//   private _canvas: HTMLCanvasElement
//   private _options: ISkillsPieOptions
//   private _randomHexColorsSet: Set<string>

//   constructor(skillsPieCanvas: HTMLCanvasElement, options: ISkillsPieOptions) {
//     this._canvas = skillsPieCanvas

//     if (!this._canvas) {
//       return
//     }

//     this._options = options
//     this._randomHexColorsSet = this._generateRandomHexColorsSet()
//   }

//   public init(): void {
//     const context: CanvasRenderingContext2D = this._canvas.getContext('2d')!
//     const radius: number = Math.min(this._canvas.width / 2, this._canvas.height / 2)
//     const centerX: number = this._canvas.width / 2
//     const centerY: number = this._canvas.height / 2
//     const { data } = this._options

//     const totalValue: number = data.map((_entry) => _entry.value).reduce((val, acc) => val + acc)!
//     let startAngle = 0

//     data.forEach((_entry, _index) => {
//       const {
//         name,
//         value,
//         color = Array.from(this._randomHexColorsSet)[_index]
//       } = _entry

//       const sliceAngle: number = 2 * Math.PI * value / totalValue
//       const endAngle: number = startAngle + sliceAngle

//       this._drawSkillsPieSlice({
//         context,
//         centerX,
//         centerY,
//         radius,
//         startAngle,
//         endAngle,
//         sliceAngle,
//         color,
//         text: name,
//       })

//       startAngle += sliceAngle
//     })
//   }

//   private _generateRandomHexColorsSet(): Set<string> {
//     const { data } = this._options
//     const randomHexColorsSet: Set<string> = new Set()

//     while (randomHexColorsSet.size < data.length) {
//       randomHexColorsSet.add(generateRandomHexColor())
//     }

//     return randomHexColorsSet
//   }

//   private _drawSkillsPieSlice(skillPieSliceConfig: ISkillPieSliceConfig): void {
//     const {
//       context,
//       centerX,
//       centerY,
//       radius,
//       startAngle,
//       endAngle,
//       sliceAngle,
//       color = 'black',
//       text = 'slice-name'
//     } = skillPieSliceConfig

//     const textX: number = centerX + (radius / 2) * Math.cos(startAngle + sliceAngle / 2)
//     const textY: number = centerY + (radius / 2) * Math.sin(startAngle + sliceAngle / 2)

//     context.fillStyle = color
//     context.beginPath()
//     context.moveTo(centerX, centerY)
//     context.arc(centerX, centerY, radius, startAngle, endAngle)
//     context.closePath()
//     context.fill()
//     context.font = '36px monospace'
//     context.fillStyle = 'black'
//     context.fillText(text, textX, textY)
//   }
// }
