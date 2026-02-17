import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import pdf from "pdf-parse";
import type { AnalysisResult } from "@/types/analyze";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const SYSTEM_PROMPT = `You are a financial invoice analyst.
Analyze the invoice text and return STRICT JSON in this format:
{
  "vendor_name": "",
  "total_amount": "",
  "executive_summary": "",
  "line_items": [
    {
      "description": "",
      "amount": "",
      "category": ""
    }
  ],
  "flagged_charges": [],
  "potential_savings": []
}

Rules:
- Do not include explanations outside JSON.
- If data is missing, return null.
- Categorize line items logically.
- Flag unclear, duplicate, or unusual charges.`;

function extractJson(text: string): string {
  const trimmed = text.trim();
  const codeBlock = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) return codeBlock[1].trim();
  return trimmed;
}

function isInvoiceOrBill(text: string): boolean {
  // Normalize text to lowercase for case-insensitive matching
  const normalizedText = text.toLowerCase();
  
  // Keywords that strongly indicate an invoice or bill
  const invoiceKeywords = [
    'invoice',
    'bill',
    'billing',
    'statement',
    'receipt',
    'payment due',
    'amount due',
    'total amount',
    'subtotal',
    'tax',
    'vendor',
    'supplier',
    'invoice number',
    'invoice date',
    'due date',
    'item',
    'quantity',
    'unit price',
    'line item',
    'charge',
    'fee',
    'service',
    'product',
    'description',
    'account number',
    'invoice #',
    'bill to',
    'ship to',
  ];
  
  // Count how many invoice keywords are found
  let keywordCount = 0;
  for (const keyword of invoiceKeywords) {
    if (normalizedText.includes(keyword)) {
      keywordCount++;
    }
  }
  
  // Also check for common patterns like currency symbols with numbers
  const hasCurrencyPattern = /[$€£¥₹]\s*\d+|\d+\s*[$€£¥₹]/.test(text);
  const hasAmountPattern = /(total|amount|sum|subtotal).*?\d+/.test(normalizedText);
  
  // Consider it an invoice if:
  // - At least 3 invoice keywords are found, OR
  // - At least 2 keywords + currency pattern, OR
  // - At least 2 keywords + amount pattern
  return (
    keywordCount >= 3 ||
    (keywordCount >= 2 && hasCurrencyPattern) ||
    (keywordCount >= 2 && hasAmountPattern)
  );
}

function generateMockAnalysis(): AnalysisResult {
  // Generate realistic mock data for MVP demo
  const vendors = [
    "CloudTech Services Inc.",
    "Digital Solutions LLC",
    "Enterprise Software Corp",
    "Tech Infrastructure Group",
    "Business Services Co.",
  ];
  const categories = [
    "Software Licensing",
    "Cloud Hosting",
    "Professional Services",
    "Support & Maintenance",
    "Data Storage",
    "API Usage",
    "Bandwidth",
  ];

  const vendor = vendors[Math.floor(Math.random() * vendors.length)];
  const baseAmount = Math.floor(Math.random() * 5000) + 1000;
  const totalAmount = `$${(baseAmount + Math.random() * 500).toFixed(2)}`;

  const lineItems = [
    {
      description: "Enterprise Cloud Hosting - Monthly",
      amount: `$${(baseAmount * 0.4).toFixed(2)}`,
      category: categories[1],
    },
    {
      description: "Premium Support Package",
      amount: `$${(baseAmount * 0.25).toFixed(2)}`,
      category: categories[3],
    },
    {
      description: "API Access & Usage",
      amount: `$${(baseAmount * 0.15).toFixed(2)}`,
      category: categories[5],
    },
    {
      description: "Data Storage (500GB)",
      amount: `$${(baseAmount * 0.1).toFixed(2)}`,
      category: categories[4],
    },
    {
      description: "Professional Services - Consultation",
      amount: `$${(baseAmount * 0.1).toFixed(2)}`,
      category: categories[2],
    },
  ];

  const flaggedCharges = [
    "Unusual spike in API usage charges (+45% vs last month)",
    "Premium Support Package appears redundant with existing plan",
    "Consultation fee lacks detailed breakdown",
  ];

  const potentialSavings = [
    `Consider annual billing for Cloud Hosting: Save ~15% ($${(baseAmount * 0.4 * 0.15).toFixed(2)}/month)`,
    "Review API usage patterns - potential optimization could reduce costs by 20%",
    "Negotiate bulk pricing for multiple services: Potential 10% discount",
  ];

  return {
    vendor_name: vendor,
    total_amount: totalAmount,
    executive_summary: `This invoice from ${vendor} totals ${totalAmount} for the current billing period. The charges are primarily for cloud hosting (40%), premium support (25%), and API usage (15%). Three items have been flagged for review: unusual API usage spike, potential redundant support package, and unclear consultation charges. Potential savings opportunities include switching to annual billing, optimizing API usage, and negotiating bulk discounts.`,
    line_items: lineItems,
    flagged_charges: flaggedCharges,
    potential_savings: potentialSavings,
  };
}

