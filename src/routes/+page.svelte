<script lang="ts">
    import { onMount } from "svelte";
    import { fade, scale, slide } from "svelte/transition"
    export let data;

    let input: String = ""
    let gameCompleted: boolean = false

    $: weaponIndex =  data.weaponIndex;
    $: weapons = data.weapons;
    let submittedWeapons: any[] = []

    let useSpeeds = [
        "Insanely Fast Speed",
        "Very Fast Speed",
        "Fast Speed",
        "Average Speed",
        "Slow Speed",
        "Very Slow Speed",
        "Extremely Slow Speed",
        "Snail Speed"
    ]

    let knockbacks = [
        "No Knockback",
        "Extremely Weak Knockback",
        "Very Weak Knockback",
        "Weak Knockback",
        "Average Knockback",
        "Strong Knockback",
        "Very Strong Knockback",
        "Extremely Strong Knockback",
        "Insane Knockback"
    ]

    let rarityColors: string[] = [
        "#FFFFFF",
        "#9696FF",
        "#96FF96",
        "#FFC896",
        "#FF9696",
        "#FF96FF",
        "#D2A0FF",
        "#96FF0A",
        "#FFFF0A",
        "#05C8FF",
        "#FF2864",
        "#B428FF",
        "#8f1fcb",
        "#00dbab",
        "#00ee00",
        "#295bd3",
        "#481e85",
        "#ed00ed"
    ];

    let filterWeaponsListOpen: boolean = false;
    let filteredWeapons: string[] = []

    function closeFilteredWeapons(){
        filterWeaponsListOpen = false
    }

    function filterWeapons() {
        document.body.addEventListener("click", closeFilteredWeapons)
        filterWeaponsListOpen = true;
        let tempArray: any[] = [];
        if(input){
            for(var i = 0; i < Object.keys(weapons).length; i++){
                if(Object.keys(weapons)[i].toLowerCase().includes(input.toLowerCase()) && !submittedWeapons.includes(Object.keys(weapons)[i])){
                    tempArray = [...tempArray, Object.keys(weapons)[i]]
                }
            }
        }
        filteredWeapons = tempArray;
    }

    let activeHint = ""

    $: correctWeapon = {
        name: Object.keys(weapons)[weaponIndex],
        damage: weapons[Object.keys(weapons)[weaponIndex]]["damage"],
        damagetype: weapons[Object.keys(weapons)[weaponIndex]]["damagetype"],
        knockback: weapons[Object.keys(weapons)[weaponIndex]]["knockback"],
        useSpeed: weapons[Object.keys(weapons)[weaponIndex]]["speed"],
        rarity: weapons[Object.keys(weapons)[weaponIndex]]["rarity"],
        obtained: weapons[Object.keys(weapons)[weaponIndex]]["obtained"],
        isAutoSwing: weapons[Object.keys(weapons)[weaponIndex]]["isAutoSwing"],
        isMaterial: weapons[Object.keys(weapons)[weaponIndex]]["isMaterial"],
        tooltip: weapons[Object.keys(weapons)[weaponIndex]]["tooltip"],
        sellValue: weapons[Object.keys(weapons)[weaponIndex]]["sellValue"]
    }

    function submitGuess() {
        if(weapons[input] != null && !submittedWeapons.includes(input)){
            submittedWeapons = [input, ...submittedWeapons]
            if(input == correctWeapon.name){
                gameCompleted = true
            }
            input = ""
        }

        if(input == "Supreme Calamitas"){
            gameCompleted = true
            input = ""
            submittedWeapons = [correctWeapon.name, ...submittedWeapons]
        }

        localStorage.setItem("submittedWeapons", JSON.stringify(submittedWeapons))
    }

    function activateHint(hint: string, tries: number){
        if(gameCompleted == true && activeHint != hint){
            activeHint = hint
            console.log(activeHint)
            return
        }
        else if(gameCompleted == true && activeHint == hint){
            activeHint = ""
            return
        }

        if(submittedWeapons.length >= tries && activeHint != hint)
        {
            activeHint = hint
        }
        else if(activeHint == hint)
        {
            activeHint = ""
        }
    }

    function reset(){
        localStorage.removeItem("submittedWeapons")
        submittedWeapons = []
        window.location.reload()
    }

    const handleObtainedOverlaps = (weaponName: string) => {
        for(var i = 0; i < weapons[weaponName].obtained.length; i++){
            if(correctWeapon.obtained.includes(weapons[weaponName].obtained[i])){
                return true
            }
        }
        return false
    }

    onMount(() => {
        if(localStorage.getItem("submittedWeapons") != null && localStorage.getItem("day") != null){
            if(JSON.parse(localStorage.getItem("day")!) == data.day){
                JSON.parse(localStorage.getItem("submittedWeapons")!).forEach((weaponName: string) => {
                    submittedWeapons = [...submittedWeapons, weaponName]
                });
            }
            else{
                localStorage.removeItem("submittedWeapons")
                localStorage.setItem("day", JSON.stringify(data.day))
            }
        }
        
        if(localStorage.getItem("day") == null){
            localStorage.removeItem("submittedWeapons")
            localStorage.setItem("day", JSON.stringify(data.day))
        }

        if (submittedWeapons.includes(correctWeapon.name)){
            gameCompleted = true
        }
    })
