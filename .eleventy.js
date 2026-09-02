const path = require("path");
const eleventyImg = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("fav.ico");
    eleventyConfig.addPassthroughCopy("llms.txt");
    eleventyConfig.addPassthroughCopy("src/img/icon-ig.svg");
    eleventyConfig.addNunjucksGlobal("currentYear", () =>
        new Date().getFullYear()
    );
    eleventyConfig.addFilter("isoDate", (date) => {
        return new Date(date).toISOString().split("T")[0];
    });
    eleventyConfig.addFilter("json", (value) => {
        return JSON.stringify(value);
    });
    eleventyConfig.addFilter("replace", (str, find, replace) => {
        return str.split(find).join(replace);
    });

    async function imageShortcode(src, alt, widths, sizes, classes, eager) {
        // Resolve path relative to project root
        let inputPath = src;
        if (src.startsWith("/src/")) {
            inputPath = path.join(".", src);
        } else if (src.startsWith("/img/")) {
            inputPath = path.join(".", "src", src);
        } else if (src.startsWith("/")) {
            inputPath = path.join(".", "src", src);
        } else if (!src.startsWith("src/") && !src.startsWith("./")) {
            inputPath = path.join(".", "src", "img", src);
        }

        let metadata = await eleventyImg.default(inputPath, {
            widths: widths || [400, 800, 1280],
            formats: ["avif", "webp", "jpeg"],
            sharpOptions: {
                avif: { quality: 55 },
                webp: { quality: 70 },
                jpeg: { quality: 70 }
            },
            outputDir: "_site/img",
            urlPath: "/img"
        });
        let imageAttributes = {
            alt,
            sizes: sizes || "(min-width: 1280px) 1280px, (min-width: 800px) 800px, 400px",
            loading: eager ? "eager" : "lazy",
            decoding: "async"
        };
        if (eager) imageAttributes.fetchpriority = "high";
        let html = eleventyImg.generateHTML(metadata, imageAttributes);
        if (classes) {
            html = html.replace('<picture>', `<picture class="${classes}">`);
        }
        return html;
    }

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
