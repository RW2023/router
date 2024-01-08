import Heading from '@/components/ui/Heading';
import Image from 'next/image'

export default function Home() {
  return (
    <div className="container  flex flex-col justify-center">
     <div className='text-center'>
       <Heading title="the Run Book 2024" />
     </div>
      {/* Here I will include other components like RunList, etc. */}
    </div>
  );
}
