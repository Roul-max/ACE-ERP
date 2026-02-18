import axios from "axios";

// Use Vercel environment variable if available,
// otherwise fallback to localhost for development
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const client = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
});

let requestCount = 0;

const showLoading = () => {
  if (requestCount === 0) {
    window.dispatchEvent(
      new CustomEvent("ui-loading", { detail: true })
    );
  }
  requestCount++;
};

const hideLoading = () => {
  requestCount--;
  if (requestCount <= 0) {
    requestCount = 0;
    window.dispatchEvent(
      new CustomEvent("ui-loading", { detail: false })
    );
  }
};

const showError = (message: string) => {
  window.dispatchEvent(
    new CustomEvent("ui-error", { detail: message })
  );
};

client.interceptors.request.use(
  (config) => {
    showLoading();

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    hideLoading();
    return response;
  },
  (error) => {
    hideLoading();

    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    showError(message);

    return Promise.reject(error);
  }
);

export default client;
