export function fetchTrainings() {
  return fetch(import.meta.env.VITE_TRAINING_API_URL)
    .then((response) => {
      if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
      return response.json();
    })
    .then((data) => {
      // Fetch the customer data for each training
      const trainingWithCustomerPromises = data._embedded.trainings.map(
        async (training) => {
          const customerUrl = training._links.customer.href;
          console.log(customerUrl);
          const customerResponse = await fetch(customerUrl);
          if (!customerResponse.ok)
            throw new Error(
              "Error fetching customer: " + customerResponse.statusText
            );
          const customerData = await customerResponse.json();
          return { ...training, customer: customerData };
        }
      );

      return Promise.all(trainingWithCustomerPromises);
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
