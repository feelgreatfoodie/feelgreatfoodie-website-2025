import { useState, useCallback } from "react";
import { NOTIFICATION_TYPES } from "../config";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(
    (message, type = NOTIFICATION_TYPES.INFO, duration = 5000) => {
      const id = Date.now() + Math.random();
      const notification = { id, message, type, duration };

      setNotifications((prev) => [...prev, notification]);

      // Auto-remove after duration
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, duration);

      return id;
    },
    []
  );

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess: useCallback(
      (message, duration) =>
        addNotification(message, NOTIFICATION_TYPES.SUCCESS, duration),
      [addNotification]
    ),
    showError: useCallback(
      (message, duration) =>
        addNotification(message, NOTIFICATION_TYPES.ERROR, duration),
      [addNotification]
    ),
    showWarning: useCallback(
      (message, duration) =>
        addNotification(message, NOTIFICATION_TYPES.WARNING, duration),
      [addNotification]
    ),
    showInfo: useCallback(
      (message, duration) =>
        addNotification(message, NOTIFICATION_TYPES.INFO, duration),
      [addNotification]
    ),
  };
};
