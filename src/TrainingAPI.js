export function fetchTrainings() {
  return fetch(import.meta.env.VITE_TRAINING_CUSTOMER_API_URL)
    .then((response) => {
      if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      throw new Error("Error fetching trainings: " + error.message);
    });
}

export function saveTraining(newTraining) {
  return fetch(import.meta.env.VITE_TRAINING_API_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newTraining),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in saving: " + response.statusText);

    return response.json();
  });
}

export function deleteTraining(url) {
  return fetch(url, { method: "DELETE" }).then((response) => {
    if (!response.ok)
      throw new Error("Error in delete: " + response.statusText);

    return response.json();
  });
}
