import type { InstructionType } from "./types";

export const responses: Map<InstructionType, string[]> = new Map<InstructionType, string[]>(
  [
    ['news', ['Hold on.', 'Please wait.', 'Give me a few seconds.']]
  ]
)
