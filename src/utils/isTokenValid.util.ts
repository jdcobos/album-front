import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";

export const isTokenValid = (token: string ): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return false;
    return Date.now() < decoded.exp * 1000;
  } catch {
    return false;
  }
};
