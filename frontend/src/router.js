import { writable } from "svelte/store";
import { checkAuth } from "./store/authStore.js";

// Current route store
export const currentRoute = writable("/");

// Navigate function
export function navigate(path) {
  currentRoute.set(path);
}

// Check if route requires authentication
export async function canAccessRoute(path) {
  const protectedRoutes = ["/profile"];

  if (protectedRoutes.includes(path)) {
    // Check if user is logged in
    const isLoggedIn = await checkAuth();
    return isLoggedIn;
  }

  return true; // Public routes
}
