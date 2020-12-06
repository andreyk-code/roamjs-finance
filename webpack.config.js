const fs = require("fs");
const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

const components = fs.readdirSync("./src/components/");
const entry = Object.fromEntries(
    components.map((e) => [e.substring(0, e.length - 3), `./src/components/${e}`])
);

module.exports = {
    mode: 'production',
    entry,
    resolve: {
        modules: ['node_modules'],
        extensions: [".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].js",
    },
    // optimization: {
    //     minimize: true,
    //     minimizer: [new TerserPlugin()],
    // },
    module: {
        rules: [
            { 
                test: /\.ts?$/, 
                use: [ 
                    {
                        loader: "ts-loader",  
                        options: {
                            compilerOptions: {
                            noEmit: false,
                            },
                        },
                    }
                ],
                exclude: /node_modules/, 
            },
        ]
    }
};
