import { Suspense } from "react";

import { CreditCard, ReceiptText, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";

interface ITransaction {
  _id: string;
  stripeSessionId?: string;
  userId?: string;
  bookingId?: string;
  paymentIntent?: string;
  paymentStatus?: string;
  createdAt?: string;
}

const API_URL = process.env.BACKEND_URL || "http://localhost:8000";

const statusStyles: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-600 ring-emerald-200/70",
  succeeded: "bg-emerald-50 text-emerald-600 ring-emerald-200/70",
  complete: "bg-emerald-50 text-emerald-600 ring-emerald-200/70",
  completed: "bg-emerald-50 text-emerald-600 ring-emerald-200/70",
  pending: "bg-amber-50 text-amber-600 ring-amber-200/70",
  processing: "bg-amber-50 text-amber-600 ring-amber-200/70",
  unpaid: "bg-orange-50 text-orange-600 ring-orange-200/70",
  failed: "bg-red-50 text-red-600 ring-red-200/70",
  canceled: "bg-red-50 text-red-600 ring-red-200/70",
  cancelled: "bg-red-50 text-red-600 ring-red-200/70",
  expired: "bg-red-50 text-red-600 ring-red-200/70",
  refunded: "bg-violet-50 text-violet-600 ring-violet-200/70",
};

const statusDotStyles: Record<string, string> = {
  paid: "bg-emerald-500",
  succeeded: "bg-emerald-500",
  complete: "bg-emerald-500",
  completed: "bg-emerald-500",
  pending: "bg-amber-500",
  processing: "bg-amber-500",
  unpaid: "bg-orange-500",
  failed: "bg-red-500",
  canceled: "bg-red-500",
  cancelled: "bg-red-500",
  expired: "bg-red-500",
  refunded: "bg-violet-500",
};

const formatDateTime = (value?: string) => {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatStatus = (status?: string) => {
  if (!status) return "Unknown";

  return status
    .trim()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const shortId = (value?: string) => {
  if (!value) return "N/A";
  if (value.length <= 16) return value;

  return `${value.slice(0, 8)}...${value.slice(-4)}`;
};

function TransactionsLoading() {
  return (
    <div className="flex min-h-60 items-center justify-center">
      <p className="text-sm text-muted-foreground">Loading transactions...</p>
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={<TransactionsLoading />}>
      <TransactionsContent />
    </Suspense>
  );
}

async function TransactionsContent() {
  let transactions: ITransaction[] = [];
  let errorMessage: string | null = null;

  try {
    const res = await fetch(`${API_URL}/admin/payment/transactions`);

    const result = await res.json();

    transactions = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result?.transactions)
        ? result.transactions
        : Array.isArray(result)
          ? result
          : [];
  } catch (error) {
    console.error("Transactions fetch error:", error);

    errorMessage =
      error instanceof Error ? error.message : "Unable to load transactions.";
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <ReceiptText className="size-5" />
            </span>

            <h1 className="text-2xl font-semibold tracking-tight">
              Transactions
            </h1>
          </div>

          <p className="text-sm text-muted-foreground">
            Monitor payments and Stripe checkout sessions across all bookings.
          </p>
        </div>

        <Badge variant="outline" className="h-7 w-fit gap-1.5 px-3 text-xs">
          <CreditCard className="size-3.5" />
          {transactions.length} records
        </Badge>
      </header>

      {errorMessage && (
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>Could not load transactions</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
        <Table className="min-w-[1080px]">
          <TableHeader className="bg-[#f4f5fb] dark:bg-muted/50">
            <TableRow className="border-b hover:bg-transparent">
              <TableHead>Transaction ID</TableHead>
              <TableHead>Customer ID</TableHead>
              <TableHead>Booking ID</TableHead>
              <TableHead>Stripe Session</TableHead>
              <TableHead>Payment Intent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => {
                const status =
                  transaction.paymentStatus?.trim().toLowerCase() ?? "";

                const statusStyle =
                  statusStyles[status] ??
                  "bg-slate-100 text-slate-600 ring-slate-200/70";

                const dotStyle = statusDotStyles[status] ?? "bg-slate-400";

                return (
                  <TableRow key={transaction._id}>
                    <TableCell className="font-mono text-xs">
                      #{shortId(transaction._id)}
                    </TableCell>

                    <TableCell className="font-mono text-xs">
                      {transaction.userId || "N/A"}
                    </TableCell>

                    <TableCell className="font-mono text-xs">
                      {transaction.bookingId || "N/A"}
                    </TableCell>

                    <TableCell className="font-mono text-xs">
                      {transaction.stripeSessionId || "N/A"}
                    </TableCell>

                    <TableCell className="font-mono text-xs">
                      {transaction.paymentIntent || "N/A"}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={cn(
                          "gap-1.5 rounded-full ring-1 ring-inset",
                          statusStyle,
                        )}
                      >
                        <span
                          className={cn("size-1.5 rounded-full", dotStyle)}
                        />
                        {formatStatus(transaction.paymentStatus)}
                      </Badge>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-sm">
                      {formatDateTime(transaction.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-40 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <ReceiptText className="size-6 text-muted-foreground" />

                    <p className="text-sm font-medium">No transactions found</p>

                    <p className="text-xs text-muted-foreground">
                      Payments will appear here once customers complete
                      checkout.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
