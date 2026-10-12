import { getCardById } from "@/content/demos/cards";
import { getService } from "@/content/services";

/**
 * Message pre-filled in the contact form when it is opened from a case study
 * or a service (?useCase=<id>). Only known ids resolve, so arbitrary query text
 * never reaches the form.
 */
export function getUseCasePrefill(id: string | null): string | undefined {
  if (!id) return undefined;
  const service = getService(id);
  if (service) return `I'd like to talk about ${service.name} for my team.`;
  const card = getCardById(id);
  if (card) return `I'd like to build something like “${card.title}” (${card.category}) for my team.`;
  return undefined;
}
