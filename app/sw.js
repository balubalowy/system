// sw.js — Service Worker for B-Core PWA
// Handles push notifications and notification click events

// Firebase Messaging integration for background push
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAmHUmkWe6SG5YR8hkYOB8ZVLKG5giLerI",
    authDomain: "system-operacyjny.firebaseapp.com",
    projectId: "system-operacyjny",
    messagingSenderId: "471093064554",
    appId: "1:471093064554:web:bf0d140f83cc4623cf6b13"
});

const messaging = firebase.messaging();

// Handle background push messages (when app is not in foreground)
messaging.onBackgroundMessage((payload) => {
    const data = payload.data || {};
    const title = data.title || 'B-Core';
    const options = {
        body: data.body || '',
        tag: data.tag || 'bcore-general',
        icon: '/app/icons/icon-512.png',
        badge: '/app/icons/icon-512.png',
        data: { url: data.url || '/app/index.html' },
        requireInteraction: data.requireInteraction === 'true',
        silent: false
    };
    return self.registration.showNotification(title, options);
});

// Handle notification click — open the relevant page
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data?.url || '/app/index.html';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            // If a B-Core tab is already open, focus it and navigate
            for (const client of windowClients) {
                if (client.url.includes('/app/') && 'focus' in client) {
                    client.focus();
                    client.navigate(url);
                    return;
                }
            }
            // Otherwise open a new window
            return clients.openWindow(url);
        })
    );
});

// Handle notification dismiss message from the app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'DISMISS_NOTIFICATION') {
        const tag = event.data.tag;
        self.registration.getNotifications({ tag }).then(notifications => {
            notifications.forEach(n => n.close());
        });
    }
});

// Basic offline cache (optional, lightweight)
const CACHE_NAME = 'bcore-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});
