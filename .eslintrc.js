module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
    ],
    plugins: [
        "@typescript-eslint",
        "import",
        "simple-import-sort",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: [
            "./tsconfig.json",
        ],
    },
    rules: {
        // eslint rules
        "max-len": [
            "error",
            240,
        ],
        quotes: [
            "error",
            "double",
        ],
        indent: [
            "error",
            2,
            {
                SwitchCase: 1,
            },
        ],
        semi: [
            "error",
            "always",
        ],
        "comma-dangle": [
            "error",
            "always-multiline",
        ],
        "array-bracket-spacing": [
            "error",
            "never",
        ],
        "object-curly-spacing": [
            "error",
            "always",
            {
                "objectsInObjects": false,
                "arraysInObjects": false,
            },
        ],
        "arrow-parens": [
            "error",
            "as-needed",
            {
                requireForBlockBody: true,
            },
        ],
        "comma-spacing": [
            "error",
            {
                before: false,
                after: true,
            },
        ],
        "eol-last": [
            "error",
            "always",
        ],
        "keyword-spacing": [
            "error",
            {
                before: true,
                after: true,
            },
        ],
        "space-infix-ops": [
            "error",
            {
                "int32Hint": false,
            },
        ],
        "space-before-blocks": "error",
        "key-spacing": "error",
        "no-var": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-empty": "warn",
        "no-console": "warn",
        "no-empty-pattern": "warn",
        "no-trailing-spaces": "error",
        "no-multi-spaces": "error",
        "no-unused-vars": "off",
        "no-const-assign": "error",
        // import sorting rules
        // cf: https://github.com/lydell/eslint-plugin-simple-import-sort
        "sort-imports": "off",
        "import/first": "error",
        "import/no-duplicates": "error",
        "import/newline-after-import": "error",
        "simple-import-sort/imports": [
            "error",
            {
                // grouped by groups
                // sorted by index inside group
                groups: [
                    // React packages
                    ["^react", "^react-native", "^@react", "^@react-native"],
                    // Anything not matched in another group
                    ["^"],
                    // Internal packages
                    ["^(@common|@plco|@plco-pro)"],
                    // Relative imports
                    ["^\\.\\.", "^\\."],
                    // Side effect imports
                    ["^\\u0000"],
                ],
            },
        ],
        "simple-import-sort/exports": "error",
        // tslint rules
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/interface-over-type-literal": "off",
        "@typescript-eslint/object-literal-sort-keys": "off",
        "@typescript-eslint/ordered-imports": "off",
        "@typescript-eslint/typedef-whitespace": "off",
        "@typescript-eslint/interface-name": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/no-empty-function": "warn",
        "@typescript-eslint/no-var-requires": "warn",
        "@typescript-eslint/ban-types": "warn",
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                multiline: {
                    delimiter: "semi",
                    requireLast: true,
                },
                singleline: {
                    delimiter: "semi",
                    requireLast: false,
                },
            },
        ],
    },
};