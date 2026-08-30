import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(
  request: Request
) {
  try {
    const { name, email, password } =
      await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message:
            "Name, email and password are required",
        },
        { status: 400 }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: { email },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          message:
            "Email is already registered",
        },
        { status: 409 }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 12);

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },

        select: {
          id: true,
          name: true,
          email: true,
        },
      });

    return NextResponse.json(
      {
        message:
          "Registration successful",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}