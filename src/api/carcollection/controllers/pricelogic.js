const { StateList, insuranceList } = require("./data");

const addPercentage = (number, percentage) => {
  return Math.floor(number * (percentage / 100));
};

const getInsurancePercentage = (price) => {
  for (const insurance of insuranceList) {
    if (price >= insurance.Min && price <= insurance.Max) {
      return Number(insurance.insurancePercentage);
    }
  }
  return 0;
};

const getFactor = (stateName, fuelType, price, displacement) => {
  const state = StateList.find((state) => state.StateName === stateName);
  const value = state?.FactorType === "Price" ? price : displacement;
  if (state) {
    for (const fuel of state.Factor) {
      if (
        (Array.isArray(fuel.FuelType) && fuel.FuelType.includes(fuelType)) ||
        fuel.FuelType === fuelType
      ) {
        if (value >= fuel.Min && value <= fuel.Max) {
          return Number(fuel.RoadTax);
        }
      }
    }
  }
  return 0;
};

module.exports = {addPercentage,getInsurancePercentage,getFactor}