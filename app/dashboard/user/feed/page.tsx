"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios, { isAxiosError } from "axios";
import { Heart, MessageCircle, Send, LoaderCircleIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const FeedPage: React.FC = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/users/${session?.user?.id}/posts?page=${page}`);
        setPosts(response?.data?.data);
        setTotalPages(response?.data?.totalPages);
      } catch (error: any) {
        if (isAxiosError(error)) {
          console.error(error?.response?.data?.message ?? "Something went wrong");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchPosts();
    }
  }, [session, page]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="container px-4 md:px-6 py-6">
          <ScrollArea className="w-full whitespace-nowra">
            <div className="flex w-max space-x-4 mt-10">
              {Array.from({ length: 10 })?.map((_, i) => (
                <Button key={i} variant="ghost" className="flex flex-col items-center space-y-2">
                  <div className="h-16 w-16 bg-gray-200 border-2 border-primary" />
                  <span className="text-xs">User {i + 1}</span>
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
        <section className="container px-4 md:px-6 py-6 space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoaderCircleIcon className="w-10 h-10 animate-spin" />
            </div>
          ) : (
            posts?.map((post: any, i: number) => (
              <Card key={post?.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-10 w-10 bg-gray-200 rounded-full" />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{post?.user?.name}</p>
                    <p className="text-xs text-muted-foreground">Posted {post?.createdAt}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <img
                    src={post?.imageUrl || `https://picsum.photos/seed/${i + 20}/600/400`}
                    alt={`Post ${i + 1}`}
                    className="w-full h-auto aspect-square object-cover"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-4 w-full">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="h-5 w-5" />
                      <span className="sr-only">Comment</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Send className="h-5 w-5" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </div>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">{post?.user?.name}</span> {post?.caption}
                    </p>
                    <p className="text-muted-foreground mt-1">View all {post?.commentsCount} comments</p>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </section>
        <section className="container px-4 md:px-6 py-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} />
              </PaginationItem>
              {Array.from({ length: totalPages })?.map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink href="#" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </main>
    </div>
  );
};

export default FeedPage;