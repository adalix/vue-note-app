import Note from "./components/Note.js";
import NoteDialog from "./components/NoteDialog.js";
export default {
	template: `
	<div
	:class="{'opacity-50 w-full h-screen': isDialogOpen }"
	class=" grid grid-flow-col auto-cols-max gap-4 m-12 relative"
>
	<!-- Add New Note -->
	<div
		class="flex flex-col items-center justify-center bg-white rounded-md w-64 h-64 px-5 pb-5 pt-3.5"
	>
		<div
			@click="toggleNoteDialog"
			class="w-20 h-20 flex items-center justify-center cursor-pointer text-4xl border-2 border-orange-500 border-dashed rounded-full"
		>
			<i class="uil uil-plus text-orange-500"></i>
		</div>
		<p class="mt-5 text-orange-500">Add Note</p>
	</div>

	<!-- Add New Note -->



	<!-- NOTE -->
	<div
		v-for="(note, index) in notes"
		:key="note.id"
		class="flex flex-col justify-between bg-white rounded-md w-64 h-64 px-5 pb-5 pt-3.5"
	>
		<!-- Note Card goes here -->

		<Note :item="note" @selectedForUpdate="updateByIndex(index)" @selectedForDelete="deleteByIndex(index)"/>
		
	</div>
</div>

<!-- NOTE -->

<!-- NEW NOTE -->
<div
	v-if="isDialogOpen"
	
	class="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex items-center justify-center w-full h-full"
>
	<NoteDialog :newNote="newNote" @closed="toggleNoteDialog" @createClicked="createNote"/>
	
</div>
	`,
	components: {
		Note,
		NoteDialog,
	},
	data() {
		return {
			isDialogOpen: false,
			selectedIndex: -1,
			newNote: {
				title: "",
				description: "",
				user: "user#1",
				createdAt: new Date(),
			},
			notes: [
				{
					id: 1,
					title: "Note#1",
					description: "Note#1 Description",
					user: "user#1",
					createdAt: new Date(),
				},
			],

			formError: {},
		};
	},
	methods: {
		toggleNoteDialog() {
			this.isDialogOpen = !this.isDialogOpen;
			if (!this.isDialogOpen) {
				this.resetNewNote();
			}
		},
		resetNewNote() {
			this.formError = {};
			this.selectedIndex = -1;
			this.newNote = {
				title: "",
				description: "",
				user: "user#1",
				createdAt: new Date(),
			};
		},
		deleteByIndex(index) {
			this.notes.splice(index, 1);
		},

		updateByIndex(index) {
			this.newNote = this.notes[index];
			this.toggleNoteDialog();
			this.selectedIndex = index;
		},
		validateNote() {
			if (this.newNote.title.length < 3) {
				this.formError.title = "Title must be at least 3 chars";
				return false;
			}
			return true;
		},
		createNote() {
			if (this.validateNote()) {
				if (this.newNote.id) {
					this.notes[this.selectedIndex].title = this.newNote.title;
					this.notes[this.selectedIndex].description = this.newNote.description;
				} else {
					this.newNote.id = this.notes.length;
					this.notes.push(this.newNote);
				}
				this.resetNewNote();
				this.toggleNoteDialog();
			}
		},
	},
};
