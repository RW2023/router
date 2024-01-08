import { FC } from 'react';
import Heading from '@/components/ui/Heading';

interface Props {}

const page: FC<Props> = (): JSX.Element => {
  return (
    <div className="container  flex flex-col justify-center min-h-screen">
      <Heading title="about the run book" />
    </div>
  );
};

export default page;