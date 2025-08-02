import React, { createContext, useContext, useReducer, useEffect } from "react";
import localStorageService from "../services/localStorage";
import analyticsService from "../services/analytics";

// Initial state
const initialState = {
  user: {
    preferences: {},
    favorites: [],
    newsletterStatus: "not_subscribed",
  },
  ui: {
    theme: "auto",
    isLoading: false,
    notifications: [],
  },
  app: {
    isInitialized: false,
    version: "1.0.0",
  },
};

// Action types
const ActionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_USER_PREFERENCES: "SET_USER_PREFERENCES",
  SET_FAVORITES: "SET_FAVORITES",
  SET_NEWSLETTER_STATUS: "SET_NEWSLETTER_STATUS",
  SET_THEME: "SET_THEME",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",
  CLEAR_NOTIFICATIONS: "CLEAR_NOTIFICATIONS",
  SET_INITIALIZED: "SET_INITIALIZED",
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        ui: { ...state.ui, isLoading: action.payload },
      };

    case ActionTypes.SET_USER_PREFERENCES:
      return {
        ...state,
        user: { ...state.user, preferences: action.payload },
      };

    case ActionTypes.SET_FAVORITES:
      return {
        ...state,
        user: { ...state.user, favorites: action.payload },
      };

    case ActionTypes.SET_NEWSLETTER_STATUS:
      return {
        ...state,
        user: { ...state.user, newsletterStatus: action.payload },
      };

    case ActionTypes.SET_THEME:
      return {
        ...state,
        ui: { ...state.ui, theme: action.payload },
      };

    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: [...state.ui.notifications, action.payload],
        },
      };

    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(
            (notification) => notification.id !== action.payload
          ),
        },
      };

    case ActionTypes.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        ui: { ...state.ui, notifications: [] },
      };

    case ActionTypes.SET_INITIALIZED:
      return {
        ...state,
        app: { ...state.app, isInitialized: action.payload },
      };

    default:
      return state;
  }
};

// Create contexts
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize app on mount
  useEffect(() => {
    const initializeApp = () => {
      try {
        // Load user preferences from localStorage
        const preferences = localStorageService.getUserPreferences();
        const favorites = localStorageService.getFavorites();
        const newsletterStatus = localStorageService.getNewsletterStatus();

        dispatch({
          type: ActionTypes.SET_USER_PREFERENCES,
          payload: preferences,
        });
        dispatch({ type: ActionTypes.SET_FAVORITES, payload: favorites });
        dispatch({
          type: ActionTypes.SET_NEWSLETTER_STATUS,
          payload: newsletterStatus,
        });

        // Initialize analytics
        analyticsService.init();

        // Mark as initialized
        dispatch({ type: ActionTypes.SET_INITIALIZED, payload: true });

        console.log("🍴 FeelGreatFoodie app initialized successfully!");
      } catch (error) {
        console.error("Error initializing app:", error);
      }
    };

    initializeApp();
  }, []);

  // Save user data to localStorage when it changes
  useEffect(() => {
    if (state.app.isInitialized) {
      localStorageService.setUserPreferences(state.user.preferences);
    }
  }, [state.user.preferences, state.app.isInitialized]);

  useEffect(() => {
    if (state.app.isInitialized) {
      localStorageService.setFavorites(state.user.favorites);
    }
  }, [state.user.favorites, state.app.isInitialized]);

  useEffect(() => {
    if (state.app.isInitialized) {
      localStorageService.setNewsletterStatus(state.user.newsletterStatus);
    }
  }, [state.user.newsletterStatus, state.app.isInitialized]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

// Custom hooks to use the context
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within an AppProvider");
  }
  return context;
};

// Action creators
export const appActions = {
  setLoading: (isLoading) => ({
    type: ActionTypes.SET_LOADING,
    payload: isLoading,
  }),

  setUserPreferences: (preferences) => ({
    type: ActionTypes.SET_USER_PREFERENCES,
    payload: preferences,
  }),

  setFavorites: (favorites) => ({
    type: ActionTypes.SET_FAVORITES,
    payload: favorites,
  }),

  setNewsletterStatus: (status) => ({
    type: ActionTypes.SET_NEWSLETTER_STATUS,
    payload: status,
  }),

  setTheme: (theme) => ({
    type: ActionTypes.SET_THEME,
    payload: theme,
  }),

  addNotification: (notification) => ({
    type: ActionTypes.ADD_NOTIFICATION,
    payload: {
      id: Date.now() + Math.random(),
      timestamp: Date.now(),
      ...notification,
    },
  }),

  removeNotification: (id) => ({
    type: ActionTypes.REMOVE_NOTIFICATION,
    payload: id,
  }),

  clearNotifications: () => ({
    type: ActionTypes.CLEAR_NOTIFICATIONS,
  }),
};

// Export action types for external use
export { ActionTypes };
