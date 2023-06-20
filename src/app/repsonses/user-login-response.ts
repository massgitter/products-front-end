export interface UserLoginResponse {
  id: number;
  token: string;
  refreshToken: string;
  username: string;
  fullName: string;
  role: string
}
