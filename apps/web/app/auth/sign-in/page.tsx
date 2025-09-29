"use client";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignIn = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const router = useRouter();
    const { isLoaded, signIn, setActive } = useSignIn();

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        try {
            const res = await signIn?.create({
                strategy: "password",
                identifier: user.email,
                password: user.password
            });
            // console.log(res);
            if(res?.status === "complete"){
                await setActive!({ session: res.createdSessionId });
                router.push("/library")
            }
        } catch (error: any) {
            console.log(error);
            if(error.errors?.[0]?.code === "form_password_incorrect" ||
                error.errors?.[0]?.code === "form_identifier_not_found") {
                    setError("Invalid email or password");
            }
        }

    }

    return (
        <section >
            <form onSubmit={handleSubmit} className="h-screen flex justify-center items-center mx-5">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Welcome back</CardTitle>
                        <CardDescription>
                            Enter your email below to sign in your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full cursor-pointer">
                            <svg role="img" viewBox="0 0 24 24"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path></svg>
                            Sign In with Google
                        </Button>
                        <Separator className="my-5" />
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))} />
                            </div>
                            {
                                error && <p className="text-xs text-red-500">{error}</p>
                            }
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full cursor-pointer">
                            Sign In
                        </Button>
                        <p className="text-sm">Don't have an account yet? <Link
                            href="sign-up" className="underline">Sign up</Link></p>
                    </CardFooter>
                </Card>
            </form>
        </section>
    )
};

export default SignIn;