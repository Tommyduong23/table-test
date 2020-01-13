/* eslint-disable import/prefer-default-export */
import env from '@/assets/env';

import { GetCurrentUserToken } from './firebase/auth';

const path = ( a, queryOptions = null ) => {
	const query = ( () => {
		if ( !queryOptions ) {
			return '';
		}

		const queryKeys   = Object.keys( queryOptions );
		const queryString = queryKeys
			.map( ( key ) => {

				const value = queryOptions[key];
				if ( typeof value !== 'object' ) {
					return `${key}=${encodeURIComponent( queryOptions[key] )}`;
				}

				return encodeArray( key, value );
			} )
			.filter( q => q.length )
			.join( '&' );

		return `?${queryString}`;
	} )();

	return `${env.API_PROTOCOL}://${env.API_URL}/${a}${query}`;
};

const encodeArray = ( key, arr ) => { // eslint-disable-line

	return arr.reduce( ( a, item, i ) => {

		// For 1 dimensional arrays
		if ( !Array.isArray( item ) ) {
			a.push( `${key}[${i}]=${encodeURIComponent( item )}` );
			return a;
		}

		// For 2 dimensional arrays
		item.forEach( ( x, j ) => {
			if ( typeof x === 'object' ) {
				const objKeys = Object.keys( x );
				objKeys.forEach( ( objKey ) => {
					a.push( `${key}[${i}][${j}][${objKey}]=${encodeURIComponent( x[objKey] )}` );
				} );

				return;
			}
			a.push( `${key}[${i}][${j}]=${encodeURIComponent( x )}` );
		} );

		return a;

	}, [] )
		.join( '&' );
};

const _body = async ( res ) => {
	const text = await res.text();

	const firstChar = text.charAt( 0 );
	const isJson    = ( firstChar === '{' || firstChar === '[' );

	if ( isJson ) {
		return JSON.parse( text );
	}

	return text;
};

// simply uses a try/catch block to
// ensure standard behaviors on
// fetch
const fetchPromise = ( route, options ) => new Promise( ( resolve, reject ) => {
	// add credentials to request
	options.credentials = 'include'; // eslint-disable-line

	try {
		fetch( route, options )
			.then( async ( res ) => {
				const status = parseInt( res.status, 10 );
				if ( ( Math.floor( status / 100 ) * 100 ) !== 200 ) {
					reject( res );

					return;
				}

				const body = await _body( res );
				resolve( body, res );
			} )
			.catch( e => reject( e ) );
	}
	catch ( e ) {
		reject( e );
	}
} );

/**
 * a courier function which will run
 * it's first paramater as a callback
 * with a Firebase AuthToken added in
 * at the beginning of the paramaters
 * list
 *
 * @param method (function) the method to be called after a token is generated
 */
const authenticate = method => ( ...args ) => GetCurrentUserToken()
	.then( ( token ) => {
		const authObject = {
			token,
			defaultHeaders : new Headers( {
				'Auth-Token'   : token,
				'Content-Type' : 'application/json',
			} ),
		};
		const allArgs = [authObject].concat( args );

		return method( ...allArgs );
	} );
