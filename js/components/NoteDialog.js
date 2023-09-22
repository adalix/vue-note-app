export default {
    template:`
    <div class="popup rounded-md bg-white w-96">
    <div
        class="top flex justify-between px-3.5 py-6 border-b-2 border-gray-300"
    >
        <p v-if="newNote.id" class="text-lg font-medium">Update Note</p>
        <p v-else class="text-lg font-medium">Add New Note</p>
        <i
            @click="close"
            class="uil uil-times text-xl cursor-pointer"
        ></i>
    </div>
    <form action="" class="mt-4 mx-6 mb-9">
        <div class="title mb-5">
            <label>Title <span class="text-red-900">*</span></label>
            <input
                v-model="newNote.title"
                type="text"
                class="h-16 w-full outline-none px-4 rounded-md border-2 border-gray-300"
                required
            />
            <p
                v-if="formError && formError.title"
                class="px-2 text-red-300 italic"
            >
                {{formError.title}}
            </p>
            <!-- {{formError}} -->
        </div>
        <div class="description">
            <label>Description</label>
            <textarea
                v-model="newNote.description"
                class="h-36 w-full mb-5 px-4 py-2 resize-none outline-none rounded-md border-2 border-gray-300"
            ></textarea>
        </div>
        <button
            @click.prevent="createNote"
            class="w-full h-12 border-none outline-none text-white rounded-md bg-orange-500"
        >
        {{newNote.id ? 'Update Note' : 'Add Note'}}	
        </button>
    </form>
</div>
   `,
   props: {
    newNote:Object,
   },
   methods: {
    createNote(){
        this.$emit('createClicked')
    },
    close(){
        this.$emit('closed')
    }
   },
}
