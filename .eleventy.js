module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("fav.ico");
    eleventyConfig.addNunjucksGlobal("currentYear", () =>
        new Date().getFullYear()
    );

    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
