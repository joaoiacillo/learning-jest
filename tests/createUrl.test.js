import { createUrl } from "../src/createUrl";

describe("Create URL function", () => {
    it("should return a google index page URL in string format.", () => {
        const input = {
            protocol: "https://",
            domain: "www.google.com",
            path: "index.html",
        };

        const output = "https://www.google.com/index.html";

        expect(createUrl(input, "string")).toEqual(output);
    });

    it("should throw an error for invalid url objects.", () => {
        const output = new Error("An invalid URL object was provided.");

        expect(() => createUrl(null, "string")).toThrow(output);
        expect(() => createUrl(undefined, "string")).toThrow(output);
        expect(() => createUrl("string")).toThrow(output);
        expect(() => createUrl(123, "string")).toThrow(output);
        expect(() => createUrl([], "string")).toThrow(output);
    });

    it("should return a google index page URL as an URL object.", () => {
        const input = {
            protocol: "https://",
            domain: "www.google.com",
            path: "index.html",
        };

        const output = new URL("index.html", "https://www.google.com");

        expect(createUrl(input, "URL")).toEqual(output);
        expect(createUrl(input)).toEqual(output);
    });

    it("should throw an error for invalid return types.", () => {
        const input = {
            protocol: "https://",
            domain: "www.google.com",
            path: "index.html",
        };

        const output = new Error("An invalid return type was provided.");

        expect(() => createUrl(input, "INVALID")).toThrow(output);
        expect(() => createUrl(input, String)).toThrow(output);
        expect(() => createUrl(input, URL)).toThrow(output);
        expect(() => createUrl(input, null)).toThrow(output);
    });

    it("should return an URL with the correct parameters in order.", () => {
        const input = {
            protocol: "https://",
            domain: "www.ficticious.net",
            path: "some-path",
            params: {
                q: "someQueryValue",
                page: 10,
            },
        };

        const output =
            "https://www.ficticious.net/some-path?q=someQueryValue&page=10";

        expect(createUrl(input, "string")).toEqual(output);
    });

    it("should throw an error for invalid protocols", () => {
        const output = "An invalid protocol was passed.";

        expect(() =>
            createUrl(
                {
                    protocol: "https//",
                    domain: "www.ficticious.net",
                },
                "string"
            )
        ).toThrow(output);

        expect(() =>
            createUrl(
                {
                    protocol: "https:/",
                    domain: "www.ficticious.net",
                },
                "string"
            )
        ).toThrow(output);

        expect(() =>
            createUrl(
                {
                    protocol: ":htps//",
                    domain: "www.ficticious.net",
                },
                "string"
            )
        ).toThrow(output);

        expect(() =>
            createUrl(
                {
                    protocol: "banana",
                    domain: "www.ficticious.net",
                },
                "string"
            )
        ).toThrow(output);
    });

    it("should return an url with HTTPS protocol implicitly added.", () => {
        const input = {
            domain: "www.google.com",
            path: "index.html",
        };

        const output = "https://www.google.com/index.html";

        expect(createUrl(input, "string")).toEqual(output);
    });

    it("should throw an error for invalid domain names", () => {
        const output = new Error("An invalid domain was provided.");

        expect(() =>
            createUrl({ domain: "invaliddomain" }, "string")
        ).toThrow();

        expect(() => createUrl({ domain: undefined }, "string")).toThrow(
            output
        );
        expect(() => createUrl({ domain: null }, "string")).toThrow(output);
        expect(() => createUrl({ domain: 123 }, "string")).toThrow(output);
        expect(() => createUrl({ domain: true }, "string")).toThrow(output);
        expect(() => createUrl({ domain() {} }, "string")).toThrow(output);
        expect(() => createUrl({ domain: {} }, "string")).toThrow(output);
        expect(() => createUrl({ domain: [] }, "string")).toThrow(output);
    });

    it("should throw an error for invalid path names", () => {
        const output = new Error("An invalid path was provided.");

        expect(() =>
            createUrl({ domain: "www.google.com", path: null }, "string")
        ).toThrow(output);

        expect(() =>
            createUrl({ domain: "www.google.com", path: 123 }, "string")
        ).toThrow(output);

        expect(() =>
            createUrl({ domain: "www.google.com", path: true }, "string")
        ).toThrow(output);

        expect(() =>
            createUrl({ domain: "www.google.com", path() {} }, "string")
        ).toThrow(output);

        expect(() =>
            createUrl({ domain: "www.google.com", path: {} }, "string")
        ).toThrow(output);

        expect(() =>
            createUrl({ domain: "www.google.com", path: [] }, "string")
        ).toThrow(output);
    });

    it("should throw an error for invalid parameter values", () => {
        const output = new Error("An invalid parameter value was provided.");

        expect(() =>
            createUrl(
                {
                    domain: "www.google.com",
                    params: {
                        q: undefined,
                    },
                },
                "string"
            )
        ).toThrow(output);

        expect(() =>
            createUrl(
                {
                    domain: "www.google.com",
                    params: {
                        q: null,
                    },
                },
                "string"
            )
        ).toThrow(output);

        expect(() =>
            createUrl(
                {
                    domain: "www.google.com",
                    params: {
                        q: [],
                    },
                },
                "string"
            )
        ).toThrow(output);

        expect(() =>
            createUrl(
                {
                    domain: "www.google.com",
                    params: {
                        q: {},
                    },
                },
                "string"
            )
        ).toThrow(output);

        expect(() =>
            createUrl(
                {
                    domain: "www.google.com",
                    params: {
                        q() {},
                    },
                },
                "string"
            )
        ).toThrow(output);
    });
});
