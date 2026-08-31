module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("fav.ico");
    eleventyConfig.addPassthroughCopy("llms.txt");
    eleventyConfig.addNunjucksGlobal("currentYear", () =>
        new Date().getFullYear()
    );
    eleventyConfig.addFilter("isoDate", (date) => {
        return new Date(date).toISOString().split("T")[0];
    });
    eleventyConfig.addFilter("json", (value) => {
        return JSON.stringify(value);
    });

    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
