export const sanitizeAirline = (
  airline: any
) => {

  return {
    id: airline.id,
    code: airline.code,
    name: airline.name,
    logo: airline.logo,
    country: airline.country,
    is_active: airline.is_active,
    created_at: airline.created_at,
    updated_at: airline.updated_at,
  };
};