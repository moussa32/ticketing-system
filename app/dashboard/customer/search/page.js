

import {searchFAQs} from "@/features/customer-dashboard/search/actions/action.js";
import {SearchBoxHTML} from "@/features/customer-dashboard/search/components/SearchBoxHTML.js";

export default async function SearchHome({ searchParams }) {
  const search = searchParams?.query || "";
  const response = await searchFAQs(search);
  const results = response.data || [];
 
  return (
    <SearchBoxHTML search={search} results={results} />
  );
}
