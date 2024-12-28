import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '../../api/auth';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../../types/common';
import {removeEncryptedStorage, setEncryptedStorage} from '../../utils';
import {removeHeader, setHeader} from '../../utils/header';
import {useEffect} from 'react';
import queryClient from '../../api/queryClient';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptedStorage('refreshToken', refreshToken);
    },
    onSettled: () => {
      queryClient.refetchQueries({queryKey: ['auth', 'getAccessToken']});
      queryClient.invalidateQueries({queryKey: ['auth', 'getProfile']});
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const {isSuccess, data, isError} = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    queryFn: getAccessToken,
    staleTime: 1000 * 60 * 27,
    refetchInterval: 1000 * 60 * 27,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptedStorage('refreshToken', data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptedStorage('refreshToken');
    }
  }, [isError]);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryFn: getProfile,
    queryKey: ['auth', 'getProfile'],
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptedStorage('refreshToken');
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['auth']});
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
  };
}

export default useAuth;
