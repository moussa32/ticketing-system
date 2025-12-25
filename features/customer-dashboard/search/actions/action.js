import {getAllFAQsByKeyword} from '../../../../lib/services/CustomerTicketService.js';

export async function searchFAQs(keyword) {
  const results= await getAllFAQsByKeyword(keyword);
  return { ok: true, data: results };
}