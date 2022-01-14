import {
  Button,
  Divider,
  Flex,
  Input,
  Select,
  Stack,
  useToast,
  VisuallyHidden,
} from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { brazilianStates } from "../../constants";

export type FormAddressProps = {
  name: string;
  last_name: string;
  postal_code: string;
  street: string;
  number: number;
  complement: string;
  district: string;
  city: string;
  state: string;
};

type AddressFillProps = {
  onSubmit: (data: FormAddressProps) => void;
};

const isValidBRZip = (zip) => /^[0-9]{5}-[0-9]{3}$/.test(zip);

const AddressFill = forwardRef(
  ({ onSubmit }: AddressFillProps, ref: React.RefObject<HTMLButtonElement>) => {
    const [isLoadingPostalCode, setIsLoadingPostalCode] = useState(false);
    const toast = useToast();

    const { handleSubmit, register, getValues, reset } =
      useForm<FormAddressProps>({
        defaultValues: {
          name: "",
          last_name: "",
          postal_code: "",
          street: "",
          number: null,
          complement: "",
          district: "",
          city: "",
          state: "",
        },
      });

    const handlePostalCodeFill = async () => {
      const { postal_code } = getValues();
      setIsLoadingPostalCode(true);
      if (isValidBRZip(postal_code)) {
        try {
          const responseData = await fetch(
            `https://viacep.com.br/ws/${postal_code.replace("-", "")}/json/`
          );
          const address = await responseData.json();
          if (address?.erro) {
            toast({
              title: "Error",
              description: "Unable to find this postal code",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setIsLoadingPostalCode(false);
          } else if (address?.uf) {
            reset({
              district: address?.bairro,
              complement: address?.complemento,
              city: address?.localidade,
              state: address?.uf,
              street: address?.logradouro,
            });
            setIsLoadingPostalCode(false);
          }
        } catch (error) {
          setIsLoadingPostalCode(false);
        } finally {
          setIsLoadingPostalCode(false);
        }
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <Flex gap={4}>
            <Input
              placeholder="First Name"
              {...register("name", { required: true })}
              flexGrow="50%"
            />
            <Input
              placeholder="Last Name"
              {...register("last_name", { required: true })}
              flexGrow="50%"
            />
          </Flex>
          <InputMask
            placeholder="Postal code"
            mask="99999-999"
            {...register("postal_code", {
              pattern: /^[0-9]{5}-[0-9]{3}$/,
              required: true,
            })}
            onBlur={handlePostalCodeFill}
            isDisabled={isLoadingPostalCode}
          >
            {(inputProps) => <Input {...inputProps} />}
          </InputMask>
          <Flex gap={4}>
            <Input
              placeholder="Street"
              {...register("street", { required: true })}
              flexBasis="80%"
              isDisabled={isLoadingPostalCode}
            />
            <Input
              placeholder="Number"
              {...register("number")}
              flexBasis="20%"
              type="number"
              isDisabled={isLoadingPostalCode}
            />
          </Flex>
          <Input
            {...register("complement")}
            placeholder="Additional infos"
            isDisabled={isLoadingPostalCode}
          />
          <Flex gap={4}>
            <Input
              {...register("district", { required: true })}
              placeholder="District"
              isDisabled={isLoadingPostalCode}
              flexBasis="33%"
            />
            <Input
              {...register("city", { required: true })}
              placeholder="City"
              isDisabled={isLoadingPostalCode}
              flexBasis="33%"
            />
            <Select
              {...register("state", { required: true })}
              placeholder="State"
              isDisabled={isLoadingPostalCode}
              flexBasis="33%"
            >
              {brazilianStates.map(({ uf, nome: name }, index) => {
                return (
                  <option value={uf} key={index}>
                    {name}
                  </option>
                );
              })}
            </Select>
          </Flex>
          <Divider />
          <VisuallyHidden>
            <Button type="submit" ref={ref}>
              Submit
            </Button>
          </VisuallyHidden>
        </Stack>
      </form>
    );
  }
);

export default AddressFill;
