<script lang="ts">
	import '../app.css';
	import { writable } from 'svelte/store';

	let { children } = $props();

	const aboutIsOpen = writable(false);

	function openAbout() {
		// console.log('clicked')
		aboutIsOpen.update((prev) => !prev);
		console.log($aboutIsOpen);
	}
</script>


<div id="bodyCont" class="relative flex flex-col w-screen h-[100dvh] bebas-neue-regular overflow-y-hidden">
	<div id="header" class="absolute md:top-0 bottom-0 left-0 z-10 w-full h-fit bg-white py-6 md:px-14 px-2 bebas-neue-regular">
		<div id="contentCont" class="flex flex-row justify-around md:justify-between items-center">
			<a href="/">
				<h1 id="titleCont" class="flex md:w-full w-fit md:text-6xl text-[28px] hover:text-cyan-500 duration-500">
					Portfolio Gallery
				</h1>
			</a>
			<div id="linksCont" class="flex flex-row justify-around sm:gap-4 gap-2 md:text-3xl text-lg text-nowrap">
				<button class="cursor-pointer hover:text-cyan-500 duration-500" role="link" onclick={()=>openAbout()} class:text-cyan-500={$aboutIsOpen}>
					How to use
				</button>
				<a href="http://jldev.works" target="_blank" rel="noopener noreferrer" class='hover:text-cyan-500 duration-500'>
					About
				</a>
			</div>
		</div>
	</div>
	
	<!-- {#if !$aboutIsOpen} -->
		{@render children()}
	<!-- {/if} -->
	
	{#if $aboutIsOpen}
		<modal class="absolute md:top-[25%] md:left-[25%] top-[10%] bg-white rounded-xl">
			<div class="relative flex flex-col md:w-[50vw] lg:h-[55vh] h-[65vh] m-4 px-4 py-10 text-center justify-around rounded-lg border-2 border-gray-500 lg:text-3xl sm:text-2xl text-xl">
				<div id="xCont" class="absolute top-3 right-3 flex justify-end">
					<button id="closeButton" onclick={()=>openAbout()} class="md:text-3xl cursor-pointer hover:text-cyan-500 duration-500 font-sans font-bold">
						X
					</button>
				</div>
				<div>
					To use the gallery yourself, simply visit
					<a class="text-cyan-700 hover:text-cyan-500 font-bold" href="https://github.com/jlilienthal95/portfolioGallery/tree/main/static/images" target="_blank" rel="noopener noreferrer">
						this link
					</a>
					and select "Add file", then choose "Upload Files". Here you can upload your own images. Commit directly to the main branch and select "Commit Changes". It may take up to a minute for the changes to reflect. Refresh this page. Scroll through the images and you'll see your images added to the gallery!*
				</div>
				<div class="font-bold md:text-xl text-xl">
					*This is a public service. Uploads will be visible to any vistor of this site. By using this service you agree not to upload inappropriate materials including but not limited to nudity, violence, or copyrighted materials.
				</div>
			</div>
		</modal>
	{/if}
</div>