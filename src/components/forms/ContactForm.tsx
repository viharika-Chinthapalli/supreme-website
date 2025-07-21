import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      company: "",
      message: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Invalid email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required.";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const resetForm = () => {
    setFormData({ fullName: "", email: "", company: "", message: "" });
    setErrors({ fullName: "", email: "", company: "", message: "" });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        >
          <CheckCircle className="w-8 h-8 text-white" />
        </motion.div>

        <h3 className="text-xl font-semibold text-white mb-4">
          Message Sent Successfully!
        </h3>
        <p className="text-blue-100 mb-6 leading-relaxed">
          Thank you for reaching out to us. We'll get back to you within 24
          hours.
        </p>

        <button
          onClick={resetForm}
          className="bg-white text-blue-500 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Full Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 text-white placeholder-blue-200 
            focus:outline-none focus:border-white transition-colors duration-200 text-lg
            ${errors.fullName ? "border-red-400" : "border-blue-300"}
          `}
          placeholder="Full name"
        />
        {errors.fullName && (
          <motion.p
            className="text-red-400 text-sm mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.fullName}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 text-white placeholder-blue-200 
            focus:outline-none focus:border-white transition-colors duration-200 text-lg
            ${errors.email ? "border-red-400" : "border-blue-300"}
          `}
          placeholder="Email"
        />
        {errors.email && (
          <motion.p
            className="text-red-400 text-sm mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 text-white placeholder-blue-200 
            focus:outline-none focus:border-white transition-colors duration-200 text-lg
            ${errors.company ? "border-red-400" : "border-blue-300"}
          `}
          placeholder="Company"
        />
        {errors.company && (
          <motion.p
            className="text-red-400 text-sm mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.company}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 text-white placeholder-blue-200 
            focus:outline-none focus:border-white transition-colors duration-200 resize-none text-lg
            ${errors.message ? "border-red-400" : "beorder-blue-300"}
          `}
          placeholder="Message"
        />
        {errors.message && (
          <motion.p
            className="text-red-400 text-sm mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        className="pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium 
            hover:bg-white hover:text-blue-500 transition-all duration-200 
            ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }
            flex items-center space-x-2
          `}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Sending...</span>
            </>
          ) : (
            <span>Send</span>
          )}
        </button>
      </motion.div>
    </motion.form>
  );
}
