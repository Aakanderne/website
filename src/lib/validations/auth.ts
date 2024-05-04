import { z } from 'zod';

export const userAuthSchema = z.object({
  email: z
    .string({ required_error: 'Email skal udfyldes' })
    .email('Email er ikke gyldig'),
});
