import { AuthNavigation } from './AuthNavigation';
import { useAuth } from './AuthProvider';
import { HomeNavigation } from './HomeNavigation';

export const Main = () => {
  const { isSignedIn } = useAuth();

  return <>{!isSignedIn ? <AuthNavigation /> : <HomeNavigation />}</>;
};
