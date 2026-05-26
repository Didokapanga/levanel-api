export const sanitizePartner = (
  partner: any
) => {

  return {
    id: partner.id,
    name: partner.name,
    type: partner.type,
    // phone: partner.phone,
    // email: partner.email,
    // address: partner.address,
    is_active: partner.is_active,
    created_at: partner.created_at,
    updated_at: partner.updated_at,
  };
};