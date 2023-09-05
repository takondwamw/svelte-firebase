<script>
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'

    const id = $page.params.slug.split('/');
    console.log(id);
    const home = ()=>{
        return goto("/",{ replaceState:true})
    }
</script>
<div class="container-fluid">
    <div class="row">
        <div class="jumbotron jumbotron-success p-2">
            {#each id as url}
            <button class="btn btn-dark btn-lg" on:click={home}>{url} </button>
            {/each}
        </div>
    </div>
</div>