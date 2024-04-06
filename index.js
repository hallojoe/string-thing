"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumericValues = exports.NumberParseStrategies = exports.parseNumbers = exports.expandSpreadExpressions = exports.createId = void 0;
/**
 * Generates a unique identifier using cryptographic random UUID.
 * @returns {string} A unique identifier.
 */
const createId = () => `${crypto.randomUUID().replaceAll("-", "")}`;
exports.createId = createId;
/**
 * Expands spread expressions in a string to their repeated values.
 * @param {string} value - The string containing spread expressions.
 * @returns {string} The string with spread expressions expanded.
 */
function expandSpreadExpressions(value) {
    // Regular expression to match spread expressions like "2..5" to expand.
    const regex = new RegExp("(\\d+)\\.{2,8}(\\d+)", "g");
    let match;
    // Loop through all matches of the spread expressions.
    while ((match = regex.exec(value)) !== null) {
        // Destructure the match to extract number and length strings.
        const [matchString, numberString, lengthString] = match;
        // Parse number and length from strings.
        const number = parseInt(numberString);
        const length = parseInt(lengthString);
        // If either number or length is not a valid integer, skip processing.
        if (isNaN(number) || isNaN(length))
            continue;
        // Generate a string with repeated number based on length.
        const repeatedNumberString = Array.from({ length: length }, () => number).join(" ");
        // Replace the spread expression with the repeated number string.
        value = value.replace(matchString, repeatedNumberString);
    }
    return value;
}
exports.expandSpreadExpressions = expandSpreadExpressions;
/**
 * Parses numeric values from a string using specified parsing strategy.
 * @param {string} value - The string containing numeric values.
 * @param {number[]} fallback - The fallback array if no numeric values are found.
 * @returns {number[]} An array of parsed numeric values.
 */
function parseNumbers(value, fallback = []) {
    // If the value is empty or null, return the fallback array.
    if (value === null || value?.trim() === "")
        return fallback;
    // Trim leading and trailing spaces from the value.
    value = value?.trim();
    // If the value contains spread expressions, expand them.
    if (value.includes(".."))
        value = expandSpreadExpressions(value);
    // Parse numeric values using specified strategy.
    const result = parseNumericValues(value, NumberParseStrategies.Float).map(v => v.value);
    // If no numeric values were found, return the fallback array.
    return result.length > 0 ? result : fallback;
}
exports.parseNumbers = parseNumbers;
/**
 * Enumeration for specifying numeric parsing strategies.
 * @enum {number}
 */
var NumberParseStrategies;
(function (NumberParseStrategies) {
    NumberParseStrategies[NumberParseStrategies["Int"] = 0] = "Int";
    NumberParseStrategies[NumberParseStrategies["Float"] = 1] = "Float";
})(NumberParseStrategies || (exports.NumberParseStrategies = NumberParseStrategies = {}));
/**
 * Extracts numeric values from a string based on the specified parsing strategy.
 * @param {string} value - The string containing numeric values.
 * @param {NumberParseStrategies} strategy - The parsing strategy to use.
 * @returns {IValueWithIndex[]} An array of objects containing numeric values and their indices.
 */
function parseNumericValues(value, strategy = NumberParseStrategies.Int) {
    // Regular expression based on the parsing strategy.
    const regExp = strategy === NumberParseStrategies.Int
        ? new RegExp(`(-?\\d+)`, "g")
        : new RegExp(`(-?\\d{1,16}(?:\\.?\\d{1,8})?)`, "g");
    let match;
    const result = [];
    // Iterate through the matches of the regular expression in the string.
    while ((match = regExp.exec(value)) !== null) {
        // Destructure the match to extract the numeric string.
        const [, numberString] = match;
        // Parse the number based on the parsing strategy.
        const number = strategy === NumberParseStrategies.Int ? parseInt(numberString) : parseFloat(numberString);
        // Push the numeric value with its index information into the result array.
        result.push({
            start: match.index,
            end: match.index + number.toString().length,
            value: number
        });
    }
    return result;
}
exports.parseNumericValues = parseNumericValues;
