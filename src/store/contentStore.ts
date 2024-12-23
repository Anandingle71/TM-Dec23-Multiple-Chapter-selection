import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase/types';

type Content = Database['public']['Tables']['content']['Row'];
type ContentInsert = Database['public']['Tables']['content']['Insert'];

interface ContentState {
  recentContent: Content[];
  loading: boolean;
  error: string | null;
  fetchRecentContent: () => Promise<void>;
  saveContent: (data: Omit<ContentInsert, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
}

export const useContentStore = create<ContentState>((set) => ({
  recentContent: [],
  loading: false,
  error: null,

  fetchRecentContent: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      set({ recentContent: data || [] });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch content';
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  saveContent: async (data) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('content')
        .insert({
          user_id: user.id,
          ...data,
          metadata: data.metadata || {},
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving content:', error);
        throw error;
      }

      // Refresh content after saving
      const { fetchRecentContent } = useContentStore.getState();
      await fetchRecentContent();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save content';
      set({ error: message });
      throw error;
    }
  }
}));