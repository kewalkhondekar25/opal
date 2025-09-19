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
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


const SignUp = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const router = useRouter();
    const { signUp, setActive } = useSignUp();

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();
        
        try {
            const res = await signUp?.create({ emailAddress: user.email, password: user.password });
            if(res?.status === "complete"){
                await setActive!({ session: res?.createdSessionId })
                router.push("/library")
            }
        } catch (error: any) {
            console.log(error);
            if(error.errors?.[0]?.code === "form_identifier_exists"){
                setError("An account with this email already exists. Try logging in.")
            }
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className="h-screen flex justify-center items-center mx-5">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Create your Opal account</CardTitle>
                        <CardDescription>
                            Enter your email below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full cursor-pointer">
                            <svg role="img" viewBox="0 0 24 24"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path></svg>
                            Sign Up with Google
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
                                {
                                    error && <p className="text-xs text-red-500">An account with this email already exists. Try logging in.</p>
                                }
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
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full cursor-pointer">
                            Sign Up
                        </Button>
                        <p className="text-sm">Already have an account? <Link
                            href="sign-in" className="underline">Sign In</Link></p>
                    </CardFooter>
                    <div id="clerk-captcha" style={{ display: "none" }}></div>
                </Card>
            </form>
        </section >
    )
};

export default SignUp;