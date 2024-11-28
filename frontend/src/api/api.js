const API_BASE_URL = "http://localhost:5001/api/v1";


export async function getSets() {
  try {
    const response = await fetch(`${API_BASE_URL}/sets`);
    if (!response.ok) {
      throw new Error(`Error fetching sets: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSetById(setId) {
  try {
    const response = await fetch(`${API_BASE_URL}/sets/${setId}`);
    if (!response.ok) {
      throw new Error(`Error fetching set: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
