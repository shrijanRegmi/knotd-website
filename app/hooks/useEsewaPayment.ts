"use client";

import { useState, useCallback, useRef } from "react";
import {
  initiateEsewaPayment,
  type EsewaInitiateBody,
} from "@/app/lib/api";

export type EsewaPaymentStatus = "idle" | "loading" | "error";

export function useEsewaPayment() {
  const [status, setStatus] = useState<EsewaPaymentStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const pay = useCallback(async (body: EsewaInitiateBody) => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    setStatus("loading");
    setError(null);

    try {
      const response = await initiateEsewaPayment(body);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = response.esewaPaymentUrl;

      Object.entries(response.formData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to initiate payment";
      setError(message);
      setStatus("error");
      submittingRef.current = false;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setStatus("idle");
  }, []);

  return { status, error, pay, clearError };
}
