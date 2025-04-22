/**
 * 'Custom-Stack-Svg-Plugin'
 * ~~~
 * 
 * Custom plugin for the 'Vite.js': used to
 * create 'Stack' SVG-sprite from project icons.
 * ~~~
 * 
 * © Copyright: Sergey Novikov.
 * All rights reserved. 2025.
 * 
*/

import { Plugin } from 'vite'
import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import fastGlob from 'fast-glob'

interface IStackSvgProps {
  pathToSpriteIcns: string
  output: string
}

/**
 * [generateStackSvg]
 * 
 * @interface {IStackSvgProps} {IStackSvgProps}: The main props-object
 * @param {string} IStackSvgProps.pathToSpriteIcns: The path to SVG-icons
 * @param {string} IStackSvgProps.output: The output directory
 * @returns {Promise<void>}
*/
async function generateStackSvg({ pathToSpriteIcns, output }: IStackSvgProps): Promise<void> {
  const files: string[] = await fastGlob(`${pathToSpriteIcns}*.svg`)

  if (!files.length) {
    throw `
      =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
      |
      | ❌ Wrong path to icons: ${pathToSpriteIcns}
      | Please, try to change the current path!
      |
      =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
    `
  }

  let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg">\n<style> :root svg:not(:target) { display: none } </style>\n'

  for (const file of files) {
    const svgContent: string = await readFile(file, 'utf-8')
    const fileName: string = path.basename(file, '.svg')

    // Remove unnecessary and redundant XML-code from <svg>
    const cleanedSvg: string = svgContent
      .replace(/<!DOCTYPE.*?>/g, '')
      .replace(/(xml|xmlns)=(["'])(.+?)\2/g, '')
      .replace(/version=(["'])(.+?)\1/g, '')
      .replace(/<svg/, `<svg id="${fileName}"`)

    spriteContent += `${cleanedSvg}`
  }

  spriteContent += '</svg>'

  await writeFile(output, spriteContent, 'utf-8')
}

export default function customStackSvgPlugin({ pathToSpriteIcns, output }: IStackSvgProps): Plugin {
  return {
    name: 'stack-svg-plugin',
    buildStart: async () => {
      try {
        await generateStackSvg({ pathToSpriteIcns, output })
      } catch (catchedErr) {
        throw new Error(`
          =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
          ❌ Error occured inside 'stack-svg-plugin'.

          ${catchedErr}
          =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
        `)
      }

      console.log(`
        =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
        |
        | ✅ Stack-SVG-Sprite was successfully updated!
        | Generated file: ${output}
        |
        =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
      `)
    }
  }
}
