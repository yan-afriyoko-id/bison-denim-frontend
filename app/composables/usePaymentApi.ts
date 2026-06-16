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

  const createPaymentGroup = async (orderIds: number[]) => {
    const { baseURL, getHeaders } = useApiBase();
    try {
      const res = await $fetch<{
        snap_token: string;
        payment_group_id: number;
      }>(`${baseURL}/payments/groups`, {
        method: "POST",
        headers: getHeaders(),
        body: { order_ids: orderIds },
      });
      return res;
    } catch (error: any) {
      throw error;
    }
  };

  return { getSnapToken, createPaymentGroup };
};
