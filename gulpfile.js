var fs = require('fs');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var download = require('gulp-download');
var rename = require('gulp-rename');
var yargs = require('yargs');
var utils = require('./gulp/utils.js');
var tslint = require('gulp-tslint');

const tsProject = ts.createProject('tsconfig.json');
const configFiles = [
    './readme.md',
    './install-script.sh',
    './package.json'
];

const modepressPluginDir = yargs.argv.dir || null;
if (!modepressPluginDir)
    console.warn('WARNING: No output directory specified.');

/**
 * Builds the ts project and moves the js files to a temp directory in
 * the dist folder
 */
gulp.task('compile-typescript', function() {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest('./dist'));
});

/**
 * Ensures the code quality is up to scratch
 */
gulp.task('lint-typescript', function() {
    return tsProject.src()
        .pipe(tslint({
            configuration: 'tslint.json',
            formatter: 'verbose'
        }))
        .pipe(tslint.report({
            emitError: false
        }))
});

/**
 * Downloads the definition files used in the development of the application and moves them into the definitions folder
 */
gulp.task('install-definitions', function() {
    return Promise.all([
        utils.getDefinition('https://raw.githubusercontent.com/Webinate/users/dev/src/definitions/generated/users.d.ts', 'lib/definitions/required/', 'users.d.ts'),
        utils.getDefinition('https://raw.githubusercontent.com/Webinate/modepress/dev/src/definitions/generated/modepress.d.ts', 'lib/definitions/required/', 'modepress.d.ts'),
        utils.getDefinition('https://raw.githubusercontent.com/Webinate/modepress-admin/dev/lib/definitions/generated/definitions.d.ts', 'lib/definitions/required/', 'modepress-admin.d.ts'),
        utils.getDefinition('https://raw.githubusercontent.com/Webinate/modepress-admin/dev/lib/definitions/generated/modepress-client.d.ts', 'lib/definitions/required/', 'modepress-admin-plugin.d.ts'),
        utils.getDefinition('https://raw.githubusercontent.com/Webinate/modepress-client-angular/master/src/definitions/generated/plugin.d.ts', 'lib/definitions/required/', 'modepress-client.d.ts'),
        utils.getDefinition('https://raw.githubusercontent.com/PixelSwarm/hatchery-server/dev/lib/definitions/generated/hatchery-server.d.ts', 'lib/definitions/required/', 'hatchery-server.d.ts')
    ]);
});

/**
 * Builds the definitions and
 */
gulp.task('copy-resources', function() {

    return gulp.src('lib/resources/**', { base: 'lib/resources' })
        .pipe(gulp.dest('./dist'));
});

/**
 * Builds the definitions and
 */
gulp.task('copy-dist', ['copy-resources'], function() {
    if (modepressPluginDir == null)
        return Promise.resolve();

    return gulp.src('./dist/**', { base: 'dist' })
        .pipe(gulp.dest(modepressPluginDir));
});

gulp.task('bump-patch', function() { return utils.bumpVersion(utils.bumpPatchNum, configFiles) });
gulp.task('bump-minor', function() { return utils.bumpVersion(utils.bumpMidNum, configFiles) });
gulp.task('bump-major', function() { return utils.bumpVersion(utils.bumpMajorNum, configFiles) });
gulp.task('install', ['install-definitions']);
gulp.task('build', ['compile-typescript', 'lint-typescript', 'copy-dist']);