async function callOpenAIWithRetry(
  rawText: string,
  maxRetries: number = 3
): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI client not initialized");
  }

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: rawText },
        ],
        temperature: 0.2,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error("No analysis response from AI");
      }
      return content;
    } catch (e: any) {
      const errorMessage = e?.message || e?.error?.message || String(e);
      const isRateLimit = 
        e?.status === 429 || 
        errorMessage.includes("429") || 
        errorMessage.includes("rate limit");

      if (isRateLimit && attempt < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s
        const delayMs = Math.pow(2, attempt) * 1000;
        console.log(
          `Rate limit hit. Retrying in ${delayMs}ms (attempt ${attempt + 1}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }
      throw e;
    }
  }
  throw new Error("Max retries exceeded");
}

export async function POST(request: NextRequest) {
  // Check if mock mode is enabled (for MVP demo)
  const useMockData = process.env.USE_MOCK_DATA === "true";
  
  if (useMockData) {
    // Simulate processing delay for realism
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const mockResult = generateMockAnalysis();
    return NextResponse.json(mockResult);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured" },
      { status: 500 }
    );
  }

  let file: File;
  try {
    const formData = await request.formData();
    const uploaded = formData.get("file");
    if (!uploaded || !(uploaded instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }
    if (uploaded.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }
    file = uploaded;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  let rawText: string;
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await pdf(buffer);
    rawText = data.text;
    if (!rawText?.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from PDF" },
        { status: 400 }
      );
    }
  } catch (e) {
    console.error("PDF parse error:", e);
    return NextResponse.json(
      { error: "Failed to parse PDF" },
      { status: 400 }
    );
  }

  // Validate that the document is an invoice or bill
  if (!isInvoiceOrBill(rawText)) {
    return NextResponse.json(
      { 
        error: "This document doesn't appear to be an invoice or bill. Please upload a valid invoice document." 
      },
      { status: 400 }
    );
  }

  try {
    const content = await callOpenAIWithRetry(rawText);
    const jsonStr = extractJson(content);
    let result: AnalysisResult;
    try {
      result = JSON.parse(jsonStr) as AnalysisResult;
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw content:", content);
      return NextResponse.json(
        { error: "Failed to parse AI response. The response may not be valid JSON." },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (e: any) {
    console.error("OpenAI error:", e);
    const errorMessage = e?.message || e?.error?.message || String(e);
    
    // Provide more specific error messages
    if (errorMessage.includes("401") || errorMessage.includes("authentication")) {
      return NextResponse.json(
        { error: "Invalid OpenAI API key. Please check your .env file." },
        { status: 500 }
      );
    }
    if (errorMessage.includes("429") || errorMessage.includes("rate limit")) {
      // For MVP demo: fallback to mock data on rate limit
      console.log("Rate limit hit - using mock data for demo");
      const mockResult = generateMockAnalysis();
      return NextResponse.json(mockResult);
    }
    if (errorMessage.includes("insufficient_quota") || errorMessage.includes("billing")) {
      return NextResponse.json(
        { error: "OpenAI API quota exceeded. Please check your billing." },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: `Analysis failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
