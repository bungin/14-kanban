import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // DO: return the decoded token
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    // DO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // DO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  getToken(): string {
    // DO: return the token
    const loggedUser = localStorage.getItem('token') || "";
    return loggedUser;
  }

  login(idToken: string) {
    // DO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // DO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // DO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // DO: redirect to the login page
    window.location.assign('/');

  }
}

export default new AuthService();
