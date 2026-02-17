export interface LineItem {
  description: string;
  amount: string;
  category: string;
}

export interface AnalysisResult {
  vendor_name: string | null;
  total_amount: string | null;
  executive_summary: string | null;
  line_items: LineItem[];
  flagged_charges: string[];
  potential_savings: string[];
}
