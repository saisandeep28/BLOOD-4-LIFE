import { useAuthStore } from '../lib/stores/auth-store';
import { UserRole } from '../lib/types';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const setAuth = useAuthStore((state) => state.setAuth);

  const checkRole = (roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return {
    user,
    isAuthenticated,
    logout,
    setAuth,
    checkRole,
    isDonor: checkRole([UserRole.DONOR]),
    isHospital: checkRole([UserRole.HOSPITAL]),
    isBloodBank: checkRole([UserRole.BLOOD_BANK]),
    isAdmin: checkRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
  };
}
