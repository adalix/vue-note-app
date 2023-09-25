<template>
	<div
		:class="{ 'blur-sm w-full h-screen': isDialogOpen }"
		class="grid grid-flow-col auto-cols-max gap-4 m-12 relative bg-orange-300"
	>
		<!-- Add New Note -->
		<div
			class="flex flex-col items-center justify-center bg-white rounded-md w-64 h-64 px-5 pb-5 pt-3.5"
		>
			<div
				@click="toggleDialog"
				class="w-20 h-20 flex items-center justify-center cursor-pointer text-4xl border-2 border-orange-500 border-dashed rounded-full"
			>
				<PlusIcon class="text-orange-500 " />
			</div>
			<p class="mt-5 text-orange-500">Add Note</p>
		</div>

		<!-- NOTE -->
		<div
			v-for="(note, index) in notes"
			:key="note.id"
			class="flex flex-col justify-between bg-white rounded-md w-64 h-64 px-5 pb-5 pt-3.5"
		>
			<!-- Note Card goes here -->

			<Note
				:item="note"
				@selectedForUpdate="updateByIndex(index)"
				@selectedForDelete="deleteByIndex(index)"
			/>
		</div>
	</div>

	<!-- NOTE -->

	<!-- NEW NOTE -->
	<div
		v-if="isDialogOpen"
		class="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex items-center justify-center w-full h-full"
	>
		<NoteDialog
			:newNote="newNote"
			@closed="toggleDialog"
			@createClicked="createNote"
		/>
	</div>
</template>

<script>
import { ref } from "vue";
import Note from "./components/Note.vue";
import NoteDialog from "./components/NoteDialog.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";

export default {
	components: {
		Note,
		NoteDialog,
		PlusIcon,
	},
	setup() {
		// START: Declaration of reactive (ref) variables (add to return if needed in template)
		const isDialogOpen = ref(false);

		const selectedIndex = ref(-1);
		const newNote = ref({
			title: "",
			description: "",
			user: "user#1",
			createdAt: new Date(),
		});
		const notes = ref([
			{
				id: 1,
				title: "Note#1",
				description: "Note#1 Description",
				user: "user#1",
				createdAt: new Date(),
			},
		]);
		// END  : Declaration of reactive (ref) variables

		// START: Declaration of helper functions
		const resetNewNote = () => {
			selectedIndex.value = -1;
			newNote.value = {
				title: "",
				description: "",
				user: "user#1",
				createdAt: new Date(),
			};
		};

		// END  : Declaration of helper functions

		// START: Declaration of methods (which used by template)
		const toggleDialog = () => {
			// TODO: rename toggleDialog => toggleDialog
			isDialogOpen.value = !isDialogOpen.value;
			if (!isDialogOpen) {
				resetNewNote();
			}
		};

		const deleteByIndex = (index) => {
			notes.value.splice(index, 1);
		};

		const updateByIndex = (index) => {
			newNote.value = notes.value[index];
			toggleDialog();
			selectedIndex.value = index;
		};

		const createNote = () => {
			if (newNote.value.id) {
				notes.value[selectedIndex.value].title = newNote.value.title;
				notes.value[selectedIndex.value].description =
					newNote.value.description;
			} else {
				newNote.value.id = notes.value.length;
				notes.value.push(newNote.value);
			}
			resetNewNote();
			toggleDialog();
		};
		// END  : Declaration of methods (which used by template)

		// START: Declaration of other life cycle hooks (optional)
		// END  : Declaration of other life cycle hooks (optional)

		return {
			isDialogOpen,
			toggleDialog,

			newNote,
			notes,
			deleteByIndex,
			updateByIndex,
			createNote,
		};
	},
};
</script>
