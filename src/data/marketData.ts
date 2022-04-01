export const marketData = {
  get demand() {
    return JSON.parse(localStorage.getItem('market_demand') || '1');
  },
  set demand(val: number) {
    localStorage.setItem('market_demand', JSON.stringify(val));
  },
};
