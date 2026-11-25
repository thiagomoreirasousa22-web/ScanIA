import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import { toByteArray } from 'base64-js';
const url = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ?? '';
const key = process.env.EXPO_PUBLIC_SUPABASE_KEY?.trim() ?? '';

function isPublicKey(value: string) {
  if (/^sb_publishable_[A-Za-z0-9_-]+$/.test(value)) return true;
  try {
    const payload = value.split('.')[1];
    const bytes = toByteArray(payload.padEnd(Math.ceil(payload.length / 4) * 4, '='));
    return JSON.parse(String.fromCharCode(...bytes)).role === 'anon';
  } catch {
    return false;
  }
}

export const isConfigured =
  /^https:\/\/[a-z0-9.-]+\/?$/i.test(url) &&
  !url.toLowerCase().includes('seu-projeto') &&
  isPublicKey(key);
export const supabase = createClient(
  isConfigured ? url : 'https://localhost',
  isConfigured ? key : 'unconfigured',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: isConfigured,
      persistSession: isConfigured,
      detectSessionInUrl: false,
    },
  },
);
// Renova o token só enquanto o app está em primeiro plano.
if (isConfigured)
  AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });
