// /app/api/competiteur/upload/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import csv from "csv-parser";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId"); // récupère l'user connecté

    if (!userId) {
      return NextResponse.json({ message: "userId requis" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const csvString = buffer.toString();

    // Parse CSV
    const rows: any[] = [];
    await new Promise((resolve, reject) => {
      const stream = require("stream");
      const readStream = new stream.Readable();
      readStream._read = () => {};
      readStream.push(csvString);
      readStream.push(null);

      readStream
        .pipe(csv())
        .on("data", (row) => rows.push(row))
        .on("end", resolve)
        .on("error", reject);
    });

    // Insert into DB avec le bon user_id !
    for (const row of rows) {
      await prisma.competitor.create({
        data: {
          firstname: row.firstname,
          lastname: row.lastname,
          birthday: new Date(row.birthday),
          club: row.club,
          country: row.country,
          weight: parseInt(row.weight, 10),
          rank: row.rank,
          gender: row.gender,
          user_id: parseInt(userId as string, 10), // <-- user connecté
        },
      });
    }

    return NextResponse.json({ message: "Import successful" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur lors de l'import" }, { status: 500 });
  }
}
