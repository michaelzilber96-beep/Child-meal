'use client';

import { useEffect, useState } from 'react';
import { ChildProfile } from '@/types';
import { loadStorage, saveProfile } from '@/lib/storage';

export function useProfile() {
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storage = loadStorage();
    setProfile(storage.profile);
    setLoading(false);
  }, []);

  function updateProfile(p: ChildProfile) {
    saveProfile(p);
    setProfile(p);
  }

  return { profile, loading, updateProfile };
}
