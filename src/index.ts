import { createRouter } from 'stencil-router-v2';

export { Components, JSX } from './components';

import { defineCustomElements } from "@infineon/infineon-design-system-stencil/loader";

defineCustomElements(window);

export const Router = createRouter();
