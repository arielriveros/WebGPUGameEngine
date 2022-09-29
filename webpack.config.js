/* const path = require('path');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//const { webpack } = require('webpack');

module.exports = {
    entry: './src/main',
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, './build'),
        publicPath: 'public/build/'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: ['/node_modules/'] },
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ],
    //mode: 'development'
    plugins: [
            new webpack.optimize.UglifyJsPlugin({
                comments: false
                })
            ] 
    }
} */

const path = require('path');
//const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,      // if file is a typescript file
                use: 'ts-loader',   // then load it with ts-loader
                include: [ path.resolve(__dirname, 'src') ]
            },
            {
                test: /\.js$/,           // if file is a javascript file
                use: '/node_modules/',   // then load it with node_modules
                include: [ path.resolve(__dirname, 'src') ]
            },
            {
                test: /\.(wgsl|glsl|vs|fs)$/,  // if file is shading language file
                use: 'ts-shader-loader',         // then load it ts shader loader
                include: [ path.resolve(__dirname, 'src/renderer/shaders') ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        /* alias: {
            math: path.resolve(__dirname, 'src/core/math/math.ts'),
            core: path.resolve(__dirname, 'src/core/core.ts'),
            utils: path.resolve(__dirname, 'src/core/utilities/utils.ts'),
        } */
    },
    output: {
        publicPath: 'auto',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    mode: 'development',
    /* plugins: [
        new CopyWebpackPlugin({patterns: [
            { from: 'src/core/rendering/shaders/sources', to: 'shaders' },
            { from: 'src/game/assets', to: 'assets' }
        ]})
    ] */
}