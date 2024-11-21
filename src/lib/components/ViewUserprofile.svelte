<script>
    import SubHeader from "./SubHeader.svelte";
    import DarkModeSwitch from "./DarkModeSwitch.svelte";
  
    export let userData;
    // console.log(userData);
</script>

<SubHeader />
<div class="p-4">
    <div>Welcome to the Userprofile-View</div>
    <div>Welcome, {userData.username}</div>
    <DarkModeSwitch />
</div>

<style>
</style>
