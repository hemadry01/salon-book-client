"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type SVGProps,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  ImagePlus,
  Lock,
  Mail,
  Scissors,
  ShieldCheck,
  User,
} from "lucide-react";

import { authClient, signIn, signUp } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

type FieldErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  image?: string;
};

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.54-5.17 3.54-8.87Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.94-2.91l-3.88-3a7.2 7.2 0 0 1-10.77-3.79H1.29v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.3a7.19 7.19 0 0 1 0-4.6V6.61H1.29a12 12 0 0 0 0 10.78l4-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.97 11.97 0 0 0 1.29 6.61l4 3.09A7.2 7.2 0 0 1 12 4.75Z"
      />
    </svg>
  );
}

const highlights = [
  "Discover top-rated salons near you",
  "Compare services, prices and reviews",
  "Book or reschedule in just a few taps",
];

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [showPassword, setShowPassword] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Clean up preview URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Form input change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFieldErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

  // Image upload to ImgBB
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate image type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Only JPG, PNG and WEBP images are allowed.");
      event.target.value = "";
      return;
    }

    // Validate image size
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Profile image must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    // Reset previous image
    setProfileImage(null);

    // Show local preview
    setPreview(URL.createObjectURL(file));

    // Start upload
    setIsImageUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("image", file);

      const imagebbAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGBB_API_KEY}`;

      const response = await fetch(imagebbAPI, {
        method: "POST",
        body: uploadFormData,
      });

      const result = await response.json();
      const imageURL = result.data.url;
      console.log(result);

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Image upload failed.");
      }

      //Save ImgBB URL
      setProfileImage(imageURL);
    } catch (uploadError) {
      setProfileImage(null);

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Could not upload profile image.",
      );
    } finally {
      setIsImageUploading(false);
      event.target.value = "";
    }
  };

  // Validate form
  const validate = () => {
    const errors: FieldErrors = {};

    if (formData.fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    // Image validation
    if (!profileImage) {
      errors.image = "Please upload a profile image.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // Email signup with Better Auth
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;
    try {

      const { data, error } = await signUp.email({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        image: profileImage ?? undefined,
      }); 
      console.log(data);

      if (error) {
         toast.add({
           type: "error",
           title: "Signup failed!",
           description:
             error instanceof Error
               ? error.message
               : "Something went wrong. Please try again.",
         });
      }

      if(data){
        router.push("/");
        toast.add({
          title: "Account created successfully!",
          description: "Welcome to SalonBook. Your account is ready.",
        });
      }
      
    } catch (error) {
      toast.add({
        type: "error",
        title: "Signup failed!",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  // Google signup
  const handleGoogleLogin = async () => {
   const data = await signIn.social({
     provider: "google",
   });
   if(data){
      toast.add({
        title: "Account created successfully!",
        description: "Welcome to SalonBook. Your account is ready.",
      });

      router.push("/");
   }
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-muted/30 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-6xl gap-0 overflow-hidden p-0 shadow-2xl shadow-primary/5 lg:grid lg:grid-cols-[1.05fr_1fr]">
        {/* Brand panel */}

        <aside className="relative hidden overflow-hidden bg-zinc-950 p-10 text-white lg:flex lg:flex-col lg:justify-between lg:gap-12 xl:p-12">
          <div className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-rose-500/30 blur-3xl" />

          <div className="pointer-events-none absolute top-1/3 -right-20 size-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="pointer-events-none absolute -right-16 -bottom-24 size-80 rounded-full bg-amber-400/20 blur-3xl" />

          <div className="relative z-10 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <Scissors className="size-5" />
            </span>

            <span className="text-lg font-semibold tracking-tight">
              SalonBook
            </span>
          </div>

          <div className="relative z-10 space-y-7">

            <div className="space-y-4">
              <h2 className="max-w-sm text-4xl font-semibold tracking-tight xl:text-5xl">
                Your glow-up starts here.
              </h2>

              <p className="max-w-sm text-sm leading-6 text-white/70">
                Create an account to discover top salons, compare services and
                book your next appointment in seconds.
              </p>
            </div>

            <ul className="space-y-3">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-3 text-sm text-white/80"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white/10">
                    <Check className="size-3" />
                  </span>

                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-rose-500/20 text-rose-200">
              <ShieldCheck className="size-5" />
            </span>

            <div className="space-y-1">

              <p className="text-xs text-white/70">
                Your beauty, your schedule.
              </p>
            </div>
          </div>
        </aside>

        {/* Signup form */}

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto flex w-full max-w-md flex-col gap-8">
            {/* Mobile logo */}

            <div className="flex items-center gap-3 lg:hidden">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Scissors className="size-4" />
              </span>

              <span className="font-semibold">SalonBook</span>
            </div>

            {/* Header */}

            <header className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Create your account
              </h1>

              <p className="text-sm leading-6 text-muted-foreground">
                Join SalonBook and book your next salon appointment in minutes.
              </p>
            </header>

            <div className="space-y-6">
              {/* Google signup */}

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11 w-full gap-2"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading || isSubmitting}
              >
                {isGoogleLoading ? (
                  <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <GoogleIcon className="size-4" />
                )}

                {isGoogleLoading ? "Connecting..." : "Continue with Google"}
              </Button>

              <div className="relative flex items-center">
                <div className="h-px flex-1 bg-border" />
                <span className="px-3 text-xs text-muted-foreground">
                  or sign up with email
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Signup form */}

              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-5">
                  {/* Profile image */}

                  <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium">
                      Profile Image
                    </label>

                    <div className="flex items-center gap-4">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Profile preview"
                          className="size-16 shrink-0 rounded-full border object-cover"
                        />
                      ) : (
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-full border bg-muted">
                          <ImagePlus className="size-7 text-muted-foreground" />
                        </div>
                      )}

                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                        //disabled={isImageUploading || isSubmitting}
                        className="w-full cursor-pointer text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or WEBP. Maximum 10 MB.
                    </p>
                  </div>

                  {/* Full name */}

                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Full name
                    </label>

                    <div className="relative">
                      <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="Ayesha Khan"
                        value={formData.fullName}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.fullName)}
                        className="h-11 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>

                    {fieldErrors.fullName && (
                      <p className="text-sm text-destructive">
                        {fieldErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email address
                    </label>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.email)}
                        className="h-11 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>

                    {fieldErrors.email && (
                      <p className="text-sm text-destructive">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.password)}
                        className="h-11 w-full rounded-md border border-input bg-background pl-10 pr-11 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((previous) => !previous)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>

                    {fieldErrors.password ? (
                      <p className="text-sm text-destructive">
                        {fieldErrors.password}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Use at least 6 characters.
                      </p>
                    )}
                  </div>

                  {/* Submit */}

                  <Button
                    type="submit"
                    size="lg"
                    className="h-11 w-full"
                    disabled={
                      isSubmitting || isGoogleLoading 
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create account
                        <ArrowRight />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Footer */}

            <p className="text-center text-xs leading-5 text-muted-foreground">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy.
            </p>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                Sign in
              </Link>
            </p>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5" />
              Free to join. No booking fees.
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
