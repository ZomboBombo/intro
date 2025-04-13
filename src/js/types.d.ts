/* eslint-disable no-unused-vars */

/**
 * When 'null' can be returned:
 * @type {null}
*/
export type NullishString = string | null
export type NullishHTMLElem = HTMLElement | null
export type NullishButton = HTMLButtonElement | HTMLElement | null

/**
 * When 'undefined' can be returned:
 * @type {undefined}
*/
export type UndefinedishString = string | undefined
export type UndefinedishHTMLElem = HTMLElement | undefined
export type UndefinedishButton = HTMLButtonElement | HTMLElement | undefined

/**
 * When 'null | undefined' can be returned:
 * @type {null | undefined}
*/
export type UndefNullishString = string | null | undefined
export type UndefNullishHTMLElem = HTMLElement | null | undefined
export type UndefNullishButton = HTMLButtonElement | HTMLElement | null | undefined
