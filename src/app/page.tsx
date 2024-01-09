import Heading from '@/components/ui/Heading';
import SubHeading from '@/components/ui/SubHeading';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url('/img/hero4.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      data-theme="business"
    >
      <div className="hero-overlay bg-opacity-10"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <div className="bg-base-200 rounded-md  mx-auto p-2 m-1 border border-1">
            <Heading title="Run Book 2024" />
            <SubHeading title="route information application" />
          </div>
          <Link
          href="/devdash"
          >
            <button
              type="submit"
              className="btn btn-primary bg-button text-black"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
