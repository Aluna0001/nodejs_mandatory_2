import { writable } from "svelte/store";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

// Toastr configuration
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 3000,
};

const API_URL = "http://localhost:8080/api";

// User store
export const user = writable(null);
export const isAuthenticated = writable(false);

// Check if user is logged in
export async function checkAuth() {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      user.set(data.user);
      isAuthenticated.set(true);
      return true;
    } else {
      user.set(null);
      isAuthenticated.set(false);
      return false;
    }
  } catch (error) {
    console.error("Auth check error:", error);
    user.set(null);
    isAuthenticated.set(false);
    return false;
  }
}

// Signup
export async function signup(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      user.set(data.user);
      isAuthenticated.set(true);
      toastr.success("User created! 🎉");
      return { success: true };
    } else {
      toastr.error(data.error || "Signup failed");
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error("Signup error:", error);
    toastr.error("Could not create user");
    return { success: false, error: "Network error" };
  }
}

// Login
export async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      user.set(data.user);
      isAuthenticated.set(true);
      toastr.success("Login successful! 👋");
      return { success: true };
    } else {
      toastr.error(data.error || "Login failed");
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error("Login error:", error);
    toastr.error("Could not log in");
    return { success: false, error: "Network error" };
  }
}

// Logout
export async function logout() {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      user.set(null);
      isAuthenticated.set(false);
      toastr.info("Logged out 👋");
      return { success: true };
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
}
