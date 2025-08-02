import { CONFIG } from "../config";

class LocalStorageService {
  isAvailable() {
    try {
      const test = "__localStorage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  get(key, defaultValue = null) {
    if (!this.isAvailable()) return defaultValue;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  }

  set(key, value) {
    if (!this.isAvailable()) return false;

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  }

  remove(key) {
    if (!this.isAvailable()) return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  }

  // App-specific methods
  getFavorites() {
    return this.get(CONFIG.storage.favorites, []);
  }

  setFavorites(favorites) {
    return this.set(CONFIG.storage.favorites, favorites);
  }

  getNewsletterStatus() {
    return this.get(CONFIG.storage.newsletter, "not_subscribed");
  }

  setNewsletterStatus(status) {
    return this.set(CONFIG.storage.newsletter, status);
  }

  getUserPreferences() {
    return this.get("fgf_user_preferences", {});
  }

  setUserPreferences(preferences) {
    return this.set("fgf_user_preferences", preferences);
  }
}

// Create and export instance
const localStorageService = new LocalStorageService();
export default localStorageService;
