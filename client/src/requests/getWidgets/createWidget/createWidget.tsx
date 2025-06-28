export const createWidget = async (content: string) => {
  const url = 'http://localhost:3000/create-widget'

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create widget');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating widget:', error);
    throw error;
  }
};