import { z } from "zod";
import { useTranslation } from "react-i18next";

export const ProviderSchema = () => {
  const { t } = useTranslation();
  return z.object({
    clm_name: z
      .string()
      .min(3, {
        message: t("messageErrorMinLength", { min: 3 }),
      })
      .max(120, {
        message: t("messageErrorMaxLength", { min: 120 }),
      })
      .nonempty({ message: t("messageErrorRequired") }),
    clm_email: z
      .string()
      .min(3, {
        message: t("messageErrorMinLength", { min: 3 }),
      })
      .max(120, {
        message: t("messageErrorMaxLength", { min: 120 }),
      })
      .email({ message: t("messageErrorEmail") })
      .optional()
      .or(z.literal("")),
    clm_tax_number: z
      .string()
      .min(3, {
        message: t("messageErrorMinLength", { min: 3 }),
      })
      .max(120, {
        message: t("messageErrorMaxLength", { min: 120 }),
      })
      .optional()
      .or(z.literal("")),
    clm_phone: z
      .string()
      .min(3, {
        message: t("messageErrorMinLength", { min: 3 }),
      })
      .max(120, {
        message: t("messageErrorMaxLength", { min: 120 }),
      })
      .optional()
      .or(z.literal("")),
    clm_address: z
      .string()
      .min(3, {
        message: t("messageErrorMinLength", { min: 3 }),
      })
      .max(120, {
        message: t("messageErrorMaxLength", { min: 120 }),
      })
      .optional()
      .or(z.literal("")),
  });
};
