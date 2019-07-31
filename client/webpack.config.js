const path = require('path');
const WebpackCleanPlugin = require('webpack-clean-plugin');


module.exports = {
    mode: "production",
    entry: {
        welcome: "./src/pages/welcome.tsx",
        login: "./src/pages/login.tsx",
        register: "./src/pages/register.tsx",
        playground: "./src/pages/playground.tsx",
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        modules: ['node_modules']
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    },
                ]
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        // For removing old files from dist/
        new WebpackCleanPlugin({
            on: "emit",
            path: [path.resolve(__dirname, 'dist')]
        }),
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-bootstrap": "ReactBootstrap"
    }
};