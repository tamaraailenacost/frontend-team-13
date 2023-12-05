// apiService.js
const baseUrl = "https://giulianocharra.pythonanywhere.com/api";

export async function fetchData(endpoint, method = "GET", body = null) {
  /**
   * Realiza una petición a la API
   * @param {string} endpoint - El endpoint de la API
   * @param {string} method - El método HTTP
   * @param {Object} body - El cuerpo de la petición
   * @returns {Promise<Object>} - Los datos de la respuesta
   * @throws {Error} - Si hay un error en la petición
   * @example
   * const data = await fetchData("clases", "POST", { nombre: "Yoga" });
   */
  try {
    const url = `${baseUrl}/${endpoint}`;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error (${response.status}): ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in API request: ${error.message}`);
    throw error;
  }
}
