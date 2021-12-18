module.exports = {
    root: true,
    extends: "@react-native-community",
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
        "prettier/prettier": 0,
        indent: ["error", 4, {
            SwitchCase: 1,
            flatTernaryExpressions: true,
            FunctionDeclaration: {
                parameters: "first",
            },
            FunctionExpression: {
                parameters: "first",
            },
        }],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-trailing-spaces": 0,
        "react-hooks/exhaustive-deps": 0,
        "object-curly-spacing": ["error", "always"],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
    },
};
