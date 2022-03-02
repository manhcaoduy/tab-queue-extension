module.exports = {
    entry: {
        popup: './src/popup/index.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
    },
};
