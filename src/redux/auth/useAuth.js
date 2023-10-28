import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading, selectUser } from './selectors';
import { authSighUp, authSighIn } from './authOperations';

export const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const sighUp = (userData) => dispatch(authSighUp(userData)).unwrap();

  const sighIn = (userData) => dispatch(authSighIn(userData)).unwrap();

  return { user, isLoading, error, sighUp, sighIn };
};
