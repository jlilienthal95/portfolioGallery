<script lang="ts">
    import Image from "$lib/image.svelte";
    import { imagesState } from "../store";
    import { onMount, onDestroy } from "svelte";

    let error: string | null = null;
    let gallery: HTMLElement | null = null;
    let observer: IntersectionObserver | null = null;
    let observedIndex = 0;
    let lastImgObserver: IntersectionObserver | null = null;

    async function fetchImages() {
        try {
            const data = await fetch('/api/');
            if (!data.ok) throw new Error("Failed to fetch images.");
            const files = await data.json();
            // console.log('images:', files);
            return files;
        } catch (err: unknown) {
            error = err instanceof Error ? err.message : String(err);
        }
    }

    function observeImages() {
        if (!gallery) return;

        // Disconnect existing observer if already set
        if (observer) observer.disconnect();

        observer = new IntersectionObserver(entries => {
            entries.forEach(async entry => {
                entry.target.classList.toggle('show', entry.isIntersecting);
                if (!entry.isIntersecting) return;
                observeNewImages();
            });
        },
        { 
            root: gallery,
            threshold: 0.3
        });

        // Observe each image
        for (let child of gallery.children) {
            observer.observe(child);
        }
    }

    function observeNewImages() {
        if (!gallery || !observer) return;

        for (let child of gallery.children) {
            const curr = Number(child.id);
            if (curr > observedIndex) {
                observedIndex = curr;
                // console.log('observedIndex:', observedIndex);
                observer.observe(child);
            }
        }
    }

    let index = 0;

    function observeLastImage() {
        if (!gallery) return;

        lastImgObserver = new IntersectionObserver(entries => {
            const lastImg = entries[0];
            if(!lastImg.isIntersecting) return;

            const newImgState = [...$imagesState, {path: $imagesState[index].path}]
            index++;
            imagesState.set(newImgState);
            lastImgObserver?.unobserve(lastImg.target);
            
            if(gallery){
                lastImgObserver?.observe(gallery.children[gallery.children.length - 1]);
            }
            
        }, { 
            root: gallery,
            threshold: 0.1
        })

        lastImgObserver.observe(gallery.children[gallery.children.length - 1]);
    }

    onMount(async () => {
        console.log("Component mounted");
        gallery = document.getElementById('galleryCont');

        await fetchImages()
        await imagesState.set(await fetchImages());
        observeImages();
        observeLastImage();
    });

    onDestroy(() => {
        if (observer) observer.disconnect();
    });
</script>

<div id="bg" class="h-screen w-full flex justify-center">
    <div id="content" class="w-full flex items-center justify-center">
        <div id="galleryCont" class="noScroll w-[95vw] h-full flex md:flex-row flex-col justify-start items-center gap-4 md:overflow-x-scroll md:overflow-y-hidden overflow-y-scroll overflow-x-hidden scroll-smooth md:snap-x snap-y snap-mandatory snap-always py-10 md:py-10">
            {#if $imagesState}
                {#each $imagesState as image, index}
                    <Image imgSrc={image['path'].replace(/static\//g, "")} imgId={index} />
                {/each}
            {/if}
        </div>
    </div>
</div>

<style>
    @media (min-width: 767px) {
        .noScroll {
            overflow: scroll;
            scrollbar-width: none; /* For Firefox */
            -ms-overflow-style: none;  /* For Internet Explorer 10+ */
        }
    }

    @media (max-width: 767px) {
        .noScroll {
            overflow-y: scroll;
            scrollbar-width: none; /* For Firefox */
            -ms-overflow-style: none;  /* For Internet Explorer 10+ */
        }
    }

    .noScroll::-webkit-scrollbar {
        display: none; /* For Chrome, Safari, and Opera */
    }
</style>