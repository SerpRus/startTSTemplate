const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const filePath = {
    src: {
        script: './assets/js/index.ts',
        style: './assets/scss/style.scss',
        icons: './assets/icons/icons.ts',
    },
    dist: path.resolve(__dirname, './dist/'),
};

function createJSModule() {
    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
    };
}

function createSCSSModule(isDev) {
    return {
        test: /\.scss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
        }, {
            loader: 'css-loader',
            options: {
                sourceMap: isDev,
                url: false,
            },
        }, {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        [
                            'postcss-preset-env',
                        ],
                    ],
                },
            },
        }, {
            loader: 'sass-loader',
            options: {
                sourceMap: isDev,
            },
        }],
    };
}

function createSVGIconsModule() {
    return {
        test: /\.svg$/,
        use: [{
            loader: 'svg-sprite-loader',
            options: {
                extract: true,
                spriteFilename: './images/icons/sprite.svg',
                symbolId: (fileSrc) => `icon-${path.basename(fileSrc).split('.')[0]}`,
            },
        }, {
            loader: 'svgo-loader',
        }],
    };
}

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';

    return {
        entry: [
            filePath.src.script,
            filePath.src.style,
            filePath.src.icons,
        ],
        devtool: 'inline-source-map',
        output: {
            filename: './js/index.js',
            path: filePath.dist,
            publicPath: (isDev) ? '/' : '',
            clean: true,
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 3001,
            watchFiles: ['*.*'],
            open: true,
            historyApiFallback: true,
        },
        module: {
            rules: [
                createJSModule(),
                createSCSSModule(isDev),
                createSVGIconsModule(),
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: './css/style.css',
            }),
            new SpriteLoaderPlugin({
                plainSprite: true,
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'assets/images', to: 'images' },
                    { from: 'assets/fonts', to: 'fonts' },
                ],
            }),
            new HtmlWebpackPlugin({
                template: 'index.html',
            }),
            new ESLintPlugin(),
        ],
    };
};
