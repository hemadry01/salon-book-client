# SalonBook --- Client

A responsive salon appointment booking platform built with **Next.js**
and **TypeScript**. Customers can explore salon services, request
appointments, track booking status, and pay for confirmed appointments
through Stripe Checkout. Administrators can manage services,
appointments, customers, and transactions.

## Live Demo

-   **Live website:** \[Add deployed client URL\]
-   **Server API:** \[Add deployed server URL\]
-   **Client repository:** \[Add client GitHub repository URL\]
-   **Server repository:** \[Add server GitHub repository URL\]

## Features

### Public experience

-   Responsive home page with featured active services and service
    categories.
-   Browse, search, filter, and sort active salon services.
-   Service cards with image, category, price, duration, and
    description.
-   Protected service details and appointment booking experience.

### Authentication and authorization

-   Email/password registration and login using Better Auth.
-   Google sign-in.
-   Profile image support.
-   Role-aware navigation and dashboard routing for customers and
    admins.
-   Protected pages, blocked-account handling, and authenticated session
    persistence.
-   Admin accounts are assigned securely; public registration cannot
    create admins.

### Customer dashboard

-   Appointment overview and status summaries.
-   View personal appointment and payment history.
-   Cancel eligible pending appointments.
-   Pay for confirmed appointments through Stripe Checkout.
-   Update permitted profile information.

### Admin dashboard

-   Overview of customers, services, appointments, and successful
    payments.
-   Create, update, activate/deactivate, and delete services.
-   Review, confirm, or cancel appointment requests.
-   View and block/unblock customer accounts.
-   View payment transactions.

### User experience

-   Responsive layouts for desktop, tablet, and mobile.
-   Loading, empty, success, and error states.
-   Toast notifications and confirmation dialogs.
-   Form validation and clear feedback for failed requests.

## Technology Stack

-   Next.js
-   React
-   TypeScript / JavaScript
-   Better Auth
-   REST API integration
-   Stripe Checkout redirection
-   ImgBB image hosting
-   CSS / Tailwind CSS / component library: \[Specify what this project
    uses\]

## Getting Started

### Prerequisites

-   Node.js (LTS recommended)
-   npm, pnpm, or yarn
-   Running SalonBook backend
-   Better Auth and Google OAuth configuration
-   ImgBB API key (if image uploads are enabled)

### Installation

``` bash
git clone <CLIENT_REPOSITORY_URL>
cd <CLIENT_PROJECT_DIRECTORY>
npm install
```

Create a `.env.local` file in the client project root. Add the variables
required by your implementation:

``` env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_IMGBB_API_KEY=
```

Only define variables that are actually used by your client setup. Never
commit `.env.local` or real credentials.

### Run locally

``` bash
npm run dev
```

Open <http://localhost:3000>.

### Production build

``` bash
npm run build
npm run start
```

## Environment Variables

  --------------------------------------------------------------------------
  Variable                               Purpose
  -------------------------------------- -----------------------------------
  `NEXT_PUBLIC_API_URL`                  Backend REST API base URL

  `NEXT_PUBLIC_APP_URL`                  Public client application URL

  `BETTER_AUTH_SECRET`                   Better Auth secret, if Better Auth
                                         is configured in the client

  `BETTER_AUTH_URL`                      Better Auth base URL

  `GOOGLE_CLIENT_ID`                     Google OAuth client ID

  `GOOGLE_CLIENT_SECRET`                 Google OAuth client secret; keep
                                         server-side only

  `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`   Stripe publishable key, if the
                                         client initializes Stripe

  `NEXT_PUBLIC_IMGBB_API_KEY`            ImgBB key, only if uploads are
                                         performed directly from the browser
  --------------------------------------------------------------------------

**Security:** Never expose Stripe secret keys, Stripe webhook secrets,
MongoDB credentials, or other private credentials through `NEXT_PUBLIC_`
variables. Prefer proxying sensitive operations through the backend.

## Suggested Client Structure

``` text
src/
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── services/
│   └── dashboard/
├── components/
├── contexts/
├── hooks/
├── lib/
├── services/
├── types/
└── utils/
```

Adapt this structure to the actual project.

## Main Routes

  Route                              Access
  ---------------------------------- ----------------------------------
  `/`                                Public
  `/services`                        Public
  `/services/[id]`                   Authenticated customer
  `/sign-in`                         Public
  `/sign-up`                         Public
  `/dashboard`                       Authenticated; redirects by role
  `/dashboard/appointments`          Customer
  `/dashboard/profile`               Authenticated
  `/dashboard/services`              Admin
  `/dashboard/manage-appointments`   Admin
  `/dashboard/users`                 Admin
  `/dashboard/transactions`          Admin
  `/payment/success`                 Authenticated/payment return
  `/payment/cancel`                  Payment return

Route names may differ in the implementation. Backend authorization must
always enforce access independently of frontend route protection.

## API Configuration

Set `NEXT_PUBLIC_API_URL` to the deployed backend origin in production
and the local backend origin during development. Configure the backend
CORS allowlist to include the exact client origin.

## Deployment

1.  Push the client repository to GitHub.
2.  Import it into your hosting provider (for example, Vercel).
3.  Configure all required environment variables in the hosting
    dashboard.
4.  Set `NEXT_PUBLIC_API_URL` to the deployed backend URL.
5.  Add the production client URL to Better Auth and Google OAuth
    allowed origins/redirect URLs as applicable.
6.  Deploy and test direct navigation and refresh on nested routes.
7.  Test sign-in, role-based dashboards, service browsing, appointment
    flows, and Stripe return pages.

## Important Notes

-   Do not commit `.env`, `.env.local`, or any file containing
    credentials.
-   Do not rely on hidden navigation links as authorization; the server
    must verify roles.
-   Payment success must be determined by the backend's verified Stripe
    webhook, not by the browser success redirect.
-   Ensure the production backend URL, auth callback URLs, and CORS
    origins match the deployed domains.

## License

\[Add license information, if applicable.\]

#admin
email: suman@gmail.com
password:Suman2429&
