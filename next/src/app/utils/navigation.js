import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return { navigateTo };
};