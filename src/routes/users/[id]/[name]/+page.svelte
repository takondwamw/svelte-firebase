<script>
    import { page } from '$app/stores'
    const id = $page.params.id;
    const name = $page.params.name;
</script>
<div class="container-fluid">
    <div class="row">
        <div class="jumbotron jumbotron-success">
            hello user, { id} - {name};
        </div>
    </div>
</div>