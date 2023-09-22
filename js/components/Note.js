import CreatedAt from "./CreatedAt.js";
export default {
	template: `
    <div>
        <p class="text-2xl font-medium text-left">{{item.title}}</p>
        <span class="text-base text-gray-500">{{item.description}}</span>
    </div>

    <div
            class="flex items-center justify-between border-t-2 border-gray-300 pt-2.5"
    >
        <CreatedAt :note="item" />
            <div>
                <span class="mr-2 cursor-pointer">
                    <i
                        class="uil uil-pen"
                        @click.prevent="updateByIndex()"
                    ></i>
                </span>
                <span class="cursor-pointer">
                    <i class="uil uil-trash-alt" @click.prevent="deleteNoteByIndex()">
                    </i
                ></span>
            </div>
        </div>
    `,
    components:{
        CreatedAt
    },
    props: {
        item: Object,

    },
    data() {
        return {
            editMode: false
        } 
    },
    methods: {
        updateByIndex() {
            this.$emit('selectedForUpdate')
        },
        deleteNoteByIndex(){
            this.$emit('selectedForDelete')
        }
    },
};
