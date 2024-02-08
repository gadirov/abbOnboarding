"use client";
import useSWR from 'swr';
import {
  Box,
  Container,
  Heading,
  Progress,
  Text,
  Button,
  Image,
  Stack,
  CloseButton,
  VStack,
} from "@chakra-ui/react";
import { usePathname, useRouter,useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

const AsanImzaPinOne = () => {
  const t = useTranslations();
  const [progressValue, setProgressValue] = useState(0);
  const router = useRouter();
const searchParams = useSearchParams()
const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());

const pathName = usePathname();
let pathNameFirst = pathName.split("/")[1]
const { data, error } = useSWR(
  'https://mock-api-login-abb.vercel.app/onboarding-ms/v1/auth/status/2a5a628a-d72b-4ba4-8157-8dc11c130093', 
  fetcher, 
  
  {header:{ "Content-Type" : "applicaton/json"}, refreshInterval: 3000 }
);
console.log(data);

  const backToLogin = () => {
    router.push(`/${pathNameFirst}/login`);
  };
  const rejectHandler = () => {
    router.push(`/${pathNameFirst}`)
  }
  useEffect(() => {
    if (data) {
      router.push(`/${pathNameFirst}/select-organization`);
    } else {
      setProgressValue(oldValue => Math.min(oldValue + 10, 100));
    }
  }, [data, router]);

  if (error) {
    console.error('Failed to fetch data:', error);
  }
  const verificationCode  = searchParams.get("verificationCode");
  console.log(verificationCode);
  
  return (
    <Stack position="relative" width="100%">
      <CloseButton
        alignSelf="flex-end"
        onClick={backToLogin}
        position="absolute"
        right="24px"
        top="24px"
        _hover={{ backgroundColor: "gray.200" }}
      />
      <Container
        as="div"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        height="100vh"
        gap="16px"
        maxW="500px"
        px="24px"
      >
        <VStack>
          <Image src="../images/Loading.png" alt="logo" />
        </VStack>
        <Heading
          textAlign="center"
          color="#000"
          fontSize="24px"
          fontWeight="600"
          lineHeight="30px"
        >
          {t("onboarding.asanConfirmation")}
        </Heading>
        <Text
          textAlign="center"
          fontSize="16px"
          fontWeight="400"
          lineHeight="24px"
          color="rgba(0, 0, 0, 0.50)"
        >
         {t("onboarding.pin1Check")}
        </Text>
        <Box border="1px solid #E4E4E4" borderRadius="12px">
          <Box as="div" p="24px" textAlign="center">
            <Text
              color="rgba(0, 0, 0, 0.50)"
              fontSize="14px"
              fontWeight="500"
              lineHeight="20px"
              mb="4px"
            >
               {t("onboarding.verificationCode")}
            </Text>
            <Text
              color="#000"
              fontSize="24px"
              fontWeight="600"
              lineHeight="32px"
            >
              {verificationCode}
            </Text>
          </Box>
          <Progress value={progressValue} borderRadius="full" />
        </Box>
        <Button
          colorScheme="white"
          color="black"
          w="100%"
          onClick={rejectHandler}
          _hover={{ backgroundColor: "gray.100" }}
        >
          {t("common.actions.cancel")}
        </Button>
      </Container>
    </Stack>
  );
};

export default AsanImzaPinOne;