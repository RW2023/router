'use client'
import { FC } from 'react';
import Heading from '@/components/ui/Heading';
import DevDash from '@/components/DevDash';
import Driver from '@/components/forms/Driver';
import SubHeading from '@/components/ui/SubHeading';

interface Props {}

const page: FC<Props> = (props): JSX.Element => {
  return (
    <div className='m-3'>
        <Heading title="Dev Dash" />
        <DevDash />
        <SubHeading title="Driver Form" />
        <Driver />
    </div>
  );
};

export default page;