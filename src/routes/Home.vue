<template lang='pug'>
	#home
		h1 Hi
		HelloWorld
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld';

export default {
	name       : 'home',
	components : {
		HelloWorld,
	},
};
</script>
