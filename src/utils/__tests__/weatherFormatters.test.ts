import {
  formatTemperature,
  formatWindSpeed,
  formatTime,
  formatVisibility,
  getWindDirection,
} from '../weatherFormatters';

describe('weatherFormatters', () => {
  describe('formatTemperature', () => {
    it('should format temperature correctly', () => {
      expect(formatTemperature(15.5)).toBe('16°C');
      expect(formatTemperature(0)).toBe('0°C');
      expect(formatTemperature(-5.7)).toBe('-6°C');
    });

    it('should handle invalid inputs', () => {
      expect(formatTemperature(NaN)).toBe('N/A°C');
      expect(formatTemperature(null as unknown as number)).toBe('N/A°C');
      expect(formatTemperature(undefined as unknown as number)).toBe('N/A°C');
      expect(formatTemperature('invalid' as unknown as number)).toBe('N/A°C');
    });
  });

  describe('formatWindSpeed', () => {
    it('should format wind speed correctly', () => {
      expect(formatWindSpeed(3.5)).toBe('13 km/h');
      expect(formatWindSpeed(0)).toBe('0 km/h');
      expect(formatWindSpeed(12.8)).toBe('46 km/h');
    });

    it('should handle invalid inputs', () => {
      expect(formatWindSpeed(NaN)).toBe('N/A km/h');
      expect(formatWindSpeed(null as unknown as number)).toBe('N/A km/h');
      expect(formatWindSpeed(undefined as unknown as number)).toBe('N/A km/h');
      expect(formatWindSpeed('invalid' as unknown as number)).toBe('N/A km/h');
    });

    it('should handle negative wind speed', () => {
      expect(formatWindSpeed(-5)).toBe('N/A km/h');
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      const timestamp = 1640995200;
      const result = formatTime(timestamp);
      expect(result).toMatch(/\d{2}:\d{2}/);
    });

    it('should handle invalid inputs', () => {
      expect(formatTime(NaN)).toBe('N/A');
      expect(formatTime(null as unknown as number)).toBe('N/A');
      expect(formatTime(undefined as unknown as number)).toBe('N/A');
      expect(formatTime('invalid' as unknown as number)).toBe('N/A');
    });
  });

  describe('formatVisibility', () => {
    it('should format visibility correctly', () => {
      expect(formatVisibility(10000)).toBe('10 km');
      expect(formatVisibility(0)).toBe('0 km');
      expect(formatVisibility(5000)).toBe('5 km');
    });

    it('should handle invalid inputs', () => {
      expect(formatVisibility(NaN)).toBe('N/A km');
      expect(formatVisibility(null as unknown as number)).toBe('N/A km');
      expect(formatVisibility(undefined as unknown as number)).toBe('N/A km');
      expect(formatVisibility('invalid' as unknown as number)).toBe('N/A km');
    });

    it('should handle negative visibility', () => {
      expect(formatVisibility(-1000)).toBe('N/A km');
    });
  });

  describe('getWindDirection', () => {
    it('should return correct wind direction', () => {
      expect(getWindDirection(0)).toBe('N');
      expect(getWindDirection(45)).toBe('NE');
      expect(getWindDirection(90)).toBe('E');
      expect(getWindDirection(135)).toBe('SE');
      expect(getWindDirection(180)).toBe('S');
      expect(getWindDirection(225)).toBe('SW');
      expect(getWindDirection(270)).toBe('W');
      expect(getWindDirection(315)).toBe('NW');
    });

    it('should handle edge cases', () => {
      expect(getWindDirection(360)).toBe('N');
      expect(getWindDirection(720)).toBe('N');
    });

    it('should handle invalid inputs', () => {
      expect(getWindDirection(NaN)).toBe('N/A');
      expect(getWindDirection(null as unknown as number)).toBe('N/A');
      expect(getWindDirection(undefined as unknown as number)).toBe('N/A');
      expect(getWindDirection('invalid' as unknown as number)).toBe('N/A');
    });
  });
});
