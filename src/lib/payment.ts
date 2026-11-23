const BASE_URL = "http://localhost:8000";

export const checkoutVerify = async (sessionId: string) => {
  const response = await fetch(
    `${BASE_URL}/payments/checkout-verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
      cache: "no-store",
    }
  );

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  if (!contentType?.includes("application/json")) {
    const text = await response.text();
    console.error("Non-JSON response:", text);

    throw new Error("Backend did not return JSON");
  }

  return response.json();
};
 