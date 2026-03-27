import type { Firm } from "@/types/firm";
import type { ClassificationScores, ClassificationResult } from "@/types/classification";

export interface AIClassificationAdapter {
  isEnabled(): boolean;
  scoreOverride(
    firm: Firm,
    ruleScores: ClassificationScores
  ): Promise<Partial<ClassificationScores> | null>;
  generateNarrative(
    firm: Firm,
    result: Omit<ClassificationResult, "narrative">
  ): Promise<string | null>;
}

export class StubAIAdapter implements AIClassificationAdapter {
  isEnabled() {
    return false;
  }
  async scoreOverride(): Promise<null> {
    return null;
  }
  async generateNarrative(): Promise<null> {
    return null;
  }
}
