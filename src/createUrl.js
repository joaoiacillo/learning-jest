/**
 * @typedef {{ [param: string]: string | number | boolean }} URLObjectParams
 */

/**
 * @typedef {{ protocol?: string, domain: string, path?: string, params: URLObjectParams }} URLObject
 */

function validateUrlObjectStructure(object) {
    // The object must not be neither null nor undefined.
    if (object === null || object === undefined) {
        return false;
    }

    // Neither an array
    if (typeof object === "object" && Array.isArray(object)) {
        return false;
    }

    // Neither a string nor number
    if (typeof object === "string" || typeof object === "number") {
        return false;
    }

    // The structure is okay!
    return true;
}

function validateReturnType(returnType) {
    return ["string", "URL"].includes(returnType);
}

function validateDomain(domain) {
    return typeof domain === "string" && domain.match(/^([\w\.]*\w+\.[\w.])+/i);
}

function validatePath(path) {
    return ["string", "undefined"].includes(typeof path);
}

function validateParameterValue(value) {
    return ["string", "number", "boolean"].includes(typeof value);
}

/**
 * Creates a new URL object and returns the adequate value
 * based on the defined return type.
 *
 * If no protocol is defined in the URL object, then
 * `https://` is used by default.
 *
 * @param {URLObject} urlObject
 * @param {'string' | 'URL'} [returnType = 'URL']
 */
export function createUrl(urlObject, returnType) {
    // INVALID PARAMETER VALUE

    if (!validateUrlObjectStructure(urlObject)) {
        throw new Error("An invalid URL object was provided.");
    }

    if (returnType !== undefined) {
        if (!validateReturnType(returnType)) {
            throw new Error("An invalid return type was provided.");
        }
    } else returnType = "URL";

    const protocol = urlObject.protocol || "https://";

    if (!protocol.match(/^(\w*:\/\/)/i)) {
        throw new Error("An invalid protocol was passed.");
    }

    if (!validateDomain(urlObject.domain)) {
        throw new Error("An invalid domain was provided.");
    }

    if (!validatePath(urlObject.path)) {
        throw new Error("An invalid path was provided.");
    }

    const baseUrl = protocol + urlObject.domain;

    const url = new URL(baseUrl);
    if (typeof urlObject.path === "string") {
        url.pathname = urlObject.path;
    }

    if (typeof urlObject.params === "object") {
        Object.entries(urlObject.params).forEach(([param, value]) => {
            if (!validateParameterValue(value)) {
                throw new Error("An invalid parameter value was provided.");
            }
            url.searchParams.append(param, value);
        });
    }

    switch (returnType) {
        case "string":
            return url.toString();
        case "URL":
            return url;
    }
}
