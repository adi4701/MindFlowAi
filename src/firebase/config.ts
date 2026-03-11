'use client';

/**
 * Firebase configuration using environment variables.
 * We ensure values are strings to prevent 'trimEnd' or parsing errors in the SDK.
 */
export const firebaseConfig = {
  apiKey: String(process.env.NEXT_PUBLIC_FIREBASE_API_KEY || ''),
  authDomain: String(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || ''),
  projectId: String(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || ''),
  storageBucket: String(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || ''),
  messagingSenderId: String(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || ''),
  appId: String(process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '')
};

export const isConfigValid = 
  !!firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'undefined' &&
  !!firebaseConfig.projectId && 
  firebaseConfig.projectId !== 'undefined';
