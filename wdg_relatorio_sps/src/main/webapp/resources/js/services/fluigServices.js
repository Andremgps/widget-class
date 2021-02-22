const fluigServices = {
  async getDataset(dataset, constraints = [], orderFields = []) {
    const request = JSON.stringify({
      name: dataset,
      constraints,
      order: orderFields,
    });
    const response = await fetch("/api/public/ecm/dataset/datasets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: request,
    });
    return await response.json();
  },

  async getWidgetPreferences(instanceId) {
    const response = await fetch(`/api/public/2.0/pages/getWidgetPreferences/${instanceId}`);
    return response.json();
  },
};
