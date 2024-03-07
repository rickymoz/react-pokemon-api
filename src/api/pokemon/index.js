import api from "..";

export const getPokemon = (pokemon) => {
  return api.get(`pokemon/${pokemon}`);
};
