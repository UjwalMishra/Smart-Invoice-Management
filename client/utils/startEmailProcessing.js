// frontend/utils/startEmailProcessing.js
import axios from "axios";

export const startEmailProcessing = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/automation/start",
      {},
      {
        withCredentials: true, // important if using cookies for auth
      }
    );
    console.log("✅ Email processing started:", res.data);
  } catch (err) {
    console.error(
      "❌ Failed to start email processing",
      err.response?.data || err.message
    );
  }
};
