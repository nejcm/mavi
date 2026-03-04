import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormValues } from "@/schemas/contact";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    // Placeholder: in production would call API or server function
    console.info("Contact form submitted:", values);
    toast({
      title: t("form.contact.toastTitle"),
      description: t("form.contact.toastDescription"),
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-md space-y-6 text-left">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.contact.nameLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("form.contact.namePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.contact.emailLabel")}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t("form.contact.emailPlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.contact.messageLabel")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("form.contact.messagePlaceholder")}
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="hero" size="lg" className="w-full">
          {form.formState.isSubmitting
            ? t("form.contact.submitSubmitting")
            : t("form.contact.submitIdle")}
        </Button>
      </form>
    </Form>
  );
}
