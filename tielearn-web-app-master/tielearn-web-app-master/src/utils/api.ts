export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function authHeader(token: string | null) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
