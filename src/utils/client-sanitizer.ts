export const sanitizeClient = (client: any) => {
  return {
    id: client.id,
    name: client.name,
    client_type: client.client_type,
    phone: client.phone,
    email: client.email,
    address: client.address,
    contact_person: client.contact_person,
    tax_number: client.tax_number,
    created_at: client.created_at,
    updated_at: client.updated_at,
  };
};