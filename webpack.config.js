module.exports = {
    entry: {
        popup: './src/popup/index.js',
        background: './src/background/background.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
    },
};
