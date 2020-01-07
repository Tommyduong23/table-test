// http://eslint.org/docs/user-guide/configuring

module.exports = {
	'root'          : true,
	'parserOptions' : {
		'parser' : 'babel-eslint'
	},
	'env' : {
		browser : true,
	},
	'extends' : [
		'plugin:vue/essential',
		'@vue/airbnb',
	],
	// required to lint *.vue files
	'plugins' : [
		'html',
		'vue'
	],
	// check if imports actually resolve
	'settings' : {
		'import/resolver' : {
			'webpack' : {
				'config' : require.resolve( '@vue/cli-service/webpack.config.js' )
			}
		}
	},
	// add your custom rules here
	'rules' : {
		// don't require .vue extension when importing
		'import/extensions' : ['error', 'always', {
			'js'  : 'never',
			'vue' : 'never'
		}],
		'max-len'                           : 0,
		'no-plusplus'                       : 0,
		// allow optionalDependencies
		'import/no-extraneous-dependencies' : ['error', {
			'optionalDependencies' : ['test/unit/index.js']
		}],
		// allow debugger during development
		'no-debugger'           : process.env.NODE_ENV === 'production' ? 2 : 0,
		'no-use-before-define'  : 0,
		'no-prototype-builtins' : 'off',
		'func-names'            : 0,
		'global-require'        : 0,
		'no-console'            : 0,
		'quotes'                : [
			'error',
			'single'
		],
		'quote-props' : [
			'error',
			'consistent'
		],
		'no-mixed-spaces-and-tabs' : [
			'error',
			'smart-tabs'
		],
		'indent' : [
			'error',
			'tab',
			{ 'SwitchCase' : 1 }
		],
		'space-in-parens' : [
			'error',
			'always'
		],
		'no-multi-spaces' : [
			'error',
			{
				'exceptions' : {
					'VariableDeclarator'   : true,
					'AssignmentExpression' : true
				}
			}
		],
		'key-spacing' : [
			'error',
			{
				'beforeColon' : true,
				'align'       : 'colon'
			}
		],
		'brace-style' : [
			'error',
			'stroustrup'
		],
		'comma-dangle'         : 'off',
		'no-tabs'              : 0,
		'padded-blocks'        : 'off',
		'no-underscore-dangle' : 'off'
	},
	'globals' : {
		'appRequire' : true,
		'before'     : true,
		'it'         : true,
		'describe'   : true,
		'expect'     : true,
		'after'      : true
	}
};
