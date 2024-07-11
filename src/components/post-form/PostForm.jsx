import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "", // check user Edit karne aaya ya new banane aaya hai.
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) { // agar post hai tho update karege.
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) { // purani image delet karo , update me.
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else { // agar post nahi hai tho new create karo.
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    // kaise hum jo name hai use without space hum convert kar rahe hai [(name:Marvel is hero => Marvel-is-hero)]
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")// regex to convert it. ^ negation in regex.
                .replace(/\s/g, "-");

        return "";
    }, []);
// Now question is how to use this slugTransform()
    React.useEffect(() => { // continously watch karte raho.
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe(); // optimization for memory optimization by storing it in value.
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-white shadow-md rounded-lg overflow-hidden divide-y divide-gray-200">
            <div className="w-full md:w-2/3 px-4 py-6">
                <Input
                    label="Title"
                    placeholder="Enter title"
                    {...register("title", { required: true })}
                    className="mb-4"
                />
                <Input
                    label="Slug"
                    placeholder="Enter slug"
                    {...register("slug", { required: true })}
                    className="mb-4"
                    onChange={(e) => setValue("slug", slugTransform(e.target.value), { shouldValidate: true })}
                />
                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                    className="mb-4"
                />
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
                <Input
                    label="Featured Image"
                    type="file"
                    {...register("image", { required: !post })}
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    className="mb-4"
                />
                {post && (
                    <div className="mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                )}
                <Select
                    label="Status"
                    options={["active", "inactive"]}
                    {...register("status", { required: true })}
                    className="mb-4"
                />
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
