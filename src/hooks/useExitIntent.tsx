
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useExitIntent = () => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [hasTriggeredThisSession, setHasTriggeredThisSession] = useState(false);
  const location = useLocation();

  // Check if user is on dashboard (logged in)
  const isLoggedIn = location.pathname.startsWith('/dashboard');

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Don't trigger if user is logged in (on dashboard) or already triggered this session
    if (isLoggedIn || e.clientY > 0 || hasTriggeredThisSession) {
      return;
    }

    // Only trigger if mouse leaves from the top and hasn't been triggered this session
    if (e.clientY <= 0) {
      setIsTriggered(true);
      setHasTriggeredThisSession(true);
      // Store in sessionStorage to persist across page navigations within the session
      sessionStorage.setItem('exitIntentTriggered', 'true');
    }
  }, [hasTriggeredThisSession, isLoggedIn]);

  useEffect(() => {
    // Don't set up exit intent if user is logged in
    if (isLoggedIn) {
      return;
    }

    // Check if already triggered this session
    const alreadyTriggered = sessionStorage.getItem('exitIntentTriggered');
    if (alreadyTriggered) {
      setHasTriggeredThisSession(true);
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave, isLoggedIn]);

  const resetTrigger = () => {
    setIsTriggered(false);
  };

  return { isTriggered, resetTrigger };
};
