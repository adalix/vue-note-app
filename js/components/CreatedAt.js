export default {
    template: `
        <span class="text-gray-400">{{formatDate(note.createdAt)}}</span>
    `,
    props:{
        note : Object
    },
    data() {
        return {
            months : [
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
			],
        }
    },
    methods: {
        formatDate(date){
			console.log('createdAt input: ',date)
			let year = date.getFullYear()
			let month = this.months[date.getMonth()]
			let day = date.getDate()
			return month +" "+ day +", "+ year
		}
    },
}