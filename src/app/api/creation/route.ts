import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const Checked = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!Checked) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.family_name,
        image: user.picture,
      },
    });
  }
  return redirect("/");
}
