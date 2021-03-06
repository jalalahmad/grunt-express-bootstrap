/*
 * grunt-express-bootstrap
 *
 * Copyright (c) 2012 Mark Wolfe
 * Licensed under the MIT license.
 * https://github.com/wolfeidau/grunt-express-bootstrap/blob/master/LICENSE-MIT
 */

// Basic template description.
exports.description = 'Create a Node.js module, including Nodeunit unit tests.'

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain "node" or "js" and should ' +
    'be a unique ID not already in use at search.npmjs.org.'

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*'

// The actual init template.
exports.template = function(grunt, init, done) {

    grunt.helper('prompt', {type: 'grunt-express-bootstrap'}, [
        // Prompt for these values.
        grunt.helper('prompt_for', 'name'),
        grunt.helper('prompt_for', 'description'),
        grunt.helper('prompt_for', 'version'),
        grunt.helper('prompt_for', 'repository'),
        grunt.helper('prompt_for', 'homepage'),
        grunt.helper('prompt_for', 'bugs'),
        grunt.helper('prompt_for', 'licenses'),
        grunt.helper('prompt_for', 'author_name'),
        grunt.helper('prompt_for', 'author_email'),
        grunt.helper('prompt_for', 'author_url'),
        grunt.helper('prompt_for', 'node_version'),
        grunt.helper('prompt_for', 'main'),
        grunt.helper('prompt_for', 'npm_test')
    ], function(err, props) {
        props.keywords = []

        // specify the project dependencies.
        props.dependencies = {
            "connect-cachify": "*",
            "winston": "*",
            "winston-request-logger": "*",
            "jade": "*",
            "nconf": "*",
            "express": "*",
            "uglify-js": "*",
            "uglifycss": "*"
        }

        // specify the project dependencies.
        props.devDependencies = {
            "grunt-simple-mocha":"~0.2.0",
            "mocha":"~1.6.0",
            "should":"~1.2.0",
            "grunt":"~0.3.17"
        }

        // Files to copy (and process).
        var files = init.filesToCopy(props)

        // Add properly-named license files.
        init.addLicenseFiles(files, props.licenses)

        // Actually copy (and process) files.
        init.copyAndProcess(files, props)

        // Generate package.json file.
        init.writePackageJSON('package.json', props)

        // All done!
        done()
    })

}