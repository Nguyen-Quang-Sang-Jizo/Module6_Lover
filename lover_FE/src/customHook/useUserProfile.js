import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showUser } from '../services/useService';


export function useUserProfile() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken.idUser;

  const profile = useSelector((state) => {;
    if (state.user.profile?.data) {
      return state.user.profile.data;
    }
    return null;
  });

  useEffect(() => {
    dispatch(showUser(userId));
  }, [dispatch, userId]);

  return profile;
}
