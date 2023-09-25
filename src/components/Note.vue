<template>
	<div>
		<p class="text-2xl font-medium text-left">{{ item.title }}</p>
		<span class="text-base text-gray-500">{{ item.description }}</span>
	</div>

	<div
		class="flex items-center justify-between border-t-2 border-gray-300 pt-2.5"
	>
		<CreatedAt :note="item" />
		<div class="flex">
			<span class="mr-2 cursor-pointer">
				<PencilIcon class="w-4 h-4 hover:text-orange-900" @click.prevent="updateByIndex" />
			</span>
			<span class="cursor-pointer">
				<TrashIcon  class="w-4 h-4 hover:text-orange-900" @click.prevent="deleteNoteByIndex" />
			</span>
		</div>
	</div>
</template>

<script>
import {ref} from 'vue';
import CreatedAt from "./CreatedAt.vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";

export default {
	props: ["item"],
	components: { CreatedAt, PencilIcon, TrashIcon },
	emits: ['selectedForUpdate', 'selectedForDelete'],
	setup(props, {emit}) {
		const editMode = ref(false);

		const updateByIndex = () => {
			emit("selectedForUpdate");
		};
		const deleteNoteByIndex = () => {
			emit("selectedForDelete");
		};

		return { editMode, updateByIndex, deleteNoteByIndex };
	},
};
</script>
