// NavigationService.ts
export default class NavigationService {
    static navigate: ((to: string) => void) | null = null;
  
    static setNavigate(navigateFunc: (to: string) => void) {
      NavigationService.navigate = navigateFunc;
    }
  
    static goToLogin() {
      if (NavigationService.navigate) {
        NavigationService.navigate('/login');
      } else {
        console.error('Navigate function is not set');
      }
    }

    static goToRegister() {
        if (NavigationService.navigate) {
          NavigationService.navigate('/register');
        } else {
          console.error('Navigate function is not set');
        }
      }

    static goToHome() {
        if (NavigationService.navigate) {
          NavigationService.navigate('/home');
        } else {
          console.error('Navigate function is not set');
        }
      }
  }
  