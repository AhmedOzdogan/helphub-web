import 'dotenv/config';

declare const process: { env: { DATABASE_URL?: string } };

import { defineConfig } from 'prisma/config';

export default defineConfig({

  schema: 'prisma/schema.prisma',

  datasource: {

    url: process.env.DATABASE_URL,

  },

});