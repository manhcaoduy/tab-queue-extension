module.exports = {
    entry: {
        background: './src/index.js',
        popup: './src/popup/index.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
    },
};