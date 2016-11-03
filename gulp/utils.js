var fs = require( 'fs' );
var download = require( 'gulp-download' );
var rename = require( "gulp-rename" );
var gulp = require( 'gulp' );

/**
 * Goes through each of the main config files and increments
 * the version
 * @param {( currentVersion: string ) => string} f A function to transform the version into a new version
 * @returns {string}
 */
module.exports.bumpVersion = function( f, files ) {
    let fileStr = '';
    let version = '';

    if ( !fs.existsSync( './package.json' ) )
        throw new Error( `You dont seem to have a package json file. This is needed to identify the version.` );

    version = JSON.parse( fs.readFileSync( './package.json' ) ).version;
    const bumpedVersion = f( version );

    return Promise.all( files.map( function( file ) {
        return new Promise( function( resolve, reject ) {
            if ( !fs.existsSync( file ) )
                throw new Error( `File ${file} does not exist` );

            fileStr = fs.readFileSync( file ).toString();
            const matchedVersion = fileStr.match( new RegExp( version, 'i' ) );
            if ( !matchedVersion || matchedVersion.length === 0 )
                throw new Error( `File ${file} does not have a consistent version number of '${version}'` );

            fileStr = fileStr.replace( version, bumpedVersion );
            fs.writeFileSync( file, fileStr );
        });
    }) );
}

/**
 * Increments a semvar version patch number
 * @param {string} version The version coming in. E.g. 1.0.1
 * @returns {string}
 */
module.exports.bumpPatchNum = function( version ) {
    const segments = version.split( '.' );
    const patch = parseInt( segments[ 2 ] ) + 1;
    return `${segments[ 0 ]}.${segments[ 1 ]}.${patch}`
};

/**
 * Increments a semvar version mid number
 * @param {string} version The version coming in. E.g. 1.0.1
 * @returns {string}
 */
module.exports.bumpMidNum = function( version ) {
    const segments = version.split( '.' );
    const minor = parseInt( segments[ 1 ] ) + 1;
    return `${segments[ 0 ]}.${minor}.0`
};

/**
 * This function downloads a definition file from github and writes it to a destination
 * @param {string} url The url of the file to download
 * @param {string} dest The destination folder to move the file to
 */
module.exports.getDefinition = function( url, dest, name ) {
    return new Promise( function( resolve, reject ) {
        download( url )
            .pipe( rename( name ) )
            .pipe( gulp.dest( dest ) )
            .on( 'error', function( err ) {
                throw ( err )
            })
            .on( 'end', function() {
                resolve( true );
            })
    });
}