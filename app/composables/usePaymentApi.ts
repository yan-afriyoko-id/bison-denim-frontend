export const usePaymentApi = () => {
  const { baseURL, getHeaders } = useApiBase();

  const getSnapToken = async (
    orderId: number,
    paymentMethod?: string | null,
  ) => {
    const body: { payment_method?: string } = {};
    if (paymentMethod) {
      body.payment_method = paymentMethod;
    }

    return await $fetch<{ snap_token: string }>(
      `${baseURL}/orders/${orderId}/pay/midtrans`,
      {
        method: "POST",
        headers: getHeaders(),
        body: Object.keys(body).length > 0 ? body : undefined,
      },
    );
  };

  const getXenditInvoice = async (orderId: number, redirectUrl?: string) => {
    const body: Record<string, any> = {};
    if (redirectUrl) {
      body.success_redirect_url = redirectUrl;
      body.failure_redirect_url = redirectUrl;
    }
    return await $fetch<{ invoice_url: string; external_id: string }>(
      `${baseURL}/orders/${orderId}/pay/xendit`,
      {
        method: "POST",
        headers: getHeaders(),
        body: Object.keys(body).length > 0 ? body : undefined,
      },
    );
  };

  const getDokuCheckout = async (orderId: number, callbackUrl?: string) => {
    const body: Record<string, any> = {};
    if (callbackUrl) {
      body.callback_url = callbackUrl;
    }
    return await $fetch<{ payment_url: string; invoice_number: string }>(
      `${baseURL}/orders/${orderId}/pay/doku`,
      {
        method: "POST",
        headers: getHeaders(),
        body: Object.keys(body).length > 0 ? body : undefined,
      },
    );
  };

  const createPaymentGroup = async (orderIds: number[], paymentMethod?: string, redirectUrl?: string) => {
    const body: Record<string, any> = { order_ids: orderIds };
    if (paymentMethod) {
      body.payment_method = paymentMethod;
    }
    if (redirectUrl && paymentMethod === "xendit") {
      body.success_redirect_url = redirectUrl;
      body.failure_redirect_url = redirectUrl;
    }
    if (redirectUrl && paymentMethod === "doku") {
      body.callback_url = redirectUrl;
    }
    try {
      const res = await $fetch<{
        snap_token?: string;
        payment_group_id: number;
        invoice_url?: string;
        payment_url?: string;
      }>(`${baseURL}/payments/groups`, {
        method: "POST",
        headers: getHeaders(),
        body,
      });
      return res;
    } catch (error: any) {
      throw error;
    }
  };

  const getActivePaymentGateways = async (): Promise<string[]> => {
    try {
      const res = await $fetch<{ gateways: string[] }>(
        `${baseURL}/payment/gateways`,
        { method: "GET" },
      );
      if (Array.isArray(res.gateways) && res.gateways.length > 0) {
        return res.gateways;
      }
      return ["midtrans"];
    } catch {
      return ["midtrans"];
    }
  };

  return { getSnapToken, getXenditInvoice, getDokuCheckout, createPaymentGroup, getActivePaymentGateways };
};
