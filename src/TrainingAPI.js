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
