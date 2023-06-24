import { UseToastOptions, useToast } from "@chakra-ui/react"

export default function useCustomToast() {
  const toast = useToast();

  const customToast = (status: UseToastOptions["status"], message: string) => {
    return toast({
      title: message,
      status,
      duration: 4000,
      position: "top-right",
      isClosable: true,
    });
  };

  return customToast;
}