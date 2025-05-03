/* eslint-disable no-unused-vars */

/**
 * When 'null' can be returned:
 * @type {null}
*/
export type NullishString = string | null
export type NullishHTMLElem = HTMLElement | null
export type NullishButton = HTMLButtonElement | null
export type NullishHTMLElemOrButton = HTMLElement | HTMLButtonElement | null

/**
 * When 'undefined' can be returned:
 * @type {undefined}
*/
export type UndefinedishString = string | undefined
export type UndefinedishHTMLElem = HTMLElement | undefined
export type UndefinedishButton = HTMLButtonElement | undefined
export type UndefinedishHTMLElemOrButton = HTMLElement | HTMLButtonElement | undefined

/**
 * When 'null | undefined' can be returned:
 * @type {null | undefined}
*/
export type UndefNullishString = string | undefined | null
export type UndefNullishHTMLElem = HTMLElement | undefined | null
export type UndefNullishButton = HTMLButtonElement | undefined | null
export type UndefNullishHTMLElemOrButton = HTMLElement | HTMLButtonElement | undefined | null
