import '@testing-library/jest-dom';

process.env.NEXT_PUBLIC_WEATHER_API_KEY = 'test-api-key';

jest.mock('next/image', () => {
  return function MockImage({ src, alt, unoptimized, ...props }) {
    return <img src={src} alt={alt} unoptimized={unoptimized?.toString()} {...props} />;
  };
});