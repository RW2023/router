import AuthForm from '@/components/forms/Auth';
import { FC } from 'react';

interface Props {}

const page: FC<Props> = (props): JSX.Element => {
  return (
    <div>
        <AuthForm />
    </div>
  );
};

export default page;