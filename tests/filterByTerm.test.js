describe("Filter function", () => {
    it("should filter by a search term (url)", () => {
        const input = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" },
            { id: 3, url: "https://www.link3.dev" }
        ];

        const output = [{ id: 3, url: "https://www.link3.dev" }];

        expect(filterByTerm(input, "link")).toEqual(output);
    });
});
