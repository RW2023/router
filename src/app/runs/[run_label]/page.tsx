import Run from '@/components/runs/Run';
import { FC } from 'react';

interface Props {
  run_label: string;
}

const page: FC<Props> = ({run_label}): JSX.Element => {
  return (
    <Run run_label={run_label} />
  );
};

export default page;