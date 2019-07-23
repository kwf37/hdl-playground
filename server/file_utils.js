const fs = require('fs')
const yaml = require('js-yaml')

// For removing files recursively
const rmdir = require('rimraf');

const base_dir = "./playground/";

let remove_all = function() {
    rmdir(base_dir, e => console.log(e));
}

exports.init_dir = function () {
    // Get document, or throw exception on error
    try {
        remove_all();
        fs.mkdirSync(base_dir);
        var config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
        var languages = config.languages;
        var problems = config.problems;
        for(const prob of problems){
            fs.mkdirSync(base_dir + problems + "/");
            for(const lang of languages){
                fs.mkdirSync(base_dir + prob + "/" + lang + "/");
            }
        }
    } catch (e) {
        console.log(e);
    }
}