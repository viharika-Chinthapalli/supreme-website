import { useContext } from 'react';
import { ContactContext } from '@/contexts/ContactContext';
import { ContactContextType } from '@/types';

export function useContact(): ContactContextType {
  const context = useContext(ContactContext);
  
  if (context === undefined) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  
  return context;
}