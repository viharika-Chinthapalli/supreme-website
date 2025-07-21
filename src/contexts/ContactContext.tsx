"use client";

import { createContext, useReducer, ReactNode } from "react";
import {
  ContactFormData,
  ContactFormErrors,
  ContactContextType,
} from "@/types";

const initialFormData: ContactFormData = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

const initialErrors: ContactFormErrors = {};

interface ContactState {
  formData: ContactFormData;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

const initialState: ContactState = {
  formData: initialFormData,
  errors: initialErrors,
  isSubmitting: false,
  isSubmitted: false,
};

type ContactAction =
  | { type: "UPDATE_FIELD"; field: keyof ContactFormData; value: string }
  | { type: "SET_ERRORS"; errors: ContactFormErrors }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "SET_SUBMITTED"; isSubmitted: boolean }
  | { type: "RESET_FORM" };

function contactReducer(
  state: ContactState,
  action: ContactAction
): ContactState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };

    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };

    case "SET_SUBMITTED":
      return {
        ...state,
        isSubmitted: action.isSubmitted,
        isSubmitting: false,
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

export const ContactContext = createContext<ContactContextType | undefined>(
  undefined
);

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateForm = (formData: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (formData.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.subject.trim()) {
    errors.subject = "Subject is required";
  } else if (formData.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  }

  if (!formData.message.trim()) {
    errors.message = "Message is required";
  } else if (formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};

const submitContactForm = async (
  formData: ContactFormData
): Promise<{ success: boolean; error?: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const isSuccess = Math.random() > 0.1;

  if (isSuccess) {
    console.log("Form submitted successfully:", formData);
    return { success: true };
  } else {
    return {
      success: false,
      error: "Failed to send message. Please try again.",
    };
  }
};

interface ContactProviderProps {
  children: ReactNode;
}

export function ContactProvider({ children }: ContactProviderProps) {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const updateField = (field: keyof ContactFormData, value: string) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const submitForm = async (): Promise<void> => {
    const errors = validateForm(state.formData);

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    dispatch({ type: "SET_ERRORS", errors: {} });
    dispatch({ type: "SET_SUBMITTING", isSubmitting: true });

    try {
      const result = await submitContactForm(state.formData);

      if (result.success) {
        dispatch({ type: "SET_SUBMITTED", isSubmitted: true });

        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "form_submit", {
            event_category: "contact",
            event_label: "contact_form",
          });
        }
      } else {
        dispatch({
          type: "SET_ERRORS",
          errors: { message: result.error || "Failed to send message" },
        });
        dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      dispatch({
        type: "SET_ERRORS",
        errors: { message: "An unexpected error occurred. Please try again." },
      });
      dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
    }
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const contextValue: ContactContextType = {
    formData: state.formData,
    errors: state.errors,
    isSubmitting: state.isSubmitting,
    isSubmitted: state.isSubmitted,
    updateField,
    submitForm,
    resetForm,
  };

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
}
