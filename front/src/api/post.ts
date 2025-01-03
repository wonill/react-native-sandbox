import {ImageUri, Post} from '~/types';
import axiosInstance from './axios';

// 아이디만 제외한 Post 타입과 ImageUri 타입을 합친 것
type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

type ResponsePost = Post & {images: ImageUri[]};

const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

export {createPost};
export type {RequestCreatePost, ResponsePost};
