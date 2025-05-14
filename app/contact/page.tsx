"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Schema for the Contact Us form
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const { toast } = useToast();

  // Contact Us form
  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Handle Contact Us form submission
  async function onContactSubmit(values: z.infer<typeof contactFormSchema>) {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        contactForm.reset();
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "An error occurred while sending the message.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="bg-[#F8F3D9] min-h-screen py-12">
      <div className="container px-4">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl font-bold mb-4 text-[#000080]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-[#000080]/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Have questions about our products? We&apos;re here to help! Reach out to us through any of the following channels.
          </motion.p>
        </motion.div>

        {/* Contact Info and Form - Same Level */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12  border-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Contact Information */}
          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-[#F8F3D9]  border-none">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="bg-[#000080]/10 p-2 rounded-full">
                    <MapPin className="h-6 w-6 text-[#000080]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#000080]">Address</h3>
                    <p className="text-sm text-[#000080]/80">
                      123 Thamel Marg<br />
                      Kathmandu 44600<br />
                      Nepal
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-[#F8F3D9]  border-none">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="bg-[#000080]/10 p-2 rounded-full">
                    <Phone className="h-6 w-6 text-[#000080]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#000080]">Phone</h3>
                    <p className="text-sm text-[#000080]/80">
                      +977 9851213365<br />
                      
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-[#F8F3D9]  border-none">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="bg-[#000080]/10 p-2 rounded-full">
                    <Mail className="h-6 w-6 text-[#000080]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#000080]">Email</h3>
                    <p className="text-sm text-[#000080]/80">
                      bicky1265@gmail.com<br />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-[#F8F3D9] border-none">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="bg-[#000080]/10 p-2 rounded-full">
                    <Globe className="h-6 w-6 text-[#000080]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#000080]">Office Hours</h3>
                    <p className="text-sm text-[#000080]/80">
                      Sunday - Saturday: 10:00 AM - 7:00 PM<br />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
          className="border-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Card className="bg-[#F8F3D9]  border-none">
              <CardContent className="p-6">
                <motion.h2 
                  className="text-2xl font-semibold mb-6 text-[#000080]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  Send us a Message
                </motion.h2>
                <Form {...contactForm}>
                  <form
                    onSubmit={contactForm.handleSubmit(onContactSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={contactForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#000080]">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              className="bg-[#F8F3D9] border-[#000080]/30 focus:border-[#000080]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#000080]">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com" 
                              {...field} 
                              className="bg-[#F8F3D9] border-[#000080]/30 focus:border-[#000080]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#000080]">Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What is this about?" 
                              {...field} 
                              className="bg-[#F8F3D9] border-[#000080]/30 focus:border-[#000080]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#000080]">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message here..."
                              className="bg-[#F8F3D9] min-h-[120px] border-[#000080]/30 focus:border-[#000080]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-[#000080] hover:bg-[#000080]/90"
                      >
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Map Section */}
        <motion.div 
          className="rounded-xl bg-[#F8F3D9]  border-none overflow-hidden  "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <div className="relative h-[450px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2704812876712!2d85.31080581506272!3d27.71568798278928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb77fd4bd%3A0x58099b1daa43b6ca!2sThamel%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2s!4v1648636547953!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 right-4 bg-[#F8F3D9]/90 px-4 py-2 rounded-lg  backdrop-blur-sm ">
              <a
                href="https://www.google.com/maps/place/Everest+Souvenir+House/@27.7135949,85.3100216,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb19e4b18ed7c5:0x6a5b73638589a8df!8m2!3d27.7135902!4d85.3125965!16s%2Fg%2F11h926lt7_?entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4 text-[#000080]" />
                <span className="text-[#000080] hover:underline">Open in Google Maps</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}