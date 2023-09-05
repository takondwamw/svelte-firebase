<script> 
import {onMount} from 'svelte';

import { db , auth } from '$lib/firebase.js';
import { collection , addDoc ,getDoc} from 'firebase/firestore'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth';
// console.log(auth)
// await addDoc(collection(db,'users'),{ email:'takondwakapyola@gmail.com',password:'admin'});
// auth;
// db;
let data = {
    email:'',
    password:''
}
export let user = null;
let userCredential;
let Form;

export let isLogged;
//   let modalVisible = false;
  let Btn; 
  let Close;
  let Register = false;
  // Watch for changes in the isLogged prop
  onMount(() => {
    if (!isLogged ) {
        Btn.click();
    }else{
        Close.click();
        alert('well we now how that goes '+ user)
    }
  })

const register = async (e) => {
    e.preventDefault();
    if(data.email !== '' && data.password !== ''){
        try{
            userCredential = await createUserWithEmailAndPassword(auth,data.email,data.password);
            user = userCredential;
            // await addDoc(collection(db,'users'),
            //             {
            //                 email: data.email,
            //                 password: data.password
            //             }
            //       )
            // e.register();
            isLogged = true;
            // close modal;
            Close.click();
        }catch(e){
            alert(`sign up failed : ${e}`)
            // Form.reset();
            console.error(e);

            return isLogged;

        }
    }
    
    return alert('fields can not be left Empty');
   
}

const login = async (e) =>{
    e.preventDefault();
    if(data.email !== '' && data.password !== ''){
            try{
                userCredential = await signInWithEmailAndPassword(auth,data.email,data.password);
                user = userCredential.user.uid;
                console.log("logged in Sucessfully :" + user)
                isLogged = true;
                Close.click();
            }catch(e){
                console.error(`failed to login because of :  ${e}`)
                Form.reset()
                return isLogged;
            }
        }
        return console.log('fields can not be empty');



}
 
 const signup = ( ) => {  
    Form.reset(); 
    Register = true;
 };

</script>

<button type="button" id="Btn" bind:this={Btn} class="btn btn-primary d-none togle" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Launch static backdrop modal
</button>
  
<!-- Modal -->
  <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"  data-bs-backdrop="static" data-bs-keyboard="false" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" id="Close" bind:this={Close} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="myform bg-dark">
              <h1 class="text-center">Login Form</h1>
              <form id="Form" bind:this={Form}>
                  <div class="mb-3 mt-4">
                      <label for="exampleInputEmail1" class="form-label">Email address</label>
                      <input type="email" bind:value={data.email} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  </div>
                  <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Password</label>
                      <input type="password" bind:value={data.password } class="form-control" id="exampleInputPassword1">
                  </div>
                   {#if !Register}
                        <button type="submit" class="btn btn-light mt-3" on:click={login}>LOGIN</button>
                   {:else}
                        <button type="submit" class="btn btn-light mt-3" on:click={register}>Signup</button>
                   {/if}
                    <p>Not a member? <a href="" on:click={signup}>Signup now</a></p>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>
    .myform {
        max-width: 100%;
    }
    .modal-body {
        padding: 0;
    }
    .myform {
         box-shadow: 0 4px 6px 0 rgba(22, 22, 26, 0.18);
    }
    .modal-content {
    width: 80%;
    margin: 0 auto;
    }
    .modal-body {
    padding: 0;
    }
    .btn-close {
    position: absolute;
    right: 0;
    padding: 1em;
    }
    h1 {
    font-size: 2.3em;
    font-weight: bold;
    }
    .myform {
    padding: 2em;
    max-width: 100%;
    color: #fff;
    box-shadow: 0 4px 6px 0 rgba(22, 22, 26, 0.18);
    }
    @media (max-width: 576px) {
    .myform {
        max-width: 90%;
        margin: 0 auto;
    }
    }
    .form-control:focus {
    box-shadow: inset 0 -1px 0 #7e7e7e;
    }
    .form-control {
    background-color: inherit;
    color: #fff;
    padding-left: 0;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #fff;
    }
    .myform .btn {
    width: 100%;
    font-weight: 800;
    background-color: #fff;
    border-radius: 0;
    padding: 0.5em 0;
    }
    .myform .btn:hover {
    background-color: inherit;
    color: #fff;
    border-color: #fff;
    }
    p {
    text-align: center;
    padding-top: 2em;
    color: grey;
    }
    p a {
    color: #e1e1e1;
    text-decoration: none;
    }
    p a:hover {
    color: #fff;
    }
  </style>