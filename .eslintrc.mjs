export default {
    extends: [
        // ...
        "plugin:astro/recommended",
    ],
    overrides: [
        {
            files: ["*.astro"],
            // Allows Astro components to be parsed.
            parser: "astro-eslint-parser",
        },
    ]
}