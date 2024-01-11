import React, { FC } from 'react';
import Heading from '@/components/ui/Heading';

interface Props {}

const AboutPage: FC<Props> = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="container p-4 bg-base-200">
        <Heading title="About the LHLS Run Book App" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 bg-base-300 p-2 rounded-box">
          {/* Purpose of the App */}
          <div className="card bg-base-300 shadow-xl border border-1">
            <div className="card-body">
              <h2 className="card-title">Purpose</h2>
              <p>
                The LHLS Run Book App is designed to digitize and enhance the
                traditional paper run book used in LHLS operations. It
                streamlines processes, reduces paper usage, and improves
                accessibility and efficiency.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="card bg-base-300 shadow-xl border border-1">
            <div className="card-body">
              <h2 className="card-title">Features</h2>
              <ul>
                <li>Easy-to-navigate digital run book</li>
                <li>Real-time updates and notifications</li>
                <li>Secure data storage and access</li>
                <li>Customizable templates and fields</li>
              </ul>
            </div>
          </div>

          {/* Benefits */}
          <div className="card bg-base-300 shadow-xl border border-1">
            <div className="card-body">
              <h2 className="card-title">Benefits</h2>
              <ul>
                <li>Enhanced operational efficiency</li>
                <li>Eco-friendly solution reducing paper waste</li>
                <li>Improved data accuracy and reporting</li>
                <li>Accessible anywhere, anytime</li>
              </ul>
            </div>
          </div>

          {/* How to Get Started */}
          <div className="card bg-base-300 shadow-xl border border-1">
            <div className="card-body">
              <h2 className="card-title">Getting Started</h2>
              <p>
                Get started with the LHLS Run Book App by signing up,
                customizing your dashboard, and exploring its intuitive features
                designed to make your LHLS management seamless and efficient.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
