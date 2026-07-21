// js/notifications.js — FCM client, token management, dismiss helpers
import { db, auth, USER_NODE } from './firebase.js';

let swRegistration = null;

export async function initNotifications() {
    // 1. Register service worker
    if (!('serviceWorker' in navigator)) return;
    
    try {
        swRegistration = await navigator.serviceWorker.register('/app/sw.js');
        console.log('[Notifications] SW registered');
    } catch (err) {
        console.warn('[Notifications] SW registration failed:', err);
        return;
    }

    // 2. Check if user already granted permission
    if ('Notification' in window && Notification.permission === 'granted') {
        await subscribeToPush();
    }

    // 3. Show enable button in settings (handled by settings.js)
    window._notificationsReady = true;
}

// Request permission and subscribe to FCM
export async function enableNotifications() {
    if (!('Notification' in window)) {
        alert('Twoja przeglądarka nie wspiera powiadomień.');
        return false;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        console.warn('[Notifications] Permission denied');
        return false;
    }

    return await subscribeToPush();
}

async function subscribeToPush() {
    try {
        if (!swRegistration) {
            swRegistration = await navigator.serviceWorker.ready;
        }

        const messaging = window.firebase.messaging();
        
        // VAPID key from Firebase Console → Project Settings → Cloud Messaging → Web Push certificates
        const VAPID_KEY = localStorage.getItem('bcore_vapid_key') || '';
        
        if (!VAPID_KEY) {
            console.warn('[Notifications] No VAPID key configured. Set it in Settings.');
            return false;
        }

        const token = await messaging.getToken({
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: swRegistration
        });

        if (token) {
            console.log('[Notifications] FCM Token:', token.substring(0, 20) + '...');
            // Save token to Firebase so GitHub Action can send to it
            await db.ref(USER_NODE + 'fcm_tokens/' + token.substring(0, 20)).set({
                token: token,
                device: navigator.userAgent.includes('iPhone') ? 'iPhone' : 
                        navigator.userAgent.includes('Windows') ? 'Windows' : 'Other',
                updated: new Date().toISOString()
            });
            return true;
        }
    } catch (err) {
        console.error('[Notifications] Subscribe failed:', err);
    }
    return false;
}

// Dismiss a notification by tag (called when user completes a task/expense)
export function dismissNotification(tag) {
    if (swRegistration) {
        navigator.serviceWorker.controller?.postMessage({
            type: 'DISMISS_NOTIFICATION',
            tag: tag
        });
    }
}

// Handle foreground messages (when app is open)
export function initForegroundMessaging() {
    try {
        const messaging = window.firebase.messaging();
        messaging.onMessage((payload) => {
            const data = payload.data || {};
            // Show as native notification even when app is in foreground
            if ('Notification' in window && Notification.permission === 'granted' && swRegistration) {
                swRegistration.showNotification(data.title || 'B-Core', {
                    body: data.body || '',
                    tag: data.tag || 'bcore-foreground',
                    icon: '/app/icons/icon-512.png',
                    data: { url: data.url || '/app/index.html' }
                });
            }
        });
    } catch (err) {
        // Messaging not available (e.g., no VAPID key yet)
    }
}
