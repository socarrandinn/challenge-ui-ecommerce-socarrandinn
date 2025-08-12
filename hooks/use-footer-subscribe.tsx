import { useForm } from "react-hook-form";
import { useMutation } from "./use-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v3";
import { subscribeTo } from "@/modules/common/services/subscribe.service";
import { toast } from "sonner";

export const subscribeSchema = z.object({
  email: z
    .string({ required_error: "errors:required" })
    .min(2, "errors:min-2")
    .email("errors:validEmail"),
});

export type ISubscribe = z.infer<typeof subscribeSchema>;

export const useFooterSubscribe = () => {
  const { handleSubmit, ...form } = useForm<ISubscribe>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isLoading, reset, error, data, isSuccess } = useMutation(
    async (payload: ISubscribe) => await subscribeTo(payload),
    {
      onSuccess: () => {
        toast.success("se ha subscrito");
        form.reset();
      },
    }
  );

  return {
    ...form,
    data,
    isSuccess,
    error,
    isLoading,
    handleSubmit,
    mutate,
    onSubmit: handleSubmit((values) => {
      mutate(values);
    }),
    reset: () => {
      reset();
    },
  };
};
