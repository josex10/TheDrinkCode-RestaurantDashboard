import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        title: "Multi-language app",
        messageErrorMinLength:
          "The filed requires a minimum {{min}} character(s).",
        messageErrorMaxLength:
          "The filed requires a maximun {{max}} character(s).",
        messageErrorRequired: "The filed is required.",
        messageErrorEmail: "Invalid email.",
        testError: "Hello",
        messageGeneralSuccessDefault:
          "The request has been completed successfully",
        messageGeneralErrorDefault: "An error has occurred in the request.",
        messageSuccessCreateProvider: "The provider was created successfully.",
        messageErrorDuplicateNameProvider: "The Provider's name is duplicate.",
      },
    },
    es: {
      translation: {
        title: "Aplicación en varios idiomas",
        messageErrorMinLength: "El campo require mínimo {{min}} caracter(es).",
        messageErrorMaxLength: "El campo require máximo {{max}} caracter(es).",
        messageErrorRequired: "El campo es requiredo.",
        messageErrorEmail: "Correo Eléctronico inválido.",
        messageGeneralSuccessDefault:
          "La solicitud se ha completado correctamente",
        messageGeneralErrorDefault: "Ha occurido un error en la solicitud.",
        messageSuccessCreateProvider:
          "El proveedor se ha creado correctamente.",
        messageErrorDuplicateNameProvider:
          "El nombre del proveedor esta duplicado.",
      },
    },
  },
});
export default i18n;
