import path from 'path';

const SHORTHAND = 'MM';
const PROJECT_NAME = 'MyFavouritSites';

export default (dev = false) => ({
    node: {
        __filename: true
    },
    entry: {
        'main.bundle': [
            path.resolve('src/index')
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        path: `//tappqa/Training/2019/${SHORTHAND}/${PROJECT_NAME}`,
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            use: [{
                loader: 'style-loader',
                options: {
                    sourceMap: true
                }
            },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        minimize: !dev
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }]
    }
});
