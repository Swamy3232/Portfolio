import React from 'react';
import { Home } from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="py-24 sm:py-32 text-center">
      <Container size="narrow">
        <div className="space-y-6">
          <span className="text-6xl font-bold font-heading text-accent">404</span>
          <h1 className="text-3xl font-bold text-primary font-heading">
            Page Not Found
          </h1>
          <p className="text-secondary max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="pt-2">
            <Button to="/" variant="primary" icon={Home}>
              Back to Home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
