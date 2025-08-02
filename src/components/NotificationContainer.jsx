import React from "react";
import { useNotifications } from "../hooks/useNotifications";

const NotificationItem = ({ notification, onRemove }) => {
  const getIcon = (type) => {
    const icons = {
      success: "check-circle",
      error: "exclamation-triangle",
      warning: "exclamation-circle",
      info: "info-circle",
    };
    return icons[type] || "info-circle";
  };

  return (
    <div
      className={`alert alert-${notification.type} alert-dismissible fade show notification-toast`}
    >
      <i className={`fas fa-${getIcon(notification.type)} me-2`} />
      {notification.message}
      <button
        type="button"
        className="btn-close"
        onClick={() => onRemove(notification.id)}
        aria-label="Close"
      />
    </div>
  );
};

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div
      className="notification-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
