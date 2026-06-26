import { db } from "@/db";
import { authors } from "@/db/schema";
import { ilike } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const {searchParams} = new URL(request.url);
        const query = searchParams.get("q");

        if(!query) {
            return NextResponse.json([]);

        }
        
        const filteredAuthors = await db
        .select({
            id:authors.id,
            name: authors.name,
            grade: authors.grade,
        })
        .from(authors)
        .where(ilike(authors.name, `%${query}%`))
        .limit(8);
        
        return NextResponse.json(filteredAuthors);
    }
    catch (error) {
        console.error("Erro na rota api/authors", error);
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        );
    }
}