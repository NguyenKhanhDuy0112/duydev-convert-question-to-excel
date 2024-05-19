const path = require("path")
const webpack = require("webpack")

module.exports = {
    entry: "./src/index.tsx", // Your application's entry point
    output: {
        filename: "main.bundle.js",
        path: path.resolve(__dirname, "dist"), // Output directory for bundled files
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Rule for JavaScript and JSX files
                exclude: /node_modules/, // Exclude node_modules folder
                use: {
                    loader: "babel-loader", // Use Babel loader to transpile modern JavaScript
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"], // Babel presets
                    },
                },
            },
            {
                test: /\.css$/, // Rule for CSS files
                use: ["style-loader", "css-loader"], // Use style-loader and css-loader for CSS processing
            },
            // Add other rules for images, fonts, etc. as needed
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.REACT_APP_API_BO_ENDPOINT": JSON.stringify(process.env.REACT_APP_API_BO_ENDPOINT),
            "process.env.NODE_ENV": JSON.stringify("production"), // Example for setting NODE_ENV
        }),
    ],
}
