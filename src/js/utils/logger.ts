/* eslint-disable no-console */
interface ILoggerProps {
  title?: string
  data: any
}

/**
 * @function logger()
 * @description Simplifies logging during the dev-process.
 * ~~~
 * 
 * @param {string} ILoggerProps.title
 * @param {any} ILoggerProps.data
 * @returns {void}
*/
export default function logger({ title = 'Logger Title', data }: ILoggerProps): void {
  console.group(`=== ${title} ===`)
  console.log({
    ...data
  })
  console.groupEnd()
}
