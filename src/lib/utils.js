export const HasProperty = ( a, b ) => Object.prototype.hasOwnProperty.call( a, b );

export const ObjToArray = ( object ) => {

	if ( object === null || object === undefined ) {
		return [];
	}

	const keys  = Object.keys( object );
	const array = keys.reduce( ( arr, key ) => {

		const obj = object[key];

		if ( !HasProperty( obj, 'key' ) ) {
			obj.key = key;
		}

		arr.push( obj );

		return arr;

	}, [] );

	return array;

};

export const uid = ( name ) => {
	const salt = Math.floor( Math.random() * 9000 ) + 1000;
	const now  = Date.now().toString();

	return `${name}-${salt}${now.substr( 5, now.length )}`;
};

export const iterate = ( obj, callback ) => {
	if ( Array.isArray( obj ) ) {
		obj.forEach( ( item, i ) => callback( item, i ) );
		return;
	}

	const keys = Object.keys( obj );
	keys.forEach( ( key ) => {
		const item = obj[key];

		callback( item, key );
	} );
};

export const clone = ( obj ) => {
	const newObj = Array.isArray( obj ) ? [] : {};

	iterate( obj, ( value, key ) => {
		if ( value === null ) {
			newObj[key] = null;

			return;
		}

		newObj[key] = typeof value === 'object' ? clone( value ) : value;
	} );

	return newObj;
};

export const combine = ( obj1, obj2 ) => {
	const newObj = clone( obj1 );

	iterate( obj2, ( value, key ) => {
		const valueIsObject = ( typeof value === 'object' && value !== null );

		if ( !HasProperty( newObj, key ) ) {
			newObj[key] = valueIsObject ? clone( value ) : value;

			return;
		}

		newObj[key] = valueIsObject ? combine( newObj[key], value ) : value;
	} );

	return newObj;
};

export const readImage = file => new Promise( ( resolve, reject ) => {
	const reader = new FileReader();

	reader.onload  = e => resolve( e.target.result );
	reader.onerror = reject;

	reader.readAsDataURL( file );
} );

export const compare = ( a, b ) => {
	if ( a === null && b === null ) {
		return true;
	}

	if ( a === null || b === null ) {
		return false;
	}

	const aKeys = Object.keys( a );
	const bKeys = Object.keys( b );

	if ( aKeys.length !== bKeys.length ) {
		// can't be the same if they have a different
		// key length
		return false;
	}

	let identical = true;
	for ( let i = 0; i < aKeys.length; i += 1 ) {
		const aKey = aKeys[i];

		if ( typeof a[aKey] === 'object' ) {

			if ( !compare( a[aKey], b[aKey] ) ) {
				identical = false;
			}

		}

		else if ( a[aKey] !== b[aKey] ) {
			identical = false;
		}
	}

	return identical;
};

export const toCommaDelimitedList = ( str, item, i, list ) => {
	if ( str === undefined || i === 0 ) {
		return item;
	}

	const delimiter = i === ( list.length - 1 ) ? ', and ' : ', ';

	return `${str}${delimiter}${item}`;
};
