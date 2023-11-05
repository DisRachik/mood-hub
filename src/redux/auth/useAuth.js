import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectIsUpdateComponent, selectUser } from './selectors';
import { authSighUp, authSighIn, authSighOut, checkAuth, updateUserFoto } from './authOperations';

export const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const isUpdateComponent = useSelector(selectIsUpdateComponent);

  const sighUp = (userData) => dispatch(authSighUp(userData)).unwrap();

  const sighIn = (userData) => dispatch(authSighIn(userData)).unwrap();

  const signOut = () => dispatch(authSighOut());

  const checkUser = () => dispatch(checkAuth());

  const updateAvatar = (avatarURL) => dispatch(updateUserFoto(avatarURL));

  return { user, isLoading, isUpdateComponent, sighUp, sighIn, signOut, checkUser, updateAvatar };
};
