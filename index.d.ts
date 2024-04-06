/**
 * Generates a unique identifier using cryptographic random UUID.
 * @returns {string} A unique identifier.
 */
export declare const createId: () => string;
/**
 * Expands spread expressions in a string to their repeated values.
 * @param {string} value - The string containing spread expressions.
 * @returns {string} The string with spread expressions expanded.
 */
export declare function expandSpreadExpressions(value: string): string;
/**
 * Parses numeric values from a string using specified parsing strategy.
 * @param {string} value - The string containing numeric values.
 * @param {number[]} fallback - The fallback array if no numeric values are found.
 * @returns {number[]} An array of parsed numeric values.
 */
export declare function parseNumbers(value: string | null, fallback?: number[]): number[];
/**
 * Interface representing a numeric value with index information.
 * @interface
 */
export interface IValueWithIndex {
    start: number;
    end: number;
    value: number;
    unit?: string | null | undefined;
}
/**
 * Enumeration for specifying numeric parsing strategies.
 * @enum {number}
 */
export declare enum NumberParseStrategies {
    Int = 0,
    Float = 1
}
/**
 * Extracts numeric values from a string based on the specified parsing strategy.
 * @param {string} value - The string containing numeric values.
 * @param {NumberParseStrategies} strategy - The parsing strategy to use.
 * @returns {IValueWithIndex[]} An array of objects containing numeric values and their indices.
 */
export declare function parseNumericValues(value: string, strategy?: NumberParseStrategies): IValueWithIndex[];
