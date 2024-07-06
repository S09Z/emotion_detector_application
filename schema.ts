// src/schemas.ts
import { z } from 'zod';

// Example schema for a user object
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18),
});

export type User = z.infer<typeof UserSchema>;
