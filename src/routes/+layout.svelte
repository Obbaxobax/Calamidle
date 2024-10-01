<script>
    import "../app.pcss";
    import { inject } from '@vercel/analytics'
    import { slide } from "svelte/transition"
    import Bosses from "$lib/bosses/bosses.svelte";

    let disabled = true
    let weaponsPage = true

    inject()
</script>

<div class="min-h-screen h-full w-full flex bg-black/30 backdrop-blur-sm overflow-hidden">
    <div class="w-full h-full">
        <div class="flex h-full gap-0">
            <div class="w-full h-fit">
                <div class="w-full flex items-center justify-center">
                    <div class="w-full">
                        {#if weaponsPage}
                            <slot class=""/>
                        {:else}
                            <Bosses/>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>