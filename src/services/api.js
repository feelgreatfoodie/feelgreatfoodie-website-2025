class ApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || "";
  }

  async request(endpoint, options = {}) {
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async submitNewsletter(email) {
    // Simulate API call for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Subscription successful",
        });
      }, 2000);
    });
  }

  async submitContactForm(formData) {
    // Simulate API call for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Message sent successfully",
        });
      }, 2000);
    });
  }

  async getRecipes() {
    // Simulate API call for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [],
        });
      }, 1000);
    });
  }
}

// Create and export instance
const apiService = new ApiService();
export default apiService;
