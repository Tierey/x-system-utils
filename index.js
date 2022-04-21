let start

const t2   = require("through2").obj;
const path = require(`path`);
const gulp = require('gulp');
const argv = require('yargs').argv

const lazy =  ({$gulp}) => ( relative, options = {} ) => {

    let tn = path.basename(relative, ".js");
    
    options.taskName = tn;
    options.argv     = argv;

    gulp.task( tn,
        cb => {
            let task = require(`${$gulp}/${relative}.js`).call(this, options)
            return task(cb);
        }
    )
    
    return tn;

};

const none = function (callback)
{
    return t2((f,e,c)=>{
        callback();
        c(null,f)
    });
}
module.exports = {
    none,lazy
}