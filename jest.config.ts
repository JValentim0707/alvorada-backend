import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/tests/**/*.test.ts'], // <- atualizado
  collectCoverage: true,
  coverageDirectory: 'coverage',
};

export default config;
