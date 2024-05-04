<script>
    import "../app.pcss";
</script>

<div class="h-screen w-full flex bg-black/30 backdrop-blur-sm overflow-auto">
    <div class="w-full">
        <div class="mt-8 w-full h-24 px-3">
            <img
                class="mx-auto w-80 drop-shadow-2xl -translate-y-[30%]"
                src="/logo.png"
                alt="logo"
            />
        </div>
        <slot />
        <div class="h-6" />
    </div>
</div>