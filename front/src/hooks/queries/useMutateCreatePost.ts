import {useMutation} from '@tanstack/react-query';
import {createPost} from '~/api';
import {UseMutationCustomOptions} from '~/types';

export default function useMutateCreatePost(
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: createPost,
    ...mutationOptions,
  });
}
