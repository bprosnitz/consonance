jakeutils = require('jake-utils');
desc("Concatenates all source files into library");
directory('target');
task('default', ['target'], function(){
    directory('target');
    var result = concat({
        src: [
            './src/header.js',
            './src/list.js',
            './src/scale.js',
            './src/note.js',
            './src/tuning.js',
            './src/interval.js',
            './src/chord.js',
            './src/consonance.js'
        ],
        dest: './target/consonance.js',
        header: '// Copyright Benjamin Prosnitz',
        separator: '\n'
    });
});