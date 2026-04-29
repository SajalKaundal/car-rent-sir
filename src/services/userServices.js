const syncUser = async (user) => {
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    // get Firebase ID token
    const token = await user.getIdToken();

    const response = await fetch(`${API_URL}/user/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Sync failed");
    }

    return data;

  } catch (err) {
    console.error("Sync User Error:", err.message);
  }
};

export { syncUser };