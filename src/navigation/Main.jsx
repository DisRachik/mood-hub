import { AuthNavigation } from './AuthNavigation';
import { useAuth } from './AuthProvider';
import { CollectionProvider } from './CollectionContext';
import { MainNavigation } from './MainNavigation';

export const Main = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
      {!isSignedIn ? (
        <AuthNavigation />
      ) : (
        <CollectionProvider>
          <MainNavigation />
        </CollectionProvider>
      )}
    </>
  );
};