</script>

<!--Logo-->
<div class="mt-8 w-full h-24 px-3">
    <img
        class="mx-auto w-64 sm:w-80 drop-shadow-2xl -translate-y-[30%]"
        src="/logo.png"
        alt="logo"
    />
</div>
<!--Hint Area-->
<div>
    <div class="w-[85%] md:w-[45%] lg:w-[40%] max-w-[550px] px-4 py-1 -translate-y-1/4 mx-auto h-auto rounded-3xl bg-[#850825] border-[1.5px] border-black flex items-center">
        <p class="mx-auto text-lg md:text-2xl lg:text-3xl" style="text-shadow: black 0px 0px 5px;">Guess today's weapon!</p>
    </div>
    <div class="w-[95%] md:w-[50%] lg:w-[45%] max-w-[600px] h-fit -my-8 bg-red-900 mx-auto mb-3 rounded-2xl border-[1.5px] px-2 py-3 border-black flex flex-col">
        <div class="w-full translate-y-[10%] flex sm:gap-3 gap-2 my-3 h-full">
            <button class="w-full h-28 sm:h-24 py-2 px-[2px] bg-red-950 border-black border-[1.5px] rounded-2xl flex flex-col" on:click={() => activateHint("coins", 3)}>
                <div class="w-full h-full mb-1">
                    <img class="object-contain h-8 mx-auto" src="/hints/selling_price_hint.png" alt="Selling Price"/>
                    <p class="text-center h-auto py-1 text-xs leading-none" style="text-shadow: black 0px 0px 5px;">Selling Price</p>
                    {#if submittedWeapons.length < 3 && !gameCompleted}
                        <p class="text-center h-auto py-1 text-xs leading-none" style="text-shadow: black 0px 0px 5px;">in {3 - submittedWeapons.length} tries</p>
                    {:else if !activeHint || activeHint != "coins" || gameCompleted && activeHint != "coins"}
                        <p class="text-center h-auto py-1 text-xs leading-none" style="text-shadow: black 0px 0px 5px;">click to reveal</p>
                    {:else if activeHint == "coins"}
                        <p class="text-center h-auto py-1 text-xs leading-none" style="text-shadow: black 0px 0px 5px;">click to hide</p>
                    {/if}
                </div>
            </button>
            <button class="w-full h-28 sm:h-24 py-2 px-[2px] bg-red-950 border-black border-[1.5px] rounded-2xl flex flex-col" on:click={() => activateHint("tooltip", 7)}>
                <div class="w-full h-fit mb-1">
                    <img class="object-contain h-8 mx-auto" src="/hints/tooltip_hint.png" alt="Selling Price"/>
                    <p class="text-center h-auto py-1 text-xs leading-none" style="text-shadow: black 0px 0px 5px;">Tooltip</p>
                    {#if submittedWeapons.length < 7 && !gameCompleted}
                        <p class="text-center h-auto py-1 text-xs leading-none" style="text-shadow: black 0px 0px 5px;">in {7 - submittedWeapons.length} tries</p>
                    {:else if !activeHint || activeHint != "tooltip" || gameCompleted && activeHint != "tooltip"}
                        <p class="text-center h-auto py-1 text-xs leading-none" style="text-shadow: black 0px 0px 5px;">click to reveal</p>
                    {:else if activeHint == "tooltip"}
                        <p class="text-center h-auto py-1 text-xs leading-none" style="text-shadow: black 0px 0px 5px;">click to hide</p>
                    {/if}
                </div>
            </button>
            <button class="w-full h-28 sm:h-24 py-2 px-[2px] bg-red-950 border-black border-[1.5px] rounded-2xl flex flex-col" on:click={() => activateHint("image", 11)}>
                <div class="w-full h-fit mb-1">
                    <img class="object-contain h-8 mx-auto" src="/hints/image_hint.png" alt="Selling Price"/>
                    <p class="text-center h-auto py-1 text-xs leading-none" style="text-shadow: black 0px 0px 5px;">Image</p>
                    {#if submittedWeapons.length < 11 && !gameCompleted}
                        <p class="text-center h-auto py-1 text-xs leading-none" style="text-shadow: black 0px 0px 5px;">in {11 - submittedWeapons.length} tries</p>
                    {:else if !activeHint || activeHint != "image" || gameCompleted && activeHint != "image"}
                        <p class="text-center h-auto py-1 text-xs leading-none" style="text-shadow: black 0px 0px 5px;">click to reveal</p>
                    {:else if activeHint == "image"}
                        <p class="text-center h-auto py-1 text-xs leading-none" style="text-shadow: black 0px 0px 5px;">click to hide</p>
                    {/if}
                </div>
            </button>
        </div>
        {#if activeHint == "coins"}
            <div transition:slide class="bg-red-950 border-black border-[1.5px] mx-2 mt-2 h-10 rounded-2xl flex items-center justify-center">
                <p class="text-center text-sm leading-none {correctWeapon.sellValue.includes("Gold") ? "text-amber-300" : correctWeapon.sellValue.includes("Silver") ? "text-gray-400" : "text-amber-700"}" style="text-shadow: black 0px 0px 5px;">{correctWeapon.sellValue}</p>
            </div>
        {:else if activeHint == "tooltip"}
            <div transition:slide class="bg-red-950 border-black border-[1.5px] mx-2 mt-2 h-10 rounded-2xl flex items-center justify-center">
                <p class="text-center text-sm leading-none p-2" style="text-shadow: black 0px 0px 5px;">{correctWeapon.tooltip != null ? correctWeapon.tooltip?.replace(/(?<=\w{2})[^\s!%&'",.?]/g, "-") : "No tooltip"}</p>
            </div>
        {:else if activeHint == "image"}
            <div transition:slide class="bg-red-950 border-black border-[1.5px] mx-2 mt-2 h-10 rounded-2xl flex items-center justify-center">
                <img class="blur-sm" src={"/weapons/" + correctWeapon.name?.replace(/ /g, "_") + ".png"} alt="blurred">
            </div>
        {/if}
        <div class="w-full mt-3">
            {#if !gameCompleted}
                <form autocomplete="off" on:submit|preventDefault={() => { }}>
                    <div class="flex h-10 w-full px-2">
                        <input class="w-full rounded-xl p-2 bg-red-950 border-black border-[1.5px] text-white focus:outline focus:outline-2 focus:outline-red-400"  style="text-shadow: black 0px 0px 5px;" type="text" placeholder="Guess a weapon..." bind:value={input} on:input|stopPropagation={filterWeapons}/>
                        <button class="bg-red-950 rounded-xl size-10 ml-2 border-black border-[1.5px]" on:click={submitGuess}>
                            <img class="size-5 m-auto" src="/playbutton.png" alt="enter"/>
                        </button>
                    </div>
                    {#if filterWeaponsListOpen && filteredWeapons.length > 0}
                        <ul class="ml-2 w-[80%] sm:w-[340px] max-h-56 h-fit bg-red-950 rounded-xl absolute overflow-y-scroll no-scrollbar">
                            {#each filteredWeapons as weaponName, i}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                <li class="py-2 pl-3 flex items-center cursor-pointer hover:border-[2px] hover:border-red-400 hover:rounded-xl w-full h-14" on:click={() => {input=weaponName;}}>
                                    <div class="w-10 h-10 items-center flex justify-center">
                                        <img class="h-full object-scale-down" src={"/weapons/" + weaponName.replace(/ /g, "_") + ".png"} alt={weaponName}/>
                                    </div>
                                    <p class="p-5 text-lg" style="text-shadow: black 0px 0px 5px;">{weaponName}</p>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </form>
            {/if}
        </div>              
    </div>
</div>
<!--Correct item image and description-->
{#if gameCompleted}
    <div transition:fade class="w-full h-fit flex flex-col items-center justify-center">
        <p class="text-lg" style="text-shadow: black 0px 0px 5px;">Guessed in {submittedWeapons.length == 1 ? submittedWeapons.length + " try!" : submittedWeapons.length + " tries!"}</p>
        <div class="bg-red-800/80 w-20 h-20 mt-2 flex items-center justify-center rounded-lg border-[1.5px] border-black">
            <img class="w-fit h-10" src={"/weapons/" + correctWeapon.name?.replace(/ /g, "_") + ".png"} alt={correctWeapon.name}/>
        </div>
        <div class="bg-red-800/80 w-[90%] sm:w-80 h-fit rounded-lg mt-2 border-[1.5px] border-black px-3 py-4">
            <p class="leading-4 py-1" style="color:{rarityColors[correctWeapon.rarity]}; text-shadow: black 0px 0px 5px;">{correctWeapon.name}</p>
            <p class="leading-4 py-1" style="text-shadow: black 0px 0px 5px;">{correctWeapon.damage} {correctWeapon.damagetype} damage</p>
            <p class="leading-4 py-1" style="text-shadow: black 0px 0px 5px;">{correctWeapon.knockback}</p>
            <p class="leading-4 py-1" style="text-shadow: black 0px 0px 5px;">{correctWeapon.useSpeed}</p>
            {#if correctWeapon.isMaterial}
                <p class="leading-4 py-1" style="text-shadow: black 0px 0px 5px;">Material</p>
            {/if}
            <p class="leading-4 py-1" style="text-shadow: black 0px 0px 5px;">{correctWeapon.tooltip}</p>
        </div>
        <div class="mt-3 py-2 w-20 rounded-lg bg-red-800 border-[1.5px] border-black  flex items-center justify-center">
            <button class="w-full h-full" on:click={reset}>Reset</button>
        </div>
    </div>
{/if}
<!--Submitted Guesses Area-->
<div class="w-full flex justify-center">
    <div class="px-4 w-full xl:w-fit overflow-x-scroll xl:overflow-auto">
        <div class="mt-5 mx-auto w-[1200px] bg-[rgb(160,20,20,0.8)] border-black border-[1.5px] gap-1 text-center items-center flex justify-center">
            <div class="w-32 text-[14px]" style="text-shadow: black 0px 0px 5px;">Item</div>
            <div class="w-32 text-[14px]" style="text-shadow: black 0px 0px 5px;">Damage Type</div>
            <div class="w-32 text-[14px]" style="text-shadow: black 0px 0px 5px;">Damage</div>
            <div class="w-32 text-[14px]" style="text-shadow: black 0px 0px 5px;">Knockback</div>
            <div class="w-32 text-[14px]" style="text-shadow: black 0px 0px 5px;">Use Speed</div>
            <div class="w-32 text-[14px]" style="text-shadow: black 0px 0px 5px;">Rarity</div>
            <div class="w-32 text-[14px]" style="text-shadow: black 0px 0px 5px;">Autoswing?</div>
            <div class="w-32 text-[14px]" style="text-shadow: black 0px 0px 5px;">Material?</div>
            <div class="w-32 text-[14px]" style="text-shadow: black 0px 0px 5px;">Obtained</div>
        </div>
        <ul class="w-[1200px]">
            {#each submittedWeapons as weapon (Object.keys(weapons).indexOf(weapon))}
                <li transition:scale class="mt-2 flex gap-1 justify-center">
                    <div class="flex w-[120px] h-16 mx-1 items-center justify-center bg-red-900/60 border-black border-[1.5px]">
                        <img class="max-w-10 max-h-10" src={"/weapons/" + weapon.replace(/ /g, "_") + ".png"} alt={weapon}/>
                    </div>
                    <div class="flex w-[120px] h-16 mx-1 items-center justify-center {weapons[weapon].damagetype == correctWeapon.damagetype ? "bg-green-600" : "bg-red-600"} border-black border-[1.5px]">
                        <p>{weapons[weapon].damagetype}</p>
                    </div>
                    <div class="flex w-[120px] h-16 mx-1 items-center justify-center {weapons[weapon].damage == correctWeapon.damage ? "bg-green-600" : "bg-red-600"} border-black border-[1.5px]">
                        <p class="w-[70%] text-center leading-none" style="text-shadow: black 0px 0px 5px;">{weapons[weapon].damage}</p>
                        {#if parseInt(weapons[weapon].damage) > parseInt(correctWeapon.damage)}
                            <p class="text-center pl-2" style="text-shadow: black 0px 0px 5px;">⬇</p>
                        {:else if parseInt(weapons[weapon].damage) < parseInt(correctWeapon.damage)}
                            <p class="text-center pl-2" style="text-shadow: black 0px 0px 5px;">⬆</p>
                        {/if}
                    </div>
                    <div class="flex w-[120px] h-16 mx-1 items-center justify-center {weapons[weapon].knockback == correctWeapon.knockback ? "bg-green-600" : "bg-red-600"} border-black border-[1.5px]">
                        <p class="w-[70%] text-center leading-none" style="text-shadow: black 0px 0px 5px;">{weapons[weapon].knockback?.replace(" Knockback", "")}</p>
                        {#if knockbacks.indexOf(weapons[weapon].knockback) > knockbacks.indexOf(correctWeapon.knockback)}
                            <p class="text-center pl-2" style="text-shadow: black 0px 0px 5px;">⬇</p>
                        {:else if knockbacks.indexOf(weapons[weapon].knockback) < knockbacks.indexOf(correctWeapon.knockback)}
                            <p class="text-center pl-2" style="text-shadow: black 0px 0px 5px;">⬆</p>
                        {/if}
                    </div>
                    <div class="flex w-[120px] h-16 mx-1 items-center justify-center {weapons[weapon].speed == correctWeapon.useSpeed ? "bg-green-600" : "bg-red-600"} border-black border-[1.5px]">
                        <p class="w-[70%] text-center leading-none" style="text-shadow: black 0px 0px 5px;">{weapons[weapon].speed?.replace(" Speed", "")}</p>
                        {#if useSpeeds.indexOf(weapons[weapon].speed) < useSpeeds.indexOf(correctWeapon.useSpeed)}
                            <p class="text-center pl-2" style="text-shadow: black 0px 0px 5px;">⬇</p>
                        {:else if useSpeeds.indexOf(weapons[weapon].speed) > useSpeeds.indexOf(correctWeapon.useSpeed)}
                            <p class="text-center pl-2" style="text-shadow: black 0px 0px 5px;">⬆</p>
                        {/if}
                    </div>
                    <div class="flex w-[120px] h-16 mx-1 items-center justify-center {weapons[weapon].rarity == correctWeapon.rarity ? "bg-green-600" : "bg-red-600"} border-black border-[1.5px]">
                        <img class="w-[fit] text-center leading-none pr-1" src={"/rarities/" + weapons[weapon].rarity + ".png"} alt="weapons[weapon].rarity"/>
                        {#if parseInt(weapons[weapon].rarity) > parseInt(correctWeapon.rarity)}
                            <p class="text-center pl-2" style="text-shadow: black 0px 0px 5px;">⬇</p>
                        {:else if parseInt(weapons[weapon].rarity) < parseInt(correctWeapon.rarity)}
                            <p class="text-center pl-2" style="text-shadow: black 0px 0px 5px;">⬆</p>
                        {/if}
                    </div>
                    <div class="flex w-[120px] h-16 mx-1 items-center justify-center {weapons[weapon].isAutoSwing == correctWeapon.isAutoSwing ? "bg-green-600" : "bg-red-600"} border-black border-[1.5px]">
                        {#if weapons[weapon].isAutoSwing == true}
                            <p style="text-shadow: black 0px 0px 5px;">Yes</p>
                        {:else}
                            <p style="text-shadow: black 0px 0px 5px;">No</p>
                        {/if}
                    </div>
                    <div class="flex w-[120px] h-16 mx-1 items-center justify-center {weapons[weapon].isMaterial == correctWeapon.isMaterial ? "bg-green-600" : "bg-red-600"} border-black border-[1.5px]">
                        {#if weapons[weapon].isMaterial == true}
                            <p style="text-shadow: black 0px 0px 5px;">Yes</p>
                        {:else}
                            <p style="text-shadow: black 0px 0px 5px;">No</p>
                        {/if}
                    </div>
                    {#if weapons[weapon].obtained.join(" ") == correctWeapon.obtained.join(" ")}
                        <div class="flex flex-col w-[120px] h-16 mx-1 items-center justify-center overflow-y-visible bg-green-600 border-black border-[1.5px]">
                            {#each weapons[weapon].obtained as method }
                                <p style="text-shadow: black 0px 0px 5px;">{method}</p>
                            {/each}
                        </div>
                    {:else if handleObtainedOverlaps(weapon) == true}
                        <div class="flex flex-col w-[120px] h-16 mx-1 items-center justify-center overflow-y-visible bg-orange-600 border-black border-[1.5px]">
                            {#each weapons[weapon].obtained as method }
                                <p style="text-shadow: black 0px 0px 5px;">{method}</p>
                            {/each}
                        </div>
                    {:else}
                        <div class="flex flex-col w-[120px] h-16 mx-1 items-center justify-center overflow-y-visible bg-red-600 border-black border-[1.5px]">
                            {#each weapons[weapon].obtained as method }
                                <p style="text-shadow: black 0px 0px 5px;">{method}</p>
                            {/each}
                        </div>
                    {/if}
                    
                </li>
            {/each}
        </ul>
    </div>
</div>
<!--Footer-->
<div class="mt-10 sm:mt-20 w-full flex flex-col items-center justify-center mb-4">
    <p class="text-lg">Inspired by 
        <a class="text-green-500 text-lg" href="https://terradle.com" target="_blank">Terradle</a> by
        <a class="text-yellow-500 text-lg" href="https://github.com/cxhuy" target="_blank">cxhuy</a>
    </p>
    <p class="text-lg">Made by
        <a class="text-red-500 text-lg" href="https://github.com/Obbaxobax" target="_blank">Obbax</a>
    </p>
</div>