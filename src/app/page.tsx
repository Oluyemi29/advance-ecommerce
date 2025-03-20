"use server";
import Category from "@/components/Category";
import Filter from "@/components/Filter";
import LatestProduct from "@/components/LatestProduct";
import { EmblaCarousel } from "@/components/Slider";
import { prisma } from "@/lib/prisma";
import AllProduct from "../components/AllProduct";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searching = await props.searchParams;
  // const {} =
  const query = searching.searchTerm;

  const products = await prisma.products.findMany({});
  const allProduct = await prisma.products.findMany({
    where: {
      OR: [
        {
          brand: {
            contains: query as string,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: query as string,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: query as string,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query as string,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <EmblaCarousel />
      <AllProduct products={query ? allProduct : products} />
      <LatestProduct products={products} />
      <Category products={products} />
      <Filter products={products} />
    </div>
  );
}
