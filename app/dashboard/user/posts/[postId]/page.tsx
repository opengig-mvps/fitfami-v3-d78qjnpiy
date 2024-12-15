"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { isAxiosError } from "axios";
import { Heart, MessageCircle, LoaderCircleIcon, Plus } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";

const PostDetailPage: React.FC = () => {
  const { postId } = useParams();
  const { data: session } = useSession();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [comment, setComment] = useState<string>("");
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<any[]>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        setPost(res?.data?.data);
        setLikes(res?.data?.data?.likes);
        setComments(res?.data?.data?.comments);
        setIsLiked(res?.data?.data?.isLiked);
      } catch (error) {
        if (isAxiosError(error)) {
          console.error(error?.response?.data?.message);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleLike = async () => {
    try {
      const res = await api.post(`/api/posts/${postId}/like`, {
        userId: session?.user?.id,
      });

      if (res?.data?.success) {
        setIsLiked(!isLiked);
        setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const res = await api.post(`/api/posts/${postId}/comments`, {
        userId: session?.user?.id,
        comment,
      });

      if (res?.data?.success) {
        setComments((prev) => [...prev, res?.data?.data]);
        setComment("");
        toast.success("Comment added successfully!");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-8">
      <Card>
        <CardHeader>
          <CardTitle>{post?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{post?.content}</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleLike}>
              <Heart className={`h-5 w-5 ${isLiked ? "text-red-500" : ""}`} />
              <span className="sr-only">Like</span>
            </Button>
            <span>{likes} Likes</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Textarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e?.target?.value)}
              />
              <Button onClick={handleCommentSubmit}>
                {loading ? <LoaderCircleIcon className="animate-spin" /> : "Comment"}
              </Button>
            </div>
            <div className="space-y-2">
              {comments?.map((cmt: any, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="flex flex-col">
                    <span className="font-medium">{cmt?.user?.name}</span>
                    <p>{cmt?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostDetailPage;