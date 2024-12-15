"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { isAxiosError } from "axios";
import api from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";

const postSchema = z.object({
  description: z.string().min(1, "Description is required"),
  image: z
    .any()
    .refine((file) => file?.size <= 5000000, "Max file size is 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file?.type),
      "Only JPEG, PNG, and GIF formats are allowed"
    ),
});

type PostFormData = z.infer<typeof postSchema>;

const CreatePostPage: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostFormData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("description", data?.description);
      formData.append("image", data?.image);

      const response = await api.post(`/api/users/${session?.user?.id}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        toast.success("Post created successfully!");
        reset();
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Describe your post"
              />
              {errors?.description && (
                <p className="text-red-500 text-sm">{errors?.description?.message as any}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input
                type="file"
                accept="image/*"
                {...register("image")}
              />
              {errors?.image && (
                <p className="text-red-500 text-sm">{errors?.image?.message as any}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting || loading}>
              {loading ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Creating Post...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreatePostPage;