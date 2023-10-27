/**
 * @typedef {{id: number, url: string}} URLObject
 */

/**
 * @param {URLObject[]} array 
 * @param {string} searchTerm 
 * @param {boolean} [failOnEmpty = false] - Whether an error must be thrown or not if the [searchTerm] is empty.
 */
export function filterByTerm(array, searchTerm, failOnEmpty = false) {
    if (!Array.isArray(array)) throw new Error("Non-array input");
    if (!array.length) throw new Error("Empty array input");
    if (failOnEmpty && searchTerm.trim() === "") throw new Error("Empty search term");
    if (typeof searchTerm !== "string") throw new Error("Non-string search term");
    const regexp = new RegExp(searchTerm, "i");
    return array.filter((obj) => {
        return regexp.test(obj.url);
    });
}
