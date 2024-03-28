import { FC } from 'react';
import Runs from '@/components/runs/Runs';
import Heading from '@/components/ui/Heading';
import SubHeading from '@/components/ui/SubHeading';

interface Props {}

const page: FC<Props> = (props): JSX.Element => {
  return (
    <div className='flex flex-1 flex-col justify-center align-middle min-h-screen'>
        <div>
            <Heading title='Runs' />
            <SubHeading title='Select a run to view details' />
        </div>
        <Runs />
    </div>
  );
};

export default page;