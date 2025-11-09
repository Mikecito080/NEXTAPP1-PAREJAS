import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://random-d.uk/api/v2/random");
    const data = await res.json();

    return NextResponse.json(data, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    return NextResponse.json({ error: "No se pudo obtener el pato 🦆" }, { status: 500 });
  }
}
