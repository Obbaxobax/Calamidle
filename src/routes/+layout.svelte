<script>
    import "../app.pcss";
    import { slide } from "svelte/transition"
    import bosses from "$lib/bosses/bosses.svelte"
    import Bosses from "$lib/bosses/bosses.svelte";

    let disabled = true
    let weaponsPage = true

</script>

<div class="min-h-screen h-full w-full flex bg-black/30 backdrop-blur-sm overflow-auto">
    <div class="w-full h-full">
        <div class="flex h-full gap-0">
            <div transition:slide class="w-[6%] bg-red-950 min-h-lvh {disabled ? "-translate-x-full" : "translate-x-0"} ease-in-out transition-transform duration-300">
                <button class="w-[140%] flex items-center" on:click={() => {disabled = !disabled}}>
                    <div class="w-[100%] flex items-center justify-center">
                        <p style="text-shadow: black 0px 0px 5px;" class="text-[calc(1px_+_24_*_100vw_/_1920)]">Modes</p>
                    </div>
                    <img class="h-[calc(40%_/_1.4)] w-[calc(40%_/_1.4)] bg-red-950 rounded-e-lg" src="/Hamburger_icon.png" alt="toggle"/>
                </button>
                <button style="text-shadow: black 0px 0px 5px;" class="{weaponsPage == true ? "bg-red-900/60" : "bg-red-900/20"} my-1 p-1 rounded-e-md w-full text-[calc(1px_+_18_*_100vw_/_1920)]" on:click={() => {weaponsPage = true}}>Weapons</button>
                <button style="text-shadow: black 0px 0px 5px;" class="{weaponsPage == false ? "bg-red-900/60" : "bg-red-900/20"} my-1 p-1 rounded-e-md w-full text-[calc(1px_+_18_*_100vw_/_1920)]" on:click={() => {weaponsPage = false}}>Bosses</button>
            </div>
            <div class="w-[94%] h-fit">
                <div class="w-full flex items-center justify-center">
                    <div>
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