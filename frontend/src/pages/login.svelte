<script>
    import { signup, login } from '../store/authStore.js';
    import { navigate } from '../router.js';
    
    let email = '';
    let password = '';
    let isSignupMode = false;
    let loading = false;

    async function handleSubmit() {
        if (!email || !password) {
            return;
        }

        loading = true;

        if (isSignupMode) {
            const result = await signup(email, password);
            if (result.success) {
                navigate('/profile');
            }
        } else {
            const result = await login(email, password);
            if (result.success) {
                navigate('/profile');
            }
        }

        loading = false;
    }

    function toggleMode() {
        isSignupMode = !isSignupMode;
        email = '';
        password = '';
    }
</script>

<div class="container">
    <div class="auth-card">
        <h1>{isSignupMode ? 'Create User' : 'Log In'}</h1>
        
        <form on:submit|preventDefault={handleSubmit}>
            <div class="form-group">
                <label for="email">Email</label>
                <input 
                    type="email" 
                    id="email"
                    bind:value={email}
                    placeholder="your@email.com"
                    required
                />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input 
                    type="password" 
                    id="password"
                    bind:value={password}
                    placeholder="At least 6 characters"
                    required
                    minlength="6"
                />
            </div>

            <button type="submit" class="btn-primary" disabled={loading}>
                {loading ? 'Wait...' : (isSignupMode ? 'Create User' : 'Log In')}
            </button>
        </form>

        <p class="toggle-text">
            {isSignupMode ? 'Already have an account?' : "Don't have an account?"}
            <button class="btn-link" on:click={toggleMode}>
                {isSignupMode ? 'Log in here' : 'Create account here'}
            </button>
        </p>
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

    .auth-card {
        background: white;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        width: 100%;
        max-width: 400px;
    }

    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 30px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 5px;
        color: #555;
        font-weight: 500;
    }

    input {
        width: 100%;
        padding: 12px;
        border: 2px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
        transition: border-color 0.3s;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: #667eea;
    }

    .btn-primary {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
        transform: translateY(-2px);
    }

    .btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .toggle-text {
        text-align: center;
        margin-top: 20px;
        color: #666;
    }

    .btn-link {
        background: none;
        border: none;
        color: #667eea;
        cursor: pointer;
        font-weight: 600;
        text-decoration: underline;
    }

    .btn-link:hover {
        color: #764ba2;
    }
</style>