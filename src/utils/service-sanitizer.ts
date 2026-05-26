export const sanitizeService = (
  service: any
) => {

  return {
    id: service.id,
    name: service.name,
    initial: service.initial,
    description: service.description,
    color: service.color,
    icon: service.icon,
    is_active: service.is_active,
    created_at: service.created_at,
    updated_at: service.updated_at,
  };
};