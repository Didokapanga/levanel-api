export const sanitizeSystem = (
  system: any
) => {

  return {
    id: system.id,
    name: system.name,
    initial: system.initial,
    description: system.description,
    is_active: system.is_active,
    created_at: system.created_at,
    updated_at: system.updated_at,
  };
};