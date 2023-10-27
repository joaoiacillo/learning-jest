import { filterByTerm } from "../src/filterByTerm";

describe("Filter function", () => {
    const input = [
        { id: 1, url: "https://www.url1.dev" },
        { id: 2, url: "https://www.url2.dev" },
        { id: 3, url: "https://www.link3.dev" },
    ];

    it("should filter by the search term 'link'", () => {
        const output = [{ id: 3, url: "https://www.link3.dev" }];

        expect(filterByTerm(input, "link")).toEqual(output);
        expect(filterByTerm(input, "LINK")).toEqual(output);
    });

    it("should filter by the search term 'url'", () => {
        const output = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" },
        ];

        expect(filterByTerm(input, "url")).toEqual(output);
        expect(filterByTerm(input, "uRL")).toEqual(output);
    });

    it("should return an empty array for unknown search terms", () => {
        const output = [];

        expect(filterByTerm(input, "pizza")).toEqual(output);
        expect(filterByTerm(input, "banana")).toEqual(output);
        expect(filterByTerm(input, "MOzARt")).toEqual(output);
        expect(filterByTerm(input, "linkedin")).toEqual(output);
        expect(filterByTerm(input, "ur_straight_l")).toEqual(output);
    });

    it("should return the input for an empty search term", () => {
        const output = input;

        expect(filterByTerm(input, "")).toEqual(output);
    });

    it("should throw an error for an empty search term", () => {
        const output = new Error("Empty search term");

        expect(() => filterByTerm(input, "", true)).toThrow(output);
    });

    it("should throw an error for non-string search terms", () => {
        const output = new Error("Non-string search term");

        expect(() => filterByTerm(input, 123)).toThrow(output);
        expect(() => filterByTerm(input, null)).toThrow(output);
        expect(() => filterByTerm(input)).toThrow(output);
        expect(() => filterByTerm(input, { search: "url" })).toThrow(output);
        expect(() => filterByTerm(input, () => {})).toThrow(output);
    });

    it("should throw an error for non-array inputs", () => {
        const output = new Error("Non-array input");

        expect(() => filterByTerm(null, "url")).toThrow(output);
        expect(() => filterByTerm(undefined, "url")).toThrow(output);
        expect(() => filterByTerm("url")).toThrow(output);
        expect(() => filterByTerm(() => {}, "url")).toThrow(output);
        expect(() => filterByTerm({ values: input }, "url")).toThrow(output);
    });

    it("should throw an error for empty array input", () => {
        const output = new Error("Empty array input");

        expect(() => filterByTerm([], "url")).toThrow(output);
    });
});
