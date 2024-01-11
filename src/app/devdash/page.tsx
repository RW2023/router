'use client';
import { FC } from 'react';
import Heading from '@/components/ui/Heading';
import DevDash from '@/components/DevDash';

interface Props {}

const page: FC<Props> = (props): JSX.Element => {
  return (
    <div className="m-3">
      <Heading title="Dev Dash" />
      <DevDash />
    </div>
  );
};

export default page;
