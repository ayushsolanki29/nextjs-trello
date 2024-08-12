import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "Card description is required",
        invalid_type_error: "Card description must be a string",
      })
      .min(3, {
        message: "Card description must be at least 3 characters long.",
      })
  ),
  title: z.optional(
    z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
      })
      .min(3, {
        message: "Title must be at least 3 characters long.",
      })
  ),
  id: z.string(),
});
