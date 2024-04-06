/**
 * Generates a unique identifier using cryptographic random UUID.
 * @returns {string} A unique identifier.
 */
export const createId = () => `${crypto.randomUUID().replaceAll("-", "")}`

/**
 * Expands spread expressions in a string to their repeated values.
 * @param {string} value - The string containing spread expressions.
 * @returns {string} The string with spread expressions expanded.
 */
export function expandSpreadExpressions(value: string): string {
    // Regular expression to match spread expressions like "2..5" to expand.
    const regex = new RegExp("(\\d+)\\.{2,8}(\\d+)", "g")

    let match: RegExpExecArray | null

    // Loop through all matches of the spread expressions.
    while ((match = regex.exec(value)) !== null) {
        // Destructure the match to extract number and length strings.
        const [matchString, numberString, lengthString] = match
        // Parse number and length from strings.
        const number = parseInt(numberString)
        const length = parseInt(lengthString)

        // If either number or length is not a valid integer, skip processing.
        if (isNaN(number) || isNaN(length)) continue

        // Generate a string with repeated number based on length.
        const repeatedNumberString = Array.from({ length: length }, () => number).join(" ")

        // Replace the spread expression with the repeated number string.
        value = value.replace(matchString, repeatedNumberString)
    }

    return value
}

/**
 * Parses numeric values from a string using specified parsing strategy.
 * @param {string} value - The string containing numeric values.
 * @param {number[]} fallback - The fallback array if no numeric values are found.
 * @returns {number[]} An array of parsed numeric values.
 */
export function parseNumbers(value: string|null, fallback: number[] = []): number[] {
    // If the value is empty or null, return the fallback array.
    if (value === null || value?.trim() === "") return fallback

    // Trim leading and trailing spaces from the value.
    value = value?.trim()

    // If the value contains spread expressions, expand them.
    if (value.includes("..")) value = expandSpreadExpressions(value)

    // Parse numeric values using specified strategy.
    const result = parseNumericValues(value, NumberParseStrategies.Float).map(v => v.value)

    // If no numeric values were found, return the fallback array.
    return result.length > 0 ? result : fallback
}

/**
 * Interface representing a numeric value with index information.
 * @interface
 */
export interface IValueWithIndex {
    start: number
    end: number
    value: number
    unit?: string | null | undefined
}

/**
 * Enumeration for specifying numeric parsing strategies.
 * @enum {number}
 */
export enum NumberParseStrategies {
    Int,
    Float
}

/**
 * Extracts numeric values from a string based on the specified parsing strategy.
 * @param {string} value - The string containing numeric values.
 * @param {NumberParseStrategies} strategy - The parsing strategy to use.
 * @returns {IValueWithIndex[]} An array of objects containing numeric values and their indices.
 */
export function parseNumericValues(value: string, strategy: NumberParseStrategies = NumberParseStrategies.Int): IValueWithIndex[] {
    // Regular expression based on the parsing strategy.
    const regExp: RegExp = strategy === NumberParseStrategies.Int
        ? new RegExp(`(-?\\d+)`, "g")
        : new RegExp(`(-?\\d{1,16}(?:\\.?\\d{1,8})?)`, "g")

    let match: RegExpExecArray | null

    const result: IValueWithIndex[] = []

    // Iterate through the matches of the regular expression in the string.
    while ((match = regExp.exec(value)) !== null) {
        // Destructure the match to extract the numeric string.
        const [, numberString] = match

        // Parse the number based on the parsing strategy.
        const number = strategy === NumberParseStrategies.Int ? parseInt(numberString) : parseFloat(numberString)

        // Push the numeric value with its index information into the result array.
        result.push({
            start: match.index,
            end: match.index + number.toString().length,
            value: number
        })
    }

    return result
}
