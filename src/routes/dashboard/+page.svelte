<script>
  import { browser } from "$app/environment";

  /**
   * @type {{ username: string; } | null}
   */
  let userData;

  const fetchUserData = async () => {
    if (!browser) return;

    const token = localStorage.getItem("token");
    const username = JSON.parse(localStorage.getItem("username") || '""');

    if (!token) {
      window.location.href = "/login"; // Redirect if not logged in
      return;
    }

    try {
      const response = await fetch(`http://localhost:3012/user/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      userData = await response.json();
      console.log(userData);

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  fetchUserData();
</script>

<main>
  <h1>Dashboard</h1>
  {#if userData}
    <p>Welcome, {userData.username}!</p>
  {/if}
</main>
