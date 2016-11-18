module.exports = {
    entry: "./main",                         //main entry point for application. which file bootstrap the application, dont need to specify file extension here
    output: { filename: "app.js" },         // webpack transpile a file app.js in root.                         
    module: {
        loaders: [                          //loaders are tool that can look at different file type and process the file and give webpack output to bundle in single app.js file
            {
                test: /.ts$/,               // for any file ending with ".ts" use "ts-loader" loader
                loader: "ts-loader"
            }
        ]
    },
    resolve:{                               //how webpack should resolve modules
        extensions: ["",".ts",".js"]
    }
}