module.exports = function(name){
    name = name || require("./package.json").name;
    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    var ExtractCSS = new ExtractTextPlugin(name+".css");
    var ExtractLESS = new ExtractTextPlugin(name+".less");

    var entry = [
        'var tag = require("./bonaparte.js");',
        '((typeof tag === "object" || typeof tag === "function") && typeof tag.register === "function") && tag.register();',
        'require("./bonaparte.less");'
    ].join("\n");

    return {
        entry: [
            'optional?./bonaparte.build.js!parse?'+entry+'!'     
        ],
        output: {
            path: "./dist",
            filename: name+".js"
        },
        module: {
            preLoaders : [
                {
                    test: /.*/,
                    loader : "include-loader"
                }
            ],
            loaders: [
                // Extract css files
                {
                    test: /\.css$/,
                    loader: ExtractCSS.extract("css-loader!autoprefixer-loader")
                },
                // Optionally extract less files
                // or any other compile-to-css language
                // {
                //     test: /\.less$/,
                //     loader: "raw-loader"
                // }           
                // Optionally extract less files
                // or any other compile-to-css language
                {
                    test: /\.less$/,
                    loader: ExtractCSS.extract("css-loader!autoprefixer-loader!less-loader")
                }
                // {
                //     test: /\.less$/,
                //     loader: "css-loader!autoprefixer-loader!less-loader"
                // }            
                // Optionally extract less files
                // or any other compile-to-css language
                // {
                //     test: /\.less$/,
                //     loader: ExtractLESS.extract("raw-loader")
                // }
                // You could also use other loaders the same way. I. e. the autoprefixer-loader
            ]
        },
        // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
        plugins: [
           ExtractCSS,
        ]
    }
}