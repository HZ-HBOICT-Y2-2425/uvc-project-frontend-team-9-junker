<script>
    let userData = null;
  
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login'; // Redirect if not logged in
        return;
      }
  
      try {
        const response = await fetch('http://localhost:5001/api/protected', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        userData = await response.json();
      } catch (error) {
        console.error('Error fetching user data:', error);
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
  