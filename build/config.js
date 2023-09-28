
const path = require('path')

exports.port = 1548
exports.alias = {
    main: path.resolve(__dirname, '../src'),
    packages: path.resolve(__dirname, '../packages'),
    examples: path.resolve(__dirname, '../examples'),
    // 'moto-ui': path.resolve(__dirname, '../')
}


exports.rules = [
    {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: /node_modules/
    },
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            compilerOptions: {
                preserveWhitespace: false
            }
        }
    }
]