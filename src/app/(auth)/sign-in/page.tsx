"use client";

import {
  Suspense,
  useState,
  type ChangeEvent,
  type FormEvent,
  type SVGProps,
} from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CircleAlert,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

type FieldErrors = {
  email?: string;
  password?: string;
};

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
  "Pick up right where you left off",
  "Manage upcoming appointments",
  "Rebook your favorite services in seconds",
];

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirectTo") ?? "/";

  const serviceId = redirectTo.startsWith("/services/")
    ? redirectTo.split("/")[2]
    : null;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({ ...previous, [name]: value }));
    setFieldErrors((previous) => ({ ...previous, [name]: undefined }));
    setError(null);
    setSuccess(null);
  };

  const validate = () => {
    const errors: FieldErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      errors.password = "Please enter your password.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await signIn.email({
        email: formData.email.trim(),
        password: formData.password,
        rememberMe,
        callbackURL: redirectTo,
      });

      if (error) {
        toast.add({
          type: "error",
          title: "Signin failed!",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        });

        return;
      }

      if (data) {
        toast.add({
          title: "Welcome back!",
          description: "You have successfully signed in to SalonBook.",
        });

        router.replace(redirectTo);
        router.refresh();
      }
    } catch (error) {
      toast.add({
        title: "Something went wrong",
        description: "Unable to sign in. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
    } catch {
      toast.add({
        type: "error",
        title: "Google sign-in failed",
        description: "Please try again later.",
      });
    } finally {
      setIsGoogleLoading(false);
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
            <span className="grid size-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
              <Scissors className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              SalonBook
            </span>
          </div>

          <div className="relative z-10 space-y-7">
            <Badge
              variant="secondary"
              className="border border-white/10 bg-white/10 text-white backdrop-blur"
            >
              <Sparkles />
              Welcome back
            </Badge>

            <div className="space-y-4">
              <h2 className="max-w-sm text-4xl font-semibold tracking-tight text-balance xl:text-5xl">
                Good hair days start here.
              </h2>
              <p className="max-w-sm text-sm leading-6 text-white/70">
                Sign in to manage your appointments, save your favorite salons
                and rebook your go-to services with ease.
              </p>
            </div>

            <ul className="space-y-3">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-3 text-sm text-white/80"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                    <Check className="size-3" />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-rose-500/20 text-rose-200 ring-1 ring-rose-300/20">
                <CalendarCheck className="size-5" />
              </span>
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Your next appointment is waiting
                </p>
                <p className="text-xs leading-5 text-white/60">
                  Sign in to view booking details, reschedule or leave a review.
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 border-t border-white/10 pt-3 text-amber-300">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-3.5 fill-current" />
              ))}
              <span className="ml-1 text-xs text-white/60">
                Loved by 2,000+ clients
              </span>
            </div>
          </div>
        </aside>

        {/* Form panel */}
        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto flex w-full max-w-md flex-col gap-8">
            <div className="flex items-center gap-3 lg:hidden">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Scissors className="size-4" />
              </span>
              <span className="font-semibold tracking-tight">SalonBook</span>
            </div>

            <header className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Welcome back
              </h1>
              <p className="text-sm leading-6 text-muted-foreground">
                Sign in to continue to your SalonBook account.
              </p>
            </header>

            {error ? (
              <Alert variant="destructive">
                <CircleAlert />
                <AlertTitle>Unable to sign you in</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            {success ? (
              <Alert>
                <Check />
                <AlertTitle>Signed in</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            ) : null}

            <div className="space-y-6">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11 w-full gap-2"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isSubmitting}
              >
                {isGoogleLoading ? (
                  <Spinner className="size-4" />
                ) : (
                  <GoogleIcon className="size-4" />
                )}
                {isGoogleLoading ? "Connecting..." : "Continue with Google"}
              </Button>

              <FieldSeparator>or sign in with email</FieldSeparator>

              <form onSubmit={handleSubmit} noValidate>
                <FieldGroup className="gap-5">
                  <Field data-invalid={Boolean(fieldErrors.email)}>
                    <FieldLabel htmlFor="email">Email address</FieldLabel>
                    <InputGroup className="h-11">
                      <InputGroupAddon>
                        <Mail />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.email)}
                        className="h-full"
                      />
                    </InputGroup>
                    <FieldError>{fieldErrors.email}</FieldError>
                  </Field>

                  <Field data-invalid={Boolean(fieldErrors.password)}>
                    <div className="flex items-center justify-between gap-3">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <InputGroup className="h-11">
                      <InputGroupAddon>
                        <Lock />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.password)}
                        className="h-full"
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          type="button"
                          size="icon-sm"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPassword((visible) => !visible)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldError>{fieldErrors.password}</FieldError>
                  </Field>

                  <Field
                    orientation="horizontal"
                    className="w-auto items-center gap-2"
                  >
                    <Checkbox
                      id="rememberMe"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked === true)
                      }
                    />
                    <FieldLabel
                      htmlFor="rememberMe"
                      className="font-normal text-muted-foreground"
                    >
                      Keep me signed in
                    </FieldLabel>
                  </Field>

                  <Button
                    type="submit"
                    size="lg"
                    className="h-11 w-full"
                    disabled={isSubmitting || isGoogleLoading}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="size-4" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight />
                      </>
                    )}
                  </Button>
                </FieldGroup>
              </form>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              New to SalonBook?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                Create an account
              </Link>
            </p>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5" />
              Secure sign-in. Your data stays private.
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-dvh items-center justify-center bg-muted/30">
          <Spinner className="size-6" />
        </main>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
