<script>
  import '../app.css'; // Importing the main stylesheet
  import { darkModeEnabled } from '$lib/stores/AllPurposeStore';
</script>

<div class:dark={$darkModeEnabled} class="min-h-screen bg-background dark:bg-background-dark">
  <slot /> <!-- Placeholder for child content -->
</div>