import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 1. Config Setup
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// 2. Validation Logic (To prevent crashes if env is missing)
const isPlaceholder = (v?: string) => !v || /(YOUR(_[A-Z_]+)?|your-project-id)/i.test(String(v));
const missing: string[] = [];
if (isPlaceholder(firebaseConfig.apiKey)) missing.push('VITE_FIREBASE_API_KEY');
if (isPlaceholder(firebaseConfig.authDomain)) missing.push('VITE_FIREBASE_AUTH_DOMAIN');
if (isPlaceholder(firebaseConfig.projectId)) missing.push('VITE_FIREBASE_PROJECT_ID');
if (isPlaceholder(firebaseConfig.appId)) missing.push('VITE_FIREBASE_APP_ID');

let app: ReturnType<typeof initializeApp> | null = null;

if (missing.length === 0) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (err) {
    console.warn('[Firebase] Initialization failed. Check env.', err);
  }
} else {
  console.warn('[Firebase] Missing/invalid env config. Skipping Firebase initialization. Missing:', missing.join(', '));
}

// 3. Exports
export const auth: ReturnType<typeof getAuth> | null = app ? getAuth(app) : null;
export const db: ReturnType<typeof getFirestore> | null = app ? getFirestore(app) : null;

// Storage bucket fix (Preserved from your code)
const rawBucket = firebaseConfig.storageBucket || '';
const normalizedBucket = rawBucket.endsWith('.firebasestorage.app') ? `${firebaseConfig.projectId}.appspot.com` : rawBucket;
export const storage: ReturnType<typeof getStorage> | null = app ? (normalizedBucket ? getStorage(app, `gs://${normalizedBucket}`) : getStorage(app)) : null;
export const isFirebaseReady = Boolean(app);
export default app;
export let appCheck: unknown = null;

if (app) {
  const isBrowser = typeof window !== 'undefined'
  const host = isBrowser ? window.location.hostname : ''
  const isLocalHost = ['localhost', '127.0.0.1', '::1'].includes(host)
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY

  if (isLocalHost) {
    // @ts-expect-error: global self property for App Check debug token
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN || true
    // Skip reCAPTCHA entirely on localhost to avoid console noise
    // App Check will be initialized only in production below
  } else if (siteKey && import.meta.env.PROD) {
    try {
      appCheck = initializeAppCheck(app, { provider: new ReCaptchaV3Provider(siteKey), isTokenAutoRefreshEnabled: true })
    } catch (err) {
      console.warn('App Check initialization failed (prod)', err)
    }
  }
}
