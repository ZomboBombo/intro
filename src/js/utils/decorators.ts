/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
type TDecoratorReturn<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void

/**
 * @function debounce()
 * @description Decorator-func. Used to optimize function calls.
 * ~~~
 * 
 * @param {T extends (...args: any[]) => void} callee
 * @param {number} timeout
 * @returns {TDecoratorReturn}
*/
export function debounce<T extends (...args: any[]) => void>(
  callee: T,
  timeout: number
): TDecoratorReturn<T> {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => callee(...args), timeout)
  }
}


/**
 * @function throttle()
 * @description Used to reduce the number of calls to the frequently called function.
 * ~~~
 * 
 * @param {T extends (...args: any[]) => void} callee
 * @param {number} timeout
 * @returns {TDecoratorReturn}
*/
export function throttle<T extends (...args: any[]) => void>(
  callee: T,
  timeout: number
): TDecoratorReturn<T> {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timer) return

    timer = setTimeout(() => {
      callee(...args)
      timer = null
    }, timeout)
  }
}
