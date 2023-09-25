<template>
	<div class="popup rounded-md bg-white w-96">
		<div
			class="top flex justify-between px-3.5 py-6 border-b-2 border-gray-300"
		>
			<p v-if="newNote.id" class="text-lg font-medium">Update Note</p>
			<p v-else class="text-lg font-medium">Add New Note</p>
			<XMarkIcon @click="close" class="w-6 h-6 text-xl cursor-pointer" />
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
				<p v-if="formError && formError.title" class="px-2 text-red-300 italic">
					{{ formError.title }}
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
				{{ newNote.id ? "Update Note" : "Add Note" }}
			</button>
		</form>
	</div>
</template>

<script>
import {ref} from 'vue';
import { XMarkIcon } from "@heroicons/vue/24/outline";
export default {
	components: {
		XMarkIcon,
	},
	props: {
		newNote: Object,
	},
	emits: ["createClicked", "closed"],
	setup(props, { emit }) {
		// START: Declaration of reactive (ref) variables (add to return if needed in template)
		const formError = ref({});
        const newNote= ref(props.newNote)
		// END  : Declaration of reactive (ref) variables

		// START: Declaration of helper functions
		const validateNote = () => {
			if (newNote.value.title.length < 3) {
				formError.value.title = "Title must be at least 3 chars";
				return false;
			}
			return true;
		};
		// END  : Declaration of helper functions

		// START: Declaration of methods (which used by template)
		const createNote = () => {
            if (validateNote()) {
                emit("createClicked");
            }
		};

		const close = () => {
			emit("closed");
		};
		// END  : Declaration of methods (which used by template)

		// START: Declaration of other life cycle hooks (optional)
		// END  : Declaration of other life cycle hooks (optional)

		return {
            newNote,
			formError,

            createNote,
            close
		};
	},
};
</script>
