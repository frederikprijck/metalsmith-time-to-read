const match = require('multimatch');

const defaults = {
    wordsPerMinute: 180
};

function calculateTime(contents, wordsPerMinute) {
    const numberOfWords = contents.split(' ').length;
    return Math.floor(numberOfWords / wordsPerMinute);
}

module.exports = (options) => {
    return (files, metalsmith, done) => {
        setImmediate(done);
        
        match(Object.keys(files), options.files)
            .forEach((path) => {
                const file = files[path];
                const contents = file.contents.toString('utf8');
                const minutes = calculateTime(contents, options.wordsPerMinute || defaults.wordsPerMinute);
                const label = minutes > 1 ? 'minutes' : 'minute';

                file.timeToRead = minutes === 0 ? 
                    'less than one minute' : 
                    `${minutes} ${label}`;
            });
    };
}
