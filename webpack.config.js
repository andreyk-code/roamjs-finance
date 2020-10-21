const fs = require("fs");
const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

const components = fs.readdirSync("./components/");
const entry = Object.fromEntries(
    components.map((e) => [e, `./components/${e}/${e}.js`])
);

module.exports = {
    mode: 'production',
    entry,
    resolve: {
        extensions: [".js"],
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js",
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};
