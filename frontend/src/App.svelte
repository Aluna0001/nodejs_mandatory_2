<script>
    import { onMount } from 'svelte';
    import { currentRoute, navigate, canAccessRoute } from './router.js';
    import { checkAuth, isAuthenticated } from './store/authStore.js';
    import Login from './pages/login.svelte';
    import Profile from './pages/profile.svelte';

    let currentComponent = Login;

    // Route mapping
    const routes = {
        '/': Login,
        '/profile': Profile
    };

    // Handle route changes
    async function handleRouteChange(route) {
        // Check if user can access this route
        const canAccess = await canAccessRoute(route);
        
        if (!canAccess) {
            // Redirect to login if not authenticated
            navigate('/');
            return;
        }

        // Set the correct component
        currentComponent = routes[route] || Login;
    }

    // Subscribe to route changes
    $: handleRouteChange($currentRoute);

    // Check authentication when app loads
    onMount(async () => {
        await checkAuth();
        
        // If we're on profile but not logged in, redirect
        if ($currentRoute === '/profile' && !$isAuthenticated) {
            navigate('/');
        }
    });
</script>

<main>
    <svelte:component this={currentComponent} />
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    main {
        min-height: 100vh;
    }
</style>