<script>
	import LoginModal from './../lib/layouts/LoginModal.svelte';
    import Nav from '$lib/layouts/nav.svelte';
    import {db} from '$lib/firebase.js';
    import { doc ,getDocs,onSnapshot,addDoc,collection } from 'firebase/firestore';
    import user from '$lib/layouts/Loginmodal.svelte';
    import { writable } from 'svelte/store';
    // console.log(user);
    const usersStore = writable([])
    let isEditing = false;

    let id
    
    let data = {
        name : '',
        age: '',
        sex: '',
        id: Math.floor(Math.random() * 10 * 100)
    }
    
    let users;

    let docRef = collection(db,'poeple');
     const getData = async () =>{
        let check = await getDocs(docRef)
        const users = []
        try{
            check.forEach(doc => {
                    users.push(doc.data()) 
                });
            console.log(users);
            usersStore.set(users);
        }catch(e){
            console.log(e)
        }
    }
    getData();

    usersStore.subscribe( $users => users = $users);

    // onSnapshot(collection(db,'people') , (docs) => {
    //     // users.push(docs.data());
    //     // console.log(users);

    // })
    // console.log(users);


    const submit = (e) => {
         e.preventDefault();
        let user = [{
            name: data.name,
            age: data.age,
            sex: data.sex,
            id: Math.floor(Math.random() * 10 )
        }]

        try{
             addDoc( collection(db,'poeple'),data)
                    
                    .then(resp => {
                        console.log(resp.id);
                        
                        document.forms[0].reset();
                                            
                    } )
             
                    .catch(e => {
                        console.log(e) 
                    }); 

            // console.log(add.id);
        }catch(e){
            console.log(e);
        }

        // users = users.concat(user);
    }
    
    const edit = (id) => {
        id = id;
        isEditing = true;
        let i = users.filter( item => { return item.id === id })
        console.log(i);
        data = i[0];
        return users.find
    }
    const save = (e)=>{
        e.preventDefault();
       let found =  users.findIndex( item => item.id == id )
       if(isEditing == true){
           users[found] = data;
           return document.forms[0].reset();
       }
       return;
    }
    const del= (i) => {
        
       users = users.filter( item => item.id != i )
    console.error(users);
    }
    let isLoggedin = false;
</script>

<Nav />
{#if !isLoggedin}
    <LoginModal { isLoggedin}/>
{/if}
<title>HOME</title>


        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 mb-3 mt-4 ">
                    <h1>Hello from Svelte</h1>

                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">Full Name:</label>
                            <input type="text" bind:value={ data.name} name="name"  class="form-control name" placeholder="Enter Name">
                        </div>
    
                        <div class="row">
                            <div class="mb-3  col-sm-6">
                                <label for="age" class="form-label">Age </label>
                                <input type="number" bind:value={ data.age } name="age" id="age" class="form-control">
                            </div>
    
                            <div class="mb-3 col-sm-6">
                                <label for="gender" class="form-label">Gender </label>
                                <input type="text" name="gender" bind:value={ data.sex} id="sex" class="form-control">
                            </div>
    
                        </div>
                    {#if !isEditing}
                        <div class="mb-3">
                            <button type="submit" class="btn btn-sm btn-dark" on:click={submit}>Create New Users</button>
                        </div>
                    {:else}
                        <div class="mb-3">
                            <button type="submit" class="btn btn-sm btn-dark" on:click={save}>Save Changes</button>
                        </div>
                    {/if}
                    </form>
                </div>
                <div class="col-md-6">  
                        <table class="table table-striped table-hover">
                            <thead>
                                <th>Name </th>
                                <th>Age </th>
                                <th>Sex </th>
                                <th>Actions</th>

                            </thead>
                            <tbody>
                                {#each  users as user }
                                   <!-- <p>{user}</p> -->
                                    <tr>
                                        <td>
                                            { user.name}
                                        </td>
                                        <td>
                                            { user.age}
                                        </td>
                                        <td>
                                            {user.sex}
                                        </td>

                                        <td>
                                            <button class="btn btn-sm btn-success" on:click={() => edit(user.id)}>Edit</button>
                                            <button class="btn btn-sm btn-danger" on:click={ () => del(users.id) }>Delete</button>
                                        </td>
                                    </tr>
                                {/each}

                            </tbody>
                        </table>
                </div>
            </div>
           
        </div>
 