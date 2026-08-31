module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy({ "src/img/pioneer-certifying-icons.png": "img/pioneer-certifying-icons.png" });
    eleventyConfig.addPassthroughCopy({ "src/img/pioneer-works-rinnai.jpg": "img/pioneer-works-rinnai.jpg" });
    eleventyConfig.addPassthroughCopy({ "src/img/pioneer-areas.jpg": "img/pioneer-areas.jpg" });
    eleventyConfig.addPassthroughCopy({ "src/img/pioneer-who-we-are.jpg": "img/pioneer-who-we-are.jpg" });
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
