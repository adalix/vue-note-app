<template>
	<span class="text-gray-400">{{ formatDate() }}</span>
</template>

<script >
import {ref} from 'vue'
export default {
	setup() {
		const months = ref([
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		])

		const formatDate = () => {
			let date = new Date();
			console.log("createdAt input: ", date);
			let year = date.getFullYear();
			let month = months.value[date.getMonth()];
			let day = date.getDate();
			return month + " " + day + ", " + year;
		};

		return {
			months, formatDate
		};
	},
};
</script>
