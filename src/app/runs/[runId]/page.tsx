import Run from '@/components/runs/Run';
import { FC } from 'react';

interface Props {
  id: number;
}

const page: FC<Props> = (): JSX.Element => {
  return (
<Run id />
  );
};

export default page;