import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase";

const schema = z.object({
  guest_name: z.string().min(1, "Name is required").max(100),
  attending: z.boolean(),
  num_guests: z.number().int().min(1).max(10).default(1),
  meal_preference: z.string().max(100).optional(),
  message: z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { error } = await supabase.from("rsvp_responses").insert({
      guest_name: parsed.data.guest_name,
      attending: parsed.data.attending,
      num_guests: parsed.data.num_guests,
      meal_preference: parsed.data.meal_preference || null,
      message: parsed.data.message || null,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save RSVP. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("RSVP route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
