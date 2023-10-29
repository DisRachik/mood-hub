import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectIsRefreshing, selectUser } from './selectors';
import { authSighUp, authSighIn, authSighOut, checkAuth } from './authOperations';

export const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const isRefreshing = useSelector(selectIsRefreshing);

  const sighUp = (userData) => dispatch(authSighUp(userData)).unwrap();

  const sighIn = (userData) => dispatch(authSighIn(userData)).unwrap();

  const signOut = () => dispatch(authSighOut());

  const checkUser = () => dispatch(checkAuth());

  return { user, isLoading, isRefreshing, sighUp, sighIn, signOut, checkUser };
};
