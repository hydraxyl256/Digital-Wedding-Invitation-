import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase";

const schema = z.object({
  guest_name: z.string().min(1, "Name is required").max(100),
  email: z.string().optional(),
  attending: z.boolean(),
  events: z.array(z.string()).optional(),
  num_guests: z.number().int().min(1).max(20).default(1),
  children: z.boolean().nullable().optional(),
  children_details: z.array(z.object({ name: z.string(), diet: z.string() })).optional(),
  meal_preference: z.string().max(100).optional(),
  message: z.string().max(3000).optional(),
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

    const data = parsed.data;

    // Compile dynamic fields into the message to avoid breaking the Supabase schema
    let childrenStr = data.children === true ? "Yes" : data.children === false ? "No" : "Unspecified";
    if (data.children === true && data.children_details?.length) {
      childrenStr += ` (${data.children_details.length})\n` + data.children_details.map((c, i) => `  Child ${i+1}: ${c.name || 'Unspecified'} (Diet: ${c.diet || 'None'})`).join("\n");
    }

    const compiledMessage = `Email: ${data.email || "N/A"}
Events: ${data.events && data.events.length > 0 ? data.events.join(", ") : "None"}
Children: ${childrenStr}

Message:
${data.message || "No additional message."}`;

    const supabase = createServerClient();
    const { error } = await supabase.from("rsvp_responses").insert({
      guest_name: data.guest_name,
      attending: data.attending,
      num_guests: data.num_guests,
      meal_preference: data.meal_preference || null,
      message: compiledMessage,
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
