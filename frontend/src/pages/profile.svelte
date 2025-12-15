<script>
    import { onMount } from 'svelte';
    import { user, logout } from '../store/authStore.js';
    import { navigate } from '../router.js';

    async function handleLogout() {
        await logout();
        navigate('/');
    }

    onMount(() => {
        console.log('Profile loaded for user:', $user);
    });
</script>

<div class="container">
    <div class="profile-card">
        <h1>👤 My Profile</h1>
        
        <div class="info-section">
            <p class="welcome">Welcome back!</p>
            
            {#if $user}
                <div class="user-info">
                    <div class="info-row">
                        <span class="label">Email:</span>
                        <span class="value">{$user.email}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">User ID:</span>
                        <span class="value">{$user.id}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Role:</span>
                        <span class="value">{$user.role}</span>
                    </div>
                </div>
            {/if}
        </div>

        <div class="success-message">
            <p>✅ You are now logged in!</p>
            <p>This is a protected page - only logged in users can see it.</p>
        </div>

        <button class="btn-logout" on:click={handleLogout}>
            Log Out
        </button>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 20px;
    }

    .profile-card {
        background: white;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        width: 100%;
        max-width: 500px;
    }

    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 30px;
    }

    .welcome {
        font-size: 20px;
        text-align: center;
        color: #555;
        margin-bottom: 30px;
    }

    .user-info {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .info-row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #dee2e6;
    }

    .info-row:last-child {
        border-bottom: none;
    }

    .label {
        font-weight: 600;
        color: #666;
    }

    .value {
        color: #333;
    }

    .success-message {
        background: #d4edda;
        border: 1px solid #c3e6cb;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
        text-align: center;
    }

    .success-message p {
        margin: 10px 0;
        color: #155724;
    }

    .btn-logout {
        width: 100%;
        padding: 12px;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
    }

    .btn-logout:hover {
        background: #c82333;
        transform: translateY(-2px);
    }
</style>