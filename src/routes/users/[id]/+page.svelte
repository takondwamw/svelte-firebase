<script>
    import { page } from '$app/stores'
    const id = $page.params.id;
</script>
<div class="container-fluid">
    <div class="row">
        <div class="jumbotron jumbotron-success">
            hello user, { id};
        </div>
    </div>
</div>