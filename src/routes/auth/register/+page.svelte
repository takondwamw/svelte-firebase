<script> 
    let data = {
        email:'',
        password:''
    }   
    </script>
    <div class="container-fluid">
        <div class="row offset-md-3">
            <div class="mb-3  col-sm-6">
                <label for="age" class="form-label">Age </label>
                <input type="number" bind:value={ data.email } name="email" id="age" class="form-control">
            </div>
    
            <div class="mb-3 col-sm-6">
                <label for="gender" class="form-label">Gender </label>
                <input type="password" name="password" bind:value={ data.password} id="sex" class="form-control">
            </div>
            <div class="mb-3-col-sm-12">
                <button class="btn btn-sm btn-dark">Sign Up</button>
            </div>
        </div>
    </div>