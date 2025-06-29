export const deleteWidget = async (id: number) => {
  const url = "http://localhost:3000/delete-widget";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete widget");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error delete widget:", error);
    throw error;
  }
};
