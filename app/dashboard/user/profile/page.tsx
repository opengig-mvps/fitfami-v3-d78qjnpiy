"use client";

import React, { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { LoaderCircleIcon, Edit3, Save, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    bio: "",
  });

  useEffect(() => {
    if (!session) return;

    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${session?.user?.id}`);
        setUserInfo({
          username: res?.data?.data?.username,
          bio: res?.data?.data?.bio,
        });
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${session?.user?.id}/posts`);
        setPosts(res?.data?.data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
    fetchUserPosts();
  }, [session]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/users/${session?.user?.id}`, userInfo);
      if (res?.data?.success) {
        toast.success("Profile updated successfully!");
        setEditing(false);
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

  const handleInputChange = (e: any) => {
    const { name, value } = e?.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              name="username"
              value={userInfo?.username}
              onChange={handleInputChange}
              disabled={!editing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              name="bio"
              value={userInfo?.bio}
              onChange={handleInputChange}
              disabled={!editing}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          {editing ? (
            <>
              <Button variant="outline" onClick={() => setEditing(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit}>
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </CardFooter>
      </Card>
      <h2 className="text-2xl font-bold my-6">Your Posts</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <LoaderCircleIcon className="animate-spin w-10 h-10" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts?.map((post: any) => (
            <Card key={post?.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={post?.authorAvatar} />
                  <AvatarFallback>{post?.authorInitials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{post?.authorName}</p>
                  <p className="text-xs text-muted-foreground">
                    Posted {new Date(post?.createdAt).toLocaleString()}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <img
                  src={post?.imageUrl}
                  alt={`Post by ${post?.authorName}`}
                  className="w-full h-auto aspect-square object-cover"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <p>{post?.caption}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;