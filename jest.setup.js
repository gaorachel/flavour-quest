import '@testing-library/jest-dom/extend-expect';

import { ResizeObserver } from './mocks/resizeObserverMock';

global.ResizeObserver = ResizeObserver;

import { matchMediaMock } from './mocks/matchMediaMock';

global.matchMedia = matchMediaMock;
