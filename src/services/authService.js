/**
 * Authentication service for Lexora
 * Handles user authentication, password reset, email verification
 */

import { supabase } from '../lib/supabaseClient';

/**
 * Send password reset email
 * @param {string} email - User email address
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function sendPasswordResetEmail(email) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Update user password
 * @param {string} newPassword - New password
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updatePassword(newPassword) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Resend verification email
 * @param {string} email - User email address
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function resendVerificationEmail(email) {
  try {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Update user email
 * @param {string} newEmail - New email address
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updateEmail(newEmail) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Sign out user
 * @returns {Promise<{error: Error|null}>}
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error };
  }
}

/**
 * Get current user session
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { data: data.session, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Get current user
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { data: user, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Delete user account
 * WARNING: This is a destructive operation
 * @returns {Promise<{error: Error|null}>}
 */
export async function deleteAccount() {
  try {
    // Note: Supabase doesn't have a direct delete user method from client
    // This should be done via an admin function or RPC call
    // For now, we'll use the management API if available
    const { error } = await supabase.rpc('delete_user_account');
    
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error };
  }
}
