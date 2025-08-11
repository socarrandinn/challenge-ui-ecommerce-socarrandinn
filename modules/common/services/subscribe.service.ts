import { ISubscribe } from "@/hooks/use-footer-subscribe";

// todo
export const subscribeTo = async (payload: ISubscribe,): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: { payload },
        message: 'Simulated subscription successful',
        status: 200
      });
    }, 1000);
  });

};
