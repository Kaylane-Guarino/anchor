"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

import { useRouter, useSearchParams } from "next/navigation";

type SearchPaginationProps = {
  currentPage: number;
  totalPages: number;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export function SearchPagination({
  currentPage,
  totalPages,
}: SearchPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function goToPage(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    router.push(`/search?${params.toString()}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => goToPage(currentPage - 1)}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer border border-gray-200 rounded-md text-secondary-text"
            }
          />
        </PaginationItem>

        {pages.map((page, index) =>
          page === "..." ? (
            <PaginationItem className="text-gray-200" key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => goToPage(Number(page))}
                className={cn(
                  "cursor-pointer border rounded-md",
                  currentPage === page
                    ? "border-primary"
                    : "text-gray-200 border-gray-200",
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => goToPage(currentPage + 1)}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer border border-gray-200 rounded-md text-secondary-text"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
