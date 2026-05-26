export const sanitizeUser = (user: any) => {
  return {
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
  };
};