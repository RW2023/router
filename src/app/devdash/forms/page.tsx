import Heading from '@/components/ui/Heading';
import { FC } from 'react';
import Driver from '@/components/forms/Driver';
import SubHeading from '@/components/ui/SubHeading';
import Layout from './layout';

interface Props {}

const page: FC<Props> = (props): JSX.Element => {
  return (
    <Layout>
        <div>
          <Heading title="forms" iconClass="fas fa-file-signature" />
          <SubHeading title="Driver Form" />
          {/* Add Driver Form  */}
          <Driver />
        </div>
    </Layout>
  );
};

export default page;