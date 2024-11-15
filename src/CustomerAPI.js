export function fetchCustomers() {
  return fetch(import.meta.env.VITE_CUSTOMER_API_URL).then((response) => {
    if (!response.ok) {
      throw new Error("Error in fetch: " + response.statusText);
    } else {
      return response.json();
    }
  });
}